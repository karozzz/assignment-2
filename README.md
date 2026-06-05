# Student Management System — SCSJ4383 Assignment 2

A web application built with the **Next.js** framework (App Router) that demonstrates
the use of a modern framework together with **RESTful web services**.

> Course: SCSJ4383 / SCJ4383 — Software Construction
> Assignment 2 (7%) — Part A: Frameworks and REST

---

## 1. Application chosen

A **Student Management System** — a simple CRUD application that manages student
records (name, matric number, course, email and CGPA).

## 2. The FIVE (5) functionalities

| # | Functionality | How it works |
|---|---------------|--------------|
| 1 | **Add Student**    | Form submits to a REST endpoint |
| 2 | **View / List Students** | Loads records from a REST endpoint |
| 3 | **Update Student** | Edit a record via a REST endpoint |
| 4 | **Delete Student** | Remove a record via a REST endpoint |
| 5 | **Search / Filter** | Live client-side filtering by name, matric or course |

## 3. The TWO (2) RESTful web services

The application exposes a clean REST API under `/api/students`. The two
functionalities chosen to be delivered **as RESTful web services** are:

### (a) View / List Students — `GET /api/students`
Returns all students as JSON.

### (b) Add Student — `POST /api/students`
Creates a new student from a JSON request body.

> The Update (`PUT`) and Delete (`DELETE`) operations are also implemented as
> REST endpoints on `/api/students/:id`, so the full REST resource is complete.

### Full REST API reference

| Method | Endpoint | Description | Success |
|--------|----------|-------------|---------|
| `GET`    | `/api/students`     | List all students       | 200 |
| `POST`   | `/api/students`     | Create a student        | 201 |
| `GET`    | `/api/students/:id` | Get one student         | 200 |
| `PUT`    | `/api/students/:id` | Update a student        | 200 |
| `DELETE` | `/api/students/:id` | Delete a student        | 200 |

**Example request body (POST / PUT):**

```json
{
  "name": "Nur Aisyah",
  "matric": "A21CS0010",
  "course": "Software Engineering",
  "email": "nur.aisyah@graduate.utm.my",
  "cgpa": 3.80
}
```

---

## How to run

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open the app
# http://localhost:3000
```

### Try the REST API directly (cURL)

```bash
# List all students
curl http://localhost:3000/api/students

# Add a student
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Nur Aisyah","matric":"A21CS0010","course":"Software Engineering","cgpa":3.8}'

# Update a student
curl -X PUT http://localhost:3000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{"cgpa":4.0}'

# Delete a student
curl -X DELETE http://localhost:3000/api/students/1
```

---

## Project structure

```
.
├── data/
│   └── students.json              # JSON file data store (no DB setup needed)
├── src/
│   ├── lib/
│   │   └── db.js                  # read/write helpers for the data store
│   └── app/
│       ├── layout.js              # root layout
│       ├── globals.css            # styling
│       ├── page.js                # UI (consumes the REST API)
│       └── api/
│           └── students/
│               ├── route.js       # GET (list) + POST (create)
│               └── [id]/
│                   └── route.js   # GET + PUT + DELETE (single student)
├── next.config.mjs
├── jsconfig.json
└── package.json
```

## Tech stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19
- **Web services:** Next.js Route Handlers (REST API)
- **Data store:** local JSON file (so the project runs with zero external setup)
# assignment-2
# assignment-2
