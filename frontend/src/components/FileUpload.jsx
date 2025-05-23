// component to upload a file
import { useState } from 'react';
import { uploadFile } from '../api';

export default function FileUpload({ onSuccess, setSessionId }) {
    const [file, setFile] = useState(null);
    const [hover, setHover] = useState(false);

    const handleSubmit = async (selectedFile) => {
        if (selectedFile) {
            try {
                const response = await uploadFile(selectedFile);
                setSessionId(response.data.session_id);
                onSuccess();
            } catch (e) {
                alert("Upload failed");
                console.error("Upload error:", e)
            }
        }
    };

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            handleSubmit(selectedFile)
        }
    };

    return (
        <div className="p-4">
            <label htmlFor="file" style={{
                display: "inline-block",
                padding: "10px 20px",
                backgroundColor: hover ? "rgb(202, 10, 10)" : "rgb(255, 0, 0)",
                cursor: "pointer",
                color: "white",
                fontSize: 16,
                fontWeight: "600",
                borderRadius: "20px"
            }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                Upload File
            </label>

            <input id="file" type="file" style={{ display: "none" }} onChange={handleChange}/>
            {file && <p>Selected file: {file.name}</p>}
        </div>
    );
}