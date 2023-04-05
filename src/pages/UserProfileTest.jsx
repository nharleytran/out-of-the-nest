import React, { useState } from 'react';
import { uploadImage } from '../api/image_api';
import axios from 'axios';

const Regular = () => {
  const [file, setFile] = useState(null);

  const handleFile = (event) => {
    setFile(event.target.files[0]);
  };

  const fileUploadHandler = () => {
    console.log('fileUploadHandler')
    const fd = new FormData();
    fd.append('image', file, file.name);
    //generate random id
    fd.append('id', Math.random());
    uploadImage(fd);

  };

  return (
    <>
      <input
        className='file-input'
        onChange={handleFile}
        type='file'
        name='file'
        id='file'
      />
      <button type='submit' onClick={fileUploadHandler}>submit</button>
    </>
  );
};

export default Regular;