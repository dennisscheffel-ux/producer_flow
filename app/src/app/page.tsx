import { sql } from "@/lib/db";

type Track = {
  id: number;
  title: string;
  artist: string;
  genre: string;
  bpm: number;
  created_at: string;
};

async function getTracks(): Promise<Track[]> {
  const rows = await sql`SELECT * FROM tracks ORDER BY id`;
  return rows as Track[];
}

export default async function Home() {
  let tracks: Track[] = [];
  let error: string | null = null;

  try {
    tracks = await getTracks();
  } catch {
    error =
      "Could not load tracks. Have you seeded the database? Visit /api/seed first.";
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-indigo-400">
          Producer Flow
        </h1>
        <p className="text-gray-400 mb-8">
          Track library — powered by Neon Postgres
        </p>

        {error ? (
          <div className="bg-red-900/40 border border-red-700 rounded-lg p-4 text-red-300">
            {error}
          </div>
        ) : tracks.length === 0 ? (
          <div className="bg-yellow-900/40 border border-yellow-700 rounded-lg p-4 text-yellow-300">
            No tracks found. Visit{" "}
            <a href="/api/seed" className="underline">
              /api/seed
            </a>{" "}
            to populate the database.
          </div>
        ) : (
          <div className="space-y-4">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center justify-between"
              >
                <div>
                  <p className="text-lg font-semibold">{track.title}</p>
                  <p className="text-gray-400 text-sm">{track.artist}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-indigo-800 text-indigo-200 text-xs font-medium px-2.5 py-1 rounded-full">
                    {track.genre}
                  </span>
                  <p className="text-gray-500 text-sm mt-1">{track.bpm} BPM</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-10 text-xs text-gray-600">
          Seed endpoint:{" "}
          <a href="/api/seed" className="underline hover:text-gray-400">
            /api/seed
          </a>
        </p>
      </div>
    </main>
  );
}
