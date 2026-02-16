import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ImagePreview from './ImagePreview';

const initialForm = { subject: '', body: '', images: [] };

const NoteModal = ({ isOpen, onClose, onSubmit, noteToEdit, clearEdit, onDelete }) => {
  const [form, setForm] = useState(initialForm);
  const [showMenu, setShowMenu] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // image preview modal state
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState('');

  useEffect(() => {
    if (noteToEdit) {
      setForm({
        subject: noteToEdit.subject ?? '',
        body: noteToEdit.body ?? '',
        images: noteToEdit.images ?? [],
      });
      setImagePreviews(noteToEdit.images ?? []);
      setImageFiles([]);
    } else {
      setForm(initialForm);
      setImagePreviews([]);
      setImageFiles([]);
    }
  }, [noteToEdit]);

  const handleClose = useCallback(() => {
    clearEdit?.();
    setForm(initialForm);
    setShowMenu(false);
    setImageFiles([]);
    setImagePreviews([]);
    onClose?.();
    setPreviewOpen(false);
    setPreviewSrc('');
  }, [clearEdit, onClose]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleImageSelect = useCallback((e) => {
    const files = Array.from(e.target.files);
    
    // Validate file count
    const totalImages = imagePreviews.length + files.length;
    if (totalImages > 5) {
      alert('Maximum 5 images allowed per note');
      return;
    }

    // Validate file types and sizes
    const validFiles = [];
    const validPreviews = [];

    for (const file of files) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file`);
        continue;
      }

      // Check file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} exceeds 5MB limit`);
        continue;
      }

      validFiles.push(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        validPreviews.push(reader.result);
        if (validPreviews.length === validFiles.length) {
          setImageFiles((prev) => [...prev, ...validFiles]);
          setImagePreviews((prev) => [...prev, ...validPreviews]);
        }
      };
      reader.readAsDataURL(file);
    }

    // Reset input
    e.target.value = '';
  }, [imagePreviews.length]);

  const handleRemoveImage = useCallback((index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const openPreview = useCallback((src) => {
    setPreviewSrc(src);
    setPreviewOpen(true);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const subject = form.subject.trim();
      const body = form.body.trim();
      
      if (!subject || !body) {
        return alert('Fill all fields');
      }

      try {
        // Pass both form data and images
        await onSubmit({ subject, body }, imageFiles);
      } catch (err) {
        console.error(err);
      } finally {
        setForm(initialForm);
        setImageFiles([]);
        setImagePreviews([]);
        onClose?.();
      }
    },
    [form, imageFiles, onSubmit, onClose]
  );

  const handleDelete = useCallback(() => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDelete?.(noteToEdit._id);
      handleClose();
    }
  }, [noteToEdit, onDelete, handleClose]);

  const isDisabled = !form.subject.trim() || !form.body.trim();

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50" 
        onClick={handleBackdropClick}
      >
        <div className="relative w-full h-full md:w-full lg:w-full xl:w-2/3 md:h-screen shadow-lg rounded-none md:rounded-lg">
          <div className="bg-linear-to-br from-cyan-50 to-teal-50 h-full rounded-none md:rounded-lg overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-linear-to-r from-cyan-400 to-sky-400 px-4 md:px-6 py-4 flex items-center justify-between border-b-4 border-sky-500">
              <div className="flex items-center gap-3">
                <h2 className="text-lg md:text-xl font-semibold text-white">
                  {noteToEdit ? 'Edit Note' : 'New Note'}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {noteToEdit && (
                  <div className="relative">
                    <button
                      onClick={() => setShowMenu(!showMenu)}
                      className="text-white hover:text-cyan-200 transition-colors p-1"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                    {showMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50">
                        <button
                          onClick={handleDelete}
                          className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 font-medium"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete Note
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <button
                  onClick={handleClose}
                  className="text-white hover:text-cyan-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 md:p-6 flex-1 flex flex-col overflow-hidden">
              {/* Subject */}
              <div className="mb-4 md:mb-6">
                <input
                  name="subject"
                  type="text"
                  autoFocus
                  placeholder="Title..."
                  className="w-full text-xl md:text-2xl font-bold bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 pb-2 border-b-2 border-cyan-300 focus:border-cyan-500 transition-colors"
                  value={form.subject}
                  onChange={handleChange}
                  aria-label="subject"
                />
              </div>

              {/* Body */}
              <div className="relative flex-1 overflow-auto mb-4">
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 35px, #06b6d4 35px, #06b6d4 36px)',
                    opacity: 0.1
                  }}
                />
                <textarea
                  name="body"
                  placeholder="Start writing your note..."
                  className="w-full h-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 resize-none font-mono text-sm md:text-base leading-9 relative z-10"
                  value={form.body}
                  onChange={handleChange}
                  aria-label="body"
                  style={{ lineHeight: '36px' }}
                />
              </div>

              {/* Image Upload */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer px-4 py-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Add Images
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <span className="text-xs text-gray-500">
                    ({imagePreviews.length}/5)
                  </span>
                </div>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="flex flex-wrap gap-3 max-h-48 overflow-y-auto">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group flex items-center justify-center">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="h-12 w-auto object-contain rounded-lg border-2 border-cyan-200 cursor-pointer"
                          style={{ height: '96px' }}
                          onClick={() => openPreview(preview)}
                        />
                       <button
                         type="button"
                         onClick={() => handleRemoveImage(index)}
                         className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                       >
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                         </svg>
                       </button>
                     </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t-2 border-cyan-200">
                <button
                  type="submit"
                  disabled={isDisabled}
                  className={`flex-1 px-4 md:px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                    isDisabled 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-linear-to-r from-cyan-400 to-sky-400 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {noteToEdit ? '✓ Update Note' : '+ Add Note'}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 md:px-6 py-3 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all transform hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ImagePreview isVisible={previewOpen} onClose={() => setPreviewOpen(false)} src={previewSrc} alt="Image preview" />
    </>
  );
};

NoteModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  noteToEdit: PropTypes.object,
  clearEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

NoteModal.defaultProps = {
  isOpen: false,
  onClose: () => {},
  noteToEdit: null,
  clearEdit: () => {},
  onDelete: () => {},
};

export default NoteModal;