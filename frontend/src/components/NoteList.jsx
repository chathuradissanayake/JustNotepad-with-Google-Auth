import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onEdit, onDelete }) => {
  if (!notes.length) return <p>No notes yet</p>;

  return (
    <div>
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default NoteList;
