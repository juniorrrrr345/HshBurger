-- Créer la table site_config avec la bonne structure
DROP TABLE IF EXISTS site_config;

CREATE TABLE site_config (
  id INTEGER PRIMARY KEY,
  config JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donner les permissions nécessaires
GRANT ALL ON site_config TO anon;
GRANT ALL ON site_config TO authenticated;

-- Insérer une configuration par défaut
INSERT INTO site_config (id, config) VALUES (1, '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Vérifier que la table a été créée correctement
SELECT * FROM site_config;