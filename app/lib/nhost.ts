import { NhostClient } from '@nhost/nextjs';

// Configuration Nhost avec fallback pour éviter les erreurs de connexion
const nhostSubdomain = process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || process.env.NHOST_SUBDOMAIN || 'placeholder';
const nhostRegion = process.env.NEXT_PUBLIC_NHOST_REGION || process.env.NHOST_REGION || 'eu-central-1';

const nhost = new NhostClient({
  subdomain: nhostSubdomain,
  region: nhostRegion
});

export { nhost };