import React, { useEffect, useState } from "react";

//packages
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

//icons
import { PlusSmallIcon } from "@heroicons/react/24/solid";

//components
import ImageModal from "./modals/ImageModal";

export const Gallery = () => {
    const [imageName, setImageName] = useState("");
    const [images, setImages] = useState([]);
    const [progress, setProgress] = useState("");
    const [imageModal, setImageModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const API_URL = "https://gallery-server-n3lc.onrender.com/api/";

    //success notification
    const notify = () => toast.success("Image uploaded successfully", { autoClose: 800 });

    useEffect(() => {
        fetchImages();
    }, []);

    //fetch all images
    const fetchImages = async () => {
        const response = await axios.get(`${API_URL}gallery`);
        setImages(response.data?.images);
    };

    //upload image
    const handleImageChange = async (e) => {
        const imageToUpload = await e.target.files[0];
        setImageName(imageToUpload?.name);

        //progressbar elemnt
        let progressBar = document.getElementById("progress");

        const formData = new FormData();
        formData.append("gallery_image", imageToUpload);

        const response = await axios.post(`${API_URL}gallery/upload/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.bytes) {
                    progressBar.style.width = `${Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    )}%`;
                    setProgress(progressBar.style.width);
                }
            },
        });

        notify();

        //clearing image name & progress bar
        setTimeout(() => {
            progressBar.style.width = "0";
            setImageName("");
            setProgress("");
        }, 1000);

        setImages(response.data?.images);
    };

    //open modal
    const handleModal = (index) => {
        window.scrollTo(0, 0);
        setSelectedImageIndex(index);
        setImageModal(true);
    };

    //prevent scrolling when modal open
    useEffect(() => {
        if (imageModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => (document.body.style.overflow = "unset");
    }, [imageModal]);

    return (
        <>
            <section className="py-[70px] sm3:py-[40px]">
                {imageModal && (
                    <ImageModal>
                        {images}
                        {selectedImageIndex}
                        {setImageModal}
                        {imageModal}
                    </ImageModal>
                )}
                <section className="wrapper">
                    <h1 className="text-[#111] text-[28px] md4:text-[26px] sm3:text-[24px] text-center font-bold">
                        Photo Gallery
                    </h1>
                    <h2 className="text=[#ACACAC] text-[22px] text-center mb-[35px] md3:text-[20px] sm3:text-[18px] md4:mb-[26px] sm3:mb-[20px]">
                        "A picture is worth thousand words."
                    </h2>
                    <div className="middle mb-[25px] md4:mb-[18px] md2:mb-[12px] flex flex-col justify-center items-center gap-[10px]">
                        <button className="text-[#EED8C0] relative z-20 ">
                            <input
                                type="file"
                                className="absolute inset-0 h-[100%] w-[100%] opacity-0 "
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                            <PlusSmallIcon className=" h-[30px] w-[30px] border-[1px]  border-solid rounded-full p-[3px] border-[#EED8C0]" />
                        </button>
                        <span className="min-h-[25px]">{imageName}</span>
                    </div>

                    <div className="w-[100%] h-[10px]  transition-all ease-in-out mb-[30px] md4:mb-[20px] relative bg-[rgba(0,0,0,0.1)] rounded-[5px]">
                        <hr
                            id="progress"
                            className="bg-[#EFD9C2] h-[100%] w-[0] transition overflow-x-hidden rounded-[5px]"
                        />
                        <span className="absolute z-10 right-0 bottom-[-25px]">{progress}</span>
                    </div>

                    <div className="flex justify-between items-center flex-wrap  gap-[20px] md4:gap-[15px] sm1:gap-[10px]">
                        {images?.map((image, index) => (
                            <div
                                onClick={() => handleModal(index)}
                                key={index}
                                className="img-card w-[31%] lg1:w-[48%] md4:w-[47%] cursor-pointer"
                                style={{
                                    boxShadow:
                                        "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                                }}
                            >
                                <LazyLoadImage
                                    alt={"img"}
                                    src={image}
                                />
                            </div>
                        ))}
                    </div>
                </section>
                <ToastContainer />
            </section>
        </>
    );
};
