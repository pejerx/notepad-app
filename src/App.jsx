import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [selectedLabel, setSelectedLabel] = useState("All");
  const [search, setSearch] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const labels = ["Projects", "Business", "Personal"];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase());

    const matchesLabel =
      selectedLabel === "All" || note.label === selectedLabel;

    return matchesSearch && matchesLabel;
  });

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Untitled Note",
      content: "",
      label: "Projects",
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    setNotes([newNote, ...notes]);
    setEditingNote(newNote);
  };

  const saveNote = () => {
    if (!editingNote) return;

    setNotes(
      notes.map((note) =>
        note.id === editingNote.id ? editingNote : note
      )
    );

    setEditingNote(null);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    setEditingNote(null);
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="circle"></div>
          <div className="line"></div>
        </div>

        <nav className="sidebar-menu">
          <button className="menu-item active">▦ Overview</button>
          <button className="menu-item">▣ Notes</button>
        </nav>

        <div className="legend">
          <p className="legend-title">Labels</p>

          <button
            className={`legend-item ${selectedLabel === "All" ? "selected" : ""}`}
            onClick={() => setSelectedLabel("All")}
          >
            <span className="dot all"></span> All
          </button>

          {labels.map((label) => (
            <button
              key={label}
              className={`legend-item ${
                selectedLabel === label ? "selected" : ""
              }`}
              onClick={() => setSelectedLabel(label)}
            >
              <span className={`dot ${label.toLowerCase()}`}></span>
              {label}
            </button>
          ))}
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="search-box">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="add-btn" onClick={addNote}>
            ＋ Add new note
          </button>
        </header>

        <div className="tabs">
          <button
            className={selectedLabel === "All" ? "tab active-tab" : "tab"}
            onClick={() => setSelectedLabel("All")}
          >
            All
          </button>

          {labels.map((label) => (
            <button
              key={label}
              className={selectedLabel === label ? "tab active-tab" : "tab"}
              onClick={() => setSelectedLabel(label)}
            >
              {label}
            </button>
          ))}
        </div>

        {filteredNotes.length === 0 ? (
          <div className="empty-dashboard">
            <h2>No notes yet</h2>
            <p>Click “Add new note” to create your first note.</p>
          </div>
        ) : (
          <section className="notes-grid">
            {filteredNotes.map((note) => (
              <div className="note-card" key={note.id}>
                <p className="date">{note.date}</p>

                <div className="note-label">
                  <span className={`dot ${note.label.toLowerCase()}`}></span>
                  {note.label}
                </div>

                <h3>{note.title}</h3>
                <p className="note-preview">
                  {note.content || "No content yet..."}
                </p>

                <div className="card-actions">
                  <button onClick={() => setEditingNote(note)}>Edit</button>
                  <button onClick={() => deleteNote(note.id)}>Delete</button>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>

      {editingNote && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Note</h2>

            <input
              className="modal-input"
              value={editingNote.title}
              onChange={(e) =>
                setEditingNote({
                  ...editingNote,
                  title: e.target.value,
                })
              }
              placeholder="Note title"
            />

            <select
              className="modal-input"
              value={editingNote.label}
              onChange={(e) =>
                setEditingNote({
                  ...editingNote,
                  label: e.target.value,
                })
              }
            >
              {labels.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>

            <textarea
              className="modal-textarea"
              value={editingNote.content}
              onChange={(e) =>
                setEditingNote({
                  ...editingNote,
                  content: e.target.value,
                })
              }
              placeholder="Write your note here..."
            />

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setEditingNote(null)}>
                Cancel
              </button>
              <button className="save-btn" onClick={saveNote}>
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;