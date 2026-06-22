import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  await sql`
    CREATE TABLE IF NOT EXISTS tracks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      genre TEXT NOT NULL,
      bpm INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`DELETE FROM tracks`;

  await sql`
    INSERT INTO tracks (title, artist, genre, bpm) VALUES
      ('Midnight Drive', 'DJ Nocturne', 'House', 128),
      ('Solar Flare', 'Synthwave Steve', 'Synthwave', 110),
      ('Concrete Jungle', 'MC Uptown', 'Hip-Hop', 95),
      ('Ocean Drift', 'Chill Harbor', 'Lo-Fi', 75),
      ('Neon Pulse', 'Electra V', 'Techno', 140)
  `;

  return NextResponse.json({ message: "Database seeded successfully" });
}
