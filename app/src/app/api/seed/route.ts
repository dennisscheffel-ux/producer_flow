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
      ('George', 'Session Guitarist'),
      ('Paul', 'Mixing Engineer'),
      ('Rosa', 'A&R Manager'),
      ('Leo', 'Beat Maker'),
      ('Diane', 'Vocalist')
  `;

  return NextResponse.json({ message: "Database seeded with 7 people" });
}
