import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  await sql`
    CREATE TABLE IF NOT EXISTS people (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`DELETE FROM people`;

  await sql`
    INSERT INTO people (name) VALUES
      ('Nate'),
      ('Dennis'),
      ('Jack')
  `;

  return NextResponse.json({ message: "Database seeded with Nate, Dennis, and Jack" });
}
