import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
    const [username, setUsername] = useState("");
    const [image, setImage] = useState(null);
    const [response, setResponse] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData
        const formData = new FormData();
        formData.append("username", username);
        formData.append("image", image);

        try {
            const res = await axios.post("http://localhost:8000/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setResponse(res.data.message);
        } catch (err) {
            console.error(err);
            setResponse("Error uploading file.");
        }
    };

    return (
        <div>
            <h1>Upload Image and Username</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit">Upload</button>
            </form>
            {response && <p>{response}</p>}
        </div>
    );
};

export default FileUpload;
