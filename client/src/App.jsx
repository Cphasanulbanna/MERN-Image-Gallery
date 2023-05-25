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
        console.log(response);
    };

    const handleImageChange = async (e) => {
        const imageToUpload = await e.target.files[0];
        setImageName(imageToUpload?.name);

        const formData = new FormData();
        formData.append("gallery_image", imageToUpload);

        const response = await axios.post(`${API_URL}gallery/upload/`, formData, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        setImages(response.data.imageNameList);
    };

    // const addImage = async () => {};

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

                <hr className="bg-[#EFD9C2] h-[4px] w-[100%] rounded-[5px]" />
                <div>
                    <div className="img-card"></div>
                </div>
            </section>
        </section>
    );
};
