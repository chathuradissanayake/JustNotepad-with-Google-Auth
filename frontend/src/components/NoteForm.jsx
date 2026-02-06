import React, { useState, useEffect } from 'react';

const NoteForm = ({ onSubmit, noteToEdit, clearEdit }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (noteToEdit) {
      setSubject(noteToEdit.subject);
      setBody(noteToEdit.body);
    }
  }, [noteToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !body) return alert('Fill all fields');
    onSubmit({ subject, body });
    setSubject('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <input
        type="text"
        placeholder="Subject"
        className="border p-2 w-full mb-2 rounded"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        placeholder="Note"
        className="border p-2 w-full mb-2 rounded"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {noteToEdit ? 'Update Note' : 'Add Note'}
        </button>
        {noteToEdit && (
          <button
            type="button"
            onClick={clearEdit}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;
