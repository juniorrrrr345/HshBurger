import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function SupabaseExamplePage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // Exemple de requête - vous devrez créer cette table dans Supabase
  const { data: todos, error } = await supabase.from('todos').select('*')

  if (error) {
    console.error('Supabase error:', error)
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Test Supabase</h1>
        <p className="text-red-600">Erreur de connexion à Supabase: {error.message}</p>
        <p className="text-sm text-gray-600 mt-2">
          Assurez-vous que les variables d'environnement NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY sont configurées.
        </p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Supabase</h1>
      <p className="text-green-600 mb-4">✅ Connexion à Supabase réussie!</p>
      
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Données de la table 'todos':</h2>
        {todos && todos.length > 0 ? (
          <ul className="space-y-2">
            {todos.map((todo, index) => (
              <li key={index} className="bg-white p-2 rounded">
                {JSON.stringify(todo)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Aucune donnée trouvée dans la table 'todos'</p>
        )}
      </div>
      
      <div className="mt-6 text-sm text-gray-600">
        <p>Pour tester Supabase, créez une table 'todos' dans votre projet Supabase avec les colonnes suivantes:</p>
        <ul className="list-disc list-inside mt-2">
          <li>id (int, primary key)</li>
          <li>title (text)</li>
          <li>completed (boolean)</li>
          <li>created_at (timestamp)</li>
        </ul>
      </div>
    </div>
  )
}