const API_URL = import.meta.env.VITE_API_URL || "/api/notes";

// helper to get headers with JWT
const authHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// helper for multipart form data headers
const authHeadersMultipart = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
    // Don't set Content-Type, browser will set it with boundary
  };
};

// Get all notes
export const getNotes = async () => {
  const res = await fetch(API_URL, {
    headers: authHeaders(),
  });
  return res.json();
};

// Get single note
export const getNote = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: authHeaders(),
  });
  return res.json();
};

// Create note with images
export const createNote = async (note, images = []) => {
  const formData = new FormData();
  formData.append("subject", note.subject);
  formData.append("body", note.body);

  // Append images
  images.forEach((image) => {
    formData.append("images", image);
  });

  const res = await fetch(API_URL, {
    method: "POST",
    headers: authHeadersMultipart(),
    body: formData,
  });
  return res.json();
};

// Update note
export const updateNote = async (id, note) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(note),
  });
  return res.json();
};

// Delete note
export const deleteNote = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return res.json();
};

// Remove image from note
export const removeImage = async (noteId, imageUrl) => {
  const res = await fetch(`${API_URL}/${noteId}/image`, {
    method: "DELETE",
    headers: authHeaders(),
    body: JSON.stringify({ imageUrl }),
  });
  return res.json();
};
