import React from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

import { Dropzone } from './styles';

function Files({ getFiles, handleError, handleDrop }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      handleDrop(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const renderFiles = () => {
    return getFiles().map((file, index) => {
      return (
        <img
          key={`${index}-${file.name}`}
          src={file.preview}
          alt={`Property preview ${file.name}`}
        />
      );
    });
  };

  return (
    <Dropzone>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {getFiles().length === 0 ? (
          <p>Jogue as imagens ou clique aqui para adiciona-las</p>
        ) : (
          renderFiles()
        )}
      </div>
    </Dropzone>
  );
}

Files.propTypes = {
  getFiles: PropTypes.func,
  handleError: PropTypes.func,
  handleDrop: PropTypes.func,
};

export default Files;
