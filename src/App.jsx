import { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Ikea shopping list 10 Dec 23",
      content:
        "☐ 2 folding chairs - FROSVI\n☐ 2 pint glasses\n☐ Wrapping paper\n☐ Paper napkins\n☐ Ribbon\n☐ Dill sauce",
    },
    {
      id: 2,
      title: "Christmas shopping 2023",
      content: "Birthdays\n☑ Neil's mum\n☐ Grace Dent book",
    },
    {
      id: 3,
      title: "Trip to London",
      content: "Cartoon museum\nhttps://www.cartoonmuseum.org",
    },
  ]);

  const [selectedNote, setSelectedNote] = useState(notes[0]);
  const [search, setSearch] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Untitled Note",
      content: "",
    };

    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
  };

  const updateNote = (field, value) => {
    const updatedNote = { ...selectedNote, [field]: value };

    setSelectedNote(updatedNote);

    setNotes(
      notes.map((note) =>
        note.id === selectedNote.id ? updatedNote : note
      )
    );
  };

  const deleteNote = () => {
    const remainingNotes = notes.filter((note) => note.id !== selectedNote.id);

    setNotes(remainingNotes);
    setSelectedNote(remainingNotes[0] || null);
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="topbar">
          <button className="icon-button">☰</button>
          <h2>All Notes</h2>
          <button className="icon-button" onClick={addNote}>✎</button>
        </div>

        <div className="search">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search all notes and tags"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="note-list">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`note-item ${
                selectedNote?.id === note.id ? "active" : ""
              }`}
              onClick={() => setSelectedNote(note)}
            >
              <h3>{note.title}</h3>
              <p>{note.content.substring(0, 70)}...</p>
            </div>
          ))}
        </div>
      </aside>

      <main className="editor">
        {selectedNote ? (
          <>
            <div className="editor-toolbar">
              <button className="icon-button">◧</button>
              <div>
                <button className="icon-button">👁</button>
                <button className="icon-button">☷</button>
                <button className="icon-button">ⓘ</button>
                <button className="icon-button" onClick={deleteNote}>🗑</button>
              </div>
            </div>

            <div className="editor-content">
              <input
                className="title-input"
                value={selectedNote.title}
                onChange={(e) => updateNote("title", e.target.value)}
              />

              <textarea
                className="note-textarea"
                value={selectedNote.content}
                onChange={(e) => updateNote("content", e.target.value)}
                placeholder="Start typing your note..."
              />

              <input className="tag-input" placeholder="Add tag..." />
            </div>
          </>
        ) : (
          <div className="empty-note">
            <h2>No notes available</h2>
            <button onClick={addNote}>Create Note</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;