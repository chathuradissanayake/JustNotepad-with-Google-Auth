import React from 'react';

const NoteItem = ({ note, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow mb-2">
      <h3 className="font-bold text-lg">{note.subject}</h3>
      <p className="mb-2">{note.body}</p>
      <p className="text-sm text-gray-500">{new Date(note.createdAt).toLocaleString()}</p>
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => onEdit(note)}
          className="bg-yellow-400 px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
