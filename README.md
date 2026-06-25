# Notepad Application

A full-stack Notepad application built using **React.js**, **Node.js (Express)**, and **Supabase PostgreSQL**. The application allows users to create, edit, delete, search, and manage notes through a modern web interface.

---

## Tech Stack

### Frontend

* React.js
* Vite
* CSS

### Backend

* Node.js
* Express.js

### Database

* Supabase (PostgreSQL)

---

## Project Structure

```text
notepad-app/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   ├── .env
│   └── ...
│
└── README.md
```

---

# Prerequisites

Before running the application, install the following:

* Node.js (v18 or newer)
* npm
* Git
* Supabase account and project

---

# Installation

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/notepad-app.git
```

Go inside the project.

```bash
cd notepad-app
```

---

## 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 3. Install Backend Dependencies

Open another terminal.

```bash
cd backend
npm install
```

---

# Environment Variables

Create a file named `.env` inside the **backend** folder.

Example:

```env
PORT=5000
DATABASE_URL=postgresql://YOUR_CONNECTION_STRING
```

Replace `YOUR_CONNECTION_STRING` with your Supabase **Session Pooler** connection string.

---

# Running the Backend

Inside the **backend** folder:

```bash
npm start
```

or

```bash
npm run dev
```

The backend will start on:

```
http://localhost:5000
```

---

# Running the Frontend

Inside the **frontend** folder:

```bash
npm run dev
```

The Vite development server will start.

Example:

```
Local: http://localhost:5173
```

Open the URL shown in your browser.

---

# Available Frontend Commands

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Create production build

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# Available Backend Commands

Install dependencies

```bash
npm install
```

Run server

```bash
npm start
```

or

```bash
npm run dev
```

---

# API Endpoints

| Method | Endpoint   | Description              |
| ------ | ---------- | ------------------------ |
| GET    | /notes     | Retrieve all notes       |
| GET    | /notes/:id | Retrieve a specific note |
| POST   | /notes     | Create a new note        |
| PUT    | /notes/:id | Update an existing note  |
| DELETE | /notes/:id | Delete a note            |

---

# Database

This project uses **Supabase PostgreSQL** as the backend database.

The backend communicates with Supabase using the **pg** package and a secure connection string stored in the `.env` file.

---

# License

This project is intended for educational purposes.
