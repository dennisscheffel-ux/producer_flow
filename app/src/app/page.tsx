import { sql } from "@/lib/db";

type Person = {
  id: number;
  name: string;
  job: string;
  created_at: string;
};

async function getPeople(): Promise<Person[]> {
  const rows = await sql`SELECT * FROM people ORDER BY id`;
  return rows as Person[];
}

export default async function Home() {
  let people: Person[] = [];
  let error: string | null = null;

  try {
    people = await getPeople();
  } catch {
    error =
      "Could not load people. Visit /api/seed to populate the database first.";
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-10">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-indigo-400">
          Producer Flow
        </h1>
        <p className="text-gray-400 mb-8">People — pulled from Neon Postgres</p>

        <div className="mb-10">
          <p className="text-6xl font-black text-white">Hello World</p>
        </div>

        {error ? (
          <div className="bg-red-900/40 border border-red-700 rounded-lg p-4 text-red-300">
            {error}
          </div>
        ) : people.length === 0 ? (
          <div className="bg-yellow-900/40 border border-yellow-700 rounded-lg p-4 text-yellow-300">
            No people found. Visit{" "}
            <a href="/api/seed" className="underline">
              /api/seed
            </a>{" "}
            to populate the database.
          </div>
        ) : (
          <ul className="space-y-3">
            {people.map((person) => (
              <li
                key={person.id}
                className="bg-gray-900 border border-gray-800 rounded-xl px-6 py-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center text-lg font-bold text-white shrink-0">
                  {person.name[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-lg font-medium">{person.name}</p>
                  <p className="text-sm text-gray-400">{person.job}</p>
                </div>
                <span className="ml-auto text-xs text-gray-600">
                  #{person.id}
                </span>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-10 text-xs text-gray-600">
          Seed:{" "}
          <a href="/api/seed" className="underline hover:text-gray-400">
            /api/seed
          </a>
        </p>
      </div>
    </main>
  );
}
