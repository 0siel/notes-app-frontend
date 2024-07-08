import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get(
      "https://incredible-notes-app-32df6015f60c.herokuapp.com"
    );
    setNotes(response.data);
  };

  const addNote = async (e) => {
    e.preventDefault();
    const newNote = { title, content };
    await axios.post(
      "https://incredible-notes-app-32df6015f60c.herokuapp.com",
      newNote
    );
    fetchNotes();
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h1>Notes App</h1>
      <form onSubmit={addNote}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Add Note</button>
      </form>
      <div>
        {notes.map((note) => (
          <div key={note._id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
