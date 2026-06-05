"use client";

import { useEffect, useState } from "react";

const EMPTY_FORM = {
  name: "",
  matric: "",
  course: "",
  email: "",
  cgpa: "",
};

export default function Home() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null); // { type, text }

  // ---- Functionality 2: View / List (consumes RESTful GET /api/students) ----
  async function loadStudents() {
    const res = await fetch("/api/students");
    const data = await res.json();
    setStudents(data);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  function showMessage(type, text) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // ---- Functionality 1 & 3: Add / Update (RESTful POST & PUT) ----
  async function handleSubmit(e) {
    e.preventDefault();

    const url = editingId ? `/api/students/${editingId}` : "/api/students";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      showMessage("error", data.error || "Something went wrong.");
      return;
    }

    showMessage("success", editingId ? "Student updated." : "Student added.");
    setForm(EMPTY_FORM);
    setEditingId(null);
    loadStudents();
  }

  function startEdit(student) {
    setEditingId(student.id);
    setForm({
      name: student.name,
      matric: student.matric,
      course: student.course,
      email: student.email || "",
      cgpa: student.cgpa ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  // ---- Functionality 4: Delete (RESTful DELETE) ----
  async function handleDelete(id) {
    if (!confirm("Delete this student?")) return;

    const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (!res.ok) {
      showMessage("error", data.error || "Could not delete.");
      return;
    }
    showMessage("success", "Student deleted.");
    loadStudents();
  }

  // ---- Functionality 5: Search / Filter (client-side) ----
  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.matric.toLowerCase().includes(q) ||
      s.course.toLowerCase().includes(q)
    );
  });

  return (
    <div className="container">
      <header className="header">
        <h1>🎓 Student Management System</h1>
        <p>SCSJ4383 Assignment 2 — Next.js framework + RESTful web services</p>
      </header>

      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      {/* Functionality 1 & 3: Add / Edit form */}
      <section className="card">
        <h2>{editingId ? "✏️ Edit Student" : "➕ Add Student"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label>Full Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Ahmad Faiz"
                required
              />
            </div>
            <div className="field">
              <label>Matric No. *</label>
              <input
                name="matric"
                value={form.matric}
                onChange={handleChange}
                placeholder="e.g. A21CS0001"
                required
              />
            </div>
            <div className="field">
              <label>Course *</label>
              <input
                name="course"
                value={form.course}
                onChange={handleChange}
                placeholder="e.g. Software Engineering"
                required
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. student@graduate.utm.my"
              />
            </div>
            <div className="field">
              <label>CGPA</label>
              <input
                name="cgpa"
                type="number"
                step="0.01"
                min="0"
                max="4"
                value={form.cgpa}
                onChange={handleChange}
                placeholder="e.g. 3.75"
              />
            </div>
          </div>
          <div className="actions">
            <button type="submit" className="btn-primary">
              {editingId ? "Update Student" : "Add Student"}
            </button>
            {editingId && (
              <button type="button" className="btn-ghost" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
        <p className="api-note">
          Add → <code>POST /api/students</code> &nbsp;|&nbsp; Update →{" "}
          <code>PUT /api/students/:id</code>
        </p>
      </section>

      {/* Functionality 2, 4, 5: List, Search, Delete */}
      <section className="card">
        <h2>📋 Students</h2>

        {/* Functionality 5: Search */}
        <div className="search-bar">
          <input
            placeholder="🔍 Search by name, matric, or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="count">
            {filtered.length} of {students.length} shown
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty">No students found.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Matric</th>
                <th>Course</th>
                <th>Email</th>
                <th>CGPA</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>
                    <span className="badge">{s.matric}</span>
                  </td>
                  <td>{s.course}</td>
                  <td>{s.email || "—"}</td>
                  <td>{s.cgpa ?? "—"}</td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="btn-sm btn-edit"
                        onClick={() => startEdit(s)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-sm btn-delete"
                        onClick={() => handleDelete(s.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p className="api-note">
          List → <code>GET /api/students</code> &nbsp;|&nbsp; Delete →{" "}
          <code>DELETE /api/students/:id</code>
        </p>
      </section>
    </div>
  );
}
