import { NextResponse } from "next/server";
import { readStudents, writeStudents } from "@/lib/db";

// ============================================================
// RESTful Web Service (single-item endpoint)
//   GET    /api/students/:id  -> Read one student
//   PUT    /api/students/:id  -> Functionality 3: Update a student
//   DELETE /api/students/:id  -> Functionality 4: Delete a student
// ============================================================

// READ one — RESTful GET
export async function GET(request, { params }) {
  const { id } = await params;
  const students = await readStudents();
  const student = students.find((s) => s.id === id);

  if (!student) {
    return NextResponse.json({ error: "Student not found." }, { status: 404 });
  }
  return NextResponse.json(student, { status: 200 });
}

// UPDATE — RESTful PUT
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const students = await readStudents();
    const index = students.findIndex((s) => s.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Student not found." }, { status: 404 });
    }

    const updated = {
      ...students[index],
      name: body.name ?? students[index].name,
      matric: body.matric ?? students[index].matric,
      course: body.course ?? students[index].course,
      email: body.email ?? students[index].email,
      cgpa:
        body.cgpa !== undefined && body.cgpa !== ""
          ? Number(body.cgpa)
          : students[index].cgpa,
    };

    students[index] = updated;
    await writeStudents(students);

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
}

// DELETE — RESTful DELETE
export async function DELETE(request, { params }) {
  const { id } = await params;
  const students = await readStudents();
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Student not found." }, { status: 404 });
  }

  const [removed] = students.splice(index, 1);
  await writeStudents(students);

  return NextResponse.json(
    { message: "Student deleted.", student: removed },
    { status: 200 }
  );
}
