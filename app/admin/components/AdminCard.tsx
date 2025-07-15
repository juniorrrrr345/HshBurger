import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export default function AdminCard({ title, description, children, className = '' }: AdminCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>
      <div className="px-6 py-4">
        {children}
      </div>
    </div>
  );
}