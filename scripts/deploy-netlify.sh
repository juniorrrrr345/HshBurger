#!/bin/bash

# Script de déploiement Netlify pour le panel d'administration
# Usage: ./scripts/deploy-netlify.sh

set -e

echo "🚀 Déploiement du Panel d'Administration sur Netlify"
echo "=================================================="

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier que Netlify CLI est installé
check_netlify_cli() {
    if ! command -v netlify &> /dev/null; then
        print_error "Netlify CLI n'est pas installé"
        echo "Installez-le avec: npm install -g netlify-cli"
        exit 1
    fi
    print_message "Netlify CLI détecté"
}

# Vérifier que nous sommes dans le bon répertoire
check_directory() {
    if [ ! -f "package.json" ] || [ ! -f "netlify.toml" ]; then
        print_error "Ce script doit être exécuté depuis la racine du projet"
        exit 1
    fi
    print_message "Répertoire du projet détecté"
}

# Installer les dépendances
install_dependencies() {
    print_message "Installation des dépendances..."
    npm install
    print_message "Dépendances installées"
}

# Build du projet
build_project() {
    print_message "Build du projet..."
    npm run build
    print_message "Build terminé"
}

# Test local avec Netlify
test_local() {
    print_message "Test local avec Netlify..."
    if netlify dev --port 8888 &> /dev/null & then
        sleep 5
        print_message "Serveur local démarré sur http://localhost:8888"
        print_message "Appuyez sur Ctrl+C pour arrêter le serveur"
        wait
    else
        print_warning "Impossible de démarrer le serveur local"
    fi
}

# Déployer sur Netlify
deploy_to_netlify() {
    print_message "Déploiement sur Netlify..."
    
    # Vérifier si l'utilisateur est connecté
    if ! netlify status &> /dev/null; then
        print_warning "Vous n'êtes pas connecté à Netlify"
        print_message "Connexion à Netlify..."
        netlify login
    fi
    
    # Déployer
    if netlify deploy --prod; then
        print_message "Déploiement réussi!"
        
        # Récupérer l'URL du site
        SITE_URL=$(netlify status --json | grep -o '"url":"[^"]*"' | cut -d'"' -f4)
        if [ ! -z "$SITE_URL" ]; then
            print_message "Site déployé: $SITE_URL"
            print_message "Panel d'administration: $SITE_URL/admin"
            print_message "API: $SITE_URL/.netlify/functions/api/admin"
        fi
    else
        print_error "Échec du déploiement"
        exit 1
    fi
}

# Test de l'API après déploiement
test_api() {
    print_message "Test de l'API..."
    
    # Récupérer l'URL du site
    SITE_URL=$(netlify status --json | grep -o '"url":"[^"]*"' | cut -d'"' -f4)
    
    if [ ! -z "$SITE_URL" ]; then
        # Test de l'API principale
        if curl -s "$SITE_URL/.netlify/functions/api/admin" > /dev/null; then
            print_message "✅ API principale fonctionne"
        else
            print_warning "⚠️ API principale ne répond pas"
        fi
        
        # Test de l'API produits
        if curl -s "$SITE_URL/.netlify/functions/api/admin/products" > /dev/null; then
            print_message "✅ API produits fonctionne"
        else
            print_warning "⚠️ API produits ne répond pas"
        fi
    else
        print_warning "Impossible de récupérer l'URL du site"
    fi
}

# Afficher les informations de configuration
show_config() {
    print_message "Configuration du projet:"
    echo "  - Build command: npm run build"
    echo "  - Publish directory: out"
    echo "  - Node version: 18+"
    echo "  - Framework: Next.js"
    echo ""
}

# Menu principal
main() {
    echo ""
    echo "Options disponibles:"
    echo "1. Vérifier la configuration"
    echo "2. Installer les dépendances"
    echo "3. Build du projet"
    echo "4. Test local"
    echo "5. Déployer sur Netlify"
    echo "6. Test de l'API"
    echo "7. Déploiement complet"
    echo "8. Quitter"
    echo ""
    read -p "Choisissez une option (1-8): " choice
    
    case $choice in
        1)
            check_netlify_cli
            check_directory
            show_config
            ;;
        2)
            install_dependencies
            ;;
        3)
            build_project
            ;;
        4)
            test_local
            ;;
        5)
            deploy_to_netlify
            ;;
        6)
            test_api
            ;;
        7)
            check_netlify_cli
            check_directory
            show_config
            install_dependencies
            build_project
            deploy_to_netlify
            test_api
            print_message "🎉 Déploiement complet terminé!"
            ;;
        8)
            print_message "Au revoir!"
            exit 0
            ;;
        *)
            print_error "Option invalide"
            main
            ;;
    esac
}

# Vérifications initiales
check_netlify_cli
check_directory

# Démarrer le menu
main