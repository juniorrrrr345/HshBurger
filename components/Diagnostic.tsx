'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface DiagnosticProps {
  currentPath: string;
}

export default function Diagnostic({ currentPath }: DiagnosticProps) {
  const router = useRouter();
  const [diagnostics, setDiagnostics] = useState<string[]>([]);

  useEffect(() => {
    const logs: string[] = [];
    
    // Diagnostic 1: Vérifier si on est côté client
    logs.push(`Client-side: ${typeof window !== 'undefined'}`);
    
    // Diagnostic 2: Vérifier le chemin actuel
    logs.push(`Current path: ${currentPath}`);
    
    // Diagnostic 3: Vérifier si Next.js router est disponible
    logs.push(`Router available: ${!!router}`);
    
    // Diagnostic 4: Vérifier les données localStorage
    if (typeof window !== 'undefined') {
      const products = localStorage.getItem('cbd-products');
      const settings = localStorage.getItem('cbd-shop-settings');
      logs.push(`Products in localStorage: ${products ? 'Yes' : 'No'}`);
      logs.push(`Settings in localStorage: ${settings ? 'Yes' : 'No'}`);
    }
    
    setDiagnostics(logs);
  }, [currentPath, router]);

  return (
    <div className="fixed bottom-4 right-4 bg-white border rounded-lg shadow-lg p-4 max-w-sm z-50">
      <h3 className="font-bold mb-2">Diagnostic</h3>
      <div className="text-xs space-y-1">
        {diagnostics.map((log, index) => (
          <div key={index} className="text-gray-600">{log}</div>
        ))}
      </div>
    </div>
  );
}