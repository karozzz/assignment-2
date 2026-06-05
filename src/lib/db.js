import { promises as fs } from "fs";
import path from "path";

// Simple JSON-file based data store so the app runs with zero external setup
// (no database server needed). In a real deployment this would be a DB.
const DATA_FILE = path.join(process.cwd(), "data", "students.json");

export async function readStudents() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    // If the file is missing or empty, start with an empty list.
    return [];
  }
}

export async function writeStudents(students) {
  await fs.writeFile(DATA_FILE, JSON.stringify(students, null, 2), "utf-8");
}

export function generateId(students) {
  const ids = students.map((s) => parseInt(s.id, 10)).filter((n) => !isNaN(n));
  const next = ids.length ? Math.max(...ids) + 1 : 1;
  return String(next);
}
