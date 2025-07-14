import { useEffect, useState } from 'react';

// Hook pour gérer l'hydratation côté client
export function useClientMount() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}