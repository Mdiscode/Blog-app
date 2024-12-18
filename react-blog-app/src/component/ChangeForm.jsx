import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ChangeForm = () => {
    const [image, setImage] = useState(null);
    const [imageId, setImageId] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file); // Store the selected image in the state
    };

    const uploadImage = async () => {
        if (!image) {
            toast.error("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image); // Append the image file

        try {
            // Make the API call to Laravel backend
            const response = await axios.post("http://127.0.0.1:8000/api/demo", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Ensure the content type is set
                },
            });

            if (response.data.status === true) {
                setImageId(response.data.image.id); // Save the image ID or path returned by the backend
                toast.success("Image uploaded successfully!");
            } else {
                toast.error("Failed to upload image: " + response.data.errors.image);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="container">
            <h3>Image Upload</h3>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadImage} className="btn btn-primary mt-2">Upload Image</button>
            {imageId && <p>Image uploaded successfully. ID: {imageId}</p>}
        </div>
    );
};

export default ChangeForm;
