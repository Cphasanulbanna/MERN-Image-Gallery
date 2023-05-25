import React, { useEffect, useState } from "react";

//packages
import axios from "axios";

//icons
import { PlusSmallIcon } from "@heroicons/react/24/solid";

export const App = () => {
    const [imageName, setImageName] = useState("");
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    const API_URL = "http://localhost:5005/api/";
    const fetchImages = async () => {
        const response = await axios.get(`${API_URL}gallery`);
        // console.log(response);
        setImages(response.data?.images);
    };

    const handleImageChange = async (e) => {
        const imageToUpload = await e.target.files[0];
        setImageName(imageToUpload?.name);

        const formData = new FormData();
        formData.append("gallery_image", imageToUpload);

        const response = await axios.post(`${API_URL}gallery/upload/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.bytes) {
                    const progressBar = document.getElementById("progress");
                    progressBar.style.width = `${Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    )}%`;
                }
            },
        });
        setImages(response.data.imageNameList);
    };

    return (
        <section className="h-[100vh] py-[70px]">
            <section className="wrapper">
                <h1 className="text-[#111] text-[28px] text-center font-bold">Photo Gallery</h1>
                <h2 className="text=[#ACACAC] text-[22px] text-center mb-[35px]">
                    A picture is worth thousand words.
                </h2>
                <div className="middle mb-[25px] flex flex-col justify-center items-center gap-[10px]">
                    <button className="text-[#EED8C0] relative z-20 ">
                        <input
                            type="file"
                            className="absolute inset-0 h-[100%] w-[100%] opacity-0 "
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        <PlusSmallIcon className=" h-[30px] w-[30px] border-[1px]  border-solid rounded-full p-[3px] border-[#EED8C0]" />
                    </button>
                    <span>{imageName}</span>
                </div>

                <div className="w-[100%] h-[10px] rounded-[5px] border-[#EFD9C2] border-[1px] border-solid transition">
                    <hr
                        id="progress"
                        className="bg-[#EFD9C2] h-[100%] w-[0] transition"
                    />
                </div>

                <div>
                    {images?.map((image) => (
                        <div className="img-card">
                            <img
                                src={`http://localhost:5005/images/${image}`}
                                alt=""
                            />
                        </div>
                    ))}
                </div>
            </section>
        </section>
    );
};
