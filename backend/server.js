const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test server
app.get("/", (req, res) => {
  res.send("Notepad backend is running");
});

// Get all notes
app.get("/notes", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM notes ORDER BY updated_at DESC"
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create note
app.post("/notes", async (req, res) => {
  try {
    const { title, content } = req.body;

    const result = await pool.query(
      `INSERT INTO notes (title, content)
       VALUES ($1, $2)
       RETURNING *`,
      [title || "Untitled Note", content || ""]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update note
app.put("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const result = await pool.query(
      `UPDATE notes
       SET title = $1,
           content = $2,
           updated_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [title, content, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete note
app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM notes WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});