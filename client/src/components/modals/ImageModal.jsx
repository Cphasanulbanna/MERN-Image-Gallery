import React from "react";

const ImageModal = ({ children }) => {
    const [images, imageIndex] = children;
    console.log(images);
    return (
        <div className="bg-[#fff] w-[500px] h-[500px]">
            <div>
                <img
                    src={images[imageIndex]}
                    alt="selected image"
                />
            </div>
        </div>
    );
};

export default ImageModal;
