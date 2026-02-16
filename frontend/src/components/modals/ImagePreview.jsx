import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../common/Modal';

const ImagePreview = ({ isVisible, onClose, src, alt }) => {
  if (!isVisible) return null;

  return (
    <Modal isVisible={isVisible} onClose={onClose} width="max-w-3xl w-full">
      <div className="flex flex-col items-center gap-4">
        <img
          src={src}
          alt={alt || 'Preview'}
          className="max-h-[80vh] w-auto max-w-full object-contain rounded-md"
        />
      </div>
    </Modal>
  );
};

ImagePreview.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string,
  alt: PropTypes.string,
};

ImagePreview.defaultProps = {
  isVisible: false,
  src: '',
  alt: '',
};

export default ImagePreview;