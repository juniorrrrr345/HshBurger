import { SiteConfig, Product, Category, SocialMediaLink, Farm } from './config';

// Fonctions utilitaires pour l'administration
export const adminUtils = {
  // Validation des produits
  validateProduct: (product: Product): string[] => {
    const errors: string[] = [];
    
    if (!product.name.trim()) {
      errors.push('Le nom du produit est requis');
    }
    
    if (!product.description.trim()) {
      errors.push('La description du produit est requise');
    }
    
    if (!product.category.trim()) {
      errors.push('La catégorie du produit est requise');
    }
    
    if (!product.orderLink.trim()) {
      errors.push('Le lien de commande est requis');
    }
    
    if (product.variants.length === 0) {
      errors.push('Au moins une variante de prix est requise');
    }
    
    return errors;
  },

  // Validation des catégories
  validateCategory: (category: Category): string[] => {
    const errors: string[] = [];
    
    if (!category.name.trim()) {
      errors.push('Le nom de la catégorie est requis');
    }
    
    if (!category.emoji.trim()) {
      errors.push('L\'emoji de la catégorie est requis');
    }
    
    return errors;
  },

  // Validation des fermes
  validateFarm: (farm: Farm): string[] => {
    const errors: string[] = [];
    
    if (!farm.name.trim()) {
      errors.push('Le nom de la ferme est requis');
    }
    
    if (!farm.emoji.trim()) {
      errors.push('L\'emoji de la ferme est requis');
    }
    
    return errors;
  },

  // Validation des réseaux sociaux
  validateSocialMedia: (social: SocialMediaLink): string[] => {
    const errors: string[] = [];
    
    if (!social.name.trim()) {
      errors.push('Le nom du réseau social est requis');
    }
    
    if (!social.url.trim()) {
      errors.push('L\'URL du réseau social est requise');
    }
    
    if (!social.emoji.trim()) {
      errors.push('L\'emoji du réseau social est requis');
    }
    
    return errors;
  },

  // Génération d'ID unique
  generateId: (items: { id: number }[]): number => {
    const maxId = Math.max(...items.map(item => item.id), 0);
    return maxId + 1;
  },

  // Formatage des prix
  formatPrice: (price: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  },

  // Vérification des URLs
  isValidUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Nettoyage des données
  sanitizeInput: (input: string): string => {
    return input.trim().replace(/[<>]/g, '');
  },

  // Export des données
  exportConfig: (config: SiteConfig): string => {
    return JSON.stringify(config, null, 2);
  },

  // Import des données
  importConfig: (jsonString: string): SiteConfig | null => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return null;
    }
  }
};

// Types pour les actions d'administration
export interface AdminAction {
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  entity: 'PRODUCT' | 'CATEGORY' | 'FARM' | 'SOCIAL_MEDIA' | 'CONFIG';
  data: any;
  timestamp: Date;
}

// Historique des actions
export class AdminHistory {
  private actions: AdminAction[] = [];

  addAction(action: Omit<AdminAction, 'timestamp'>): void {
    this.actions.push({
      ...action,
      timestamp: new Date()
    });
  }

  getActions(): AdminAction[] {
    return [...this.actions].reverse();
  }

  clearHistory(): void {
    this.actions = [];
  }
}

// Gestionnaire de notifications
export class NotificationManager {
  private notifications: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    timestamp: Date;
  }> = [];

  addNotification(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info'): string {
    const id = Math.random().toString(36).substr(2, 9);
    this.notifications.push({
      id,
      message,
      type,
      timestamp: new Date()
    });
    return id;
  }

  getNotifications() {
    return [...this.notifications];
  }

  removeNotification(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  clearNotifications(): void {
    this.notifications = [];
  }
}

// Instance globale
export const adminHistory = new AdminHistory();
export const notificationManager = new NotificationManager();