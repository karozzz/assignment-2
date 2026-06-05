import { NextResponse } from "next/server";
import { readStudents, writeStudents, generateId } from "@/lib/db";

// ============================================================
// RESTful Web Service #1 & #2 (collection endpoint)
//   GET  /api/students   -> Functionality 2: View / List all students
//   POST /api/students   -> Functionality 1: Add a new student
// ============================================================

// READ (list) — RESTful GET
export async function GET() {
  const students = await readStudents();
  return NextResponse.json(students, { status: 200 });
}

// CREATE — RESTful POST
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, matric, course, email, cgpa } = body;

    // Basic validation
    if (!name || !matric || !course) {
      return NextResponse.json(
        { error: "Fields 'name', 'matric' and 'course' are required." },
        { status: 400 }
      );
    }

    const students = await readStudents();

    // Prevent duplicate matric numbers
    if (students.some((s) => s.matric === matric)) {
      return NextResponse.json(
        { error: `A student with matric '${matric}' already exists.` },
        { status: 409 }
      );
    }

    const newStudent = {
      id: generateId(students),
      name,
      matric,
      course,
      email: email || "",
      cgpa: cgpa !== undefined && cgpa !== "" ? Number(cgpa) : null,
    };

    students.push(newStudent);
    await writeStudents(students);

    return NextResponse.json(newStudent, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
