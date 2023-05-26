import React, { useState } from "react";

const ImageModal = ({ children }) => {
    const [images, imageIndex] = children;

    //index of selectedImage
    const [index, setIndex] = useState(imageIndex);

    //view previous image
    const viewPrevImage = () => {
        setIndex(index - 1 < 0 ? imageIndex : index - 1);
    };

    //view next image
    const viewNextImage = () => {
        setIndex(index + 1 > images.length - 1 ? imageIndex : index + 1);
    };

    return (
        <section className="bg-[#c5c5c5] w-[100%] h-[100vh] flex justify-center items-center">
            <div className="modal max-w-[600px] p-[20px] bg-[#fff] rounded-[12px]">
                <div className="rounded-[12px] overflow-hidden ">
                    <img
                        src={images[index]}
                        alt="selected image"
                    />
                </div>
                <div className="buttons flex justify-center items-center gap-[15px] mt-[15px]">
                    <button onClick={viewPrevImage}>prev</button>
                    <button onClick={viewNextImage}>next</button>
                </div>
            </div>
        </section>
    );
};

export default ImageModal;
