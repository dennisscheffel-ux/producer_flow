import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  await sql`DROP TABLE IF EXISTS people`;

  await sql`
    CREATE TABLE people (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      job TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    INSERT INTO people (name, job) VALUES
      ('Frank', 'Sound Engineer'),
      ('Sally', 'Music Producer'),
      ('George', 'Session Guitarist')
  `;

  return NextResponse.json({ message: "Database seeded with Frank, Sally, and George" });
}
