import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ setFilename }) => {
    const [file, setFile] = useState(null);

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await axios.post('http://localhost:5000/upload', formData);
        setFilename(res.data.filename);
    };

    return (
        <div className="upload-form">
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload</button>
        </div>
    );
};

export default UploadForm;
