import React, { useRef, useState } from "react";

const ImageModal = ({ children }) => {
    const [images, imageIndex, setImageModal] = children;
    const modalRef = useRef(null);

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

    //closing image modal
    const closeImageModal = () => {
        setImageModal(false);
    };

    return (
        <section
            onClick={() => setImageModal(false)}
            className="bg-[#c5c5c5] w-[100%] h-[100vh] flex justify-center items-center absolute z-30 inset-0"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                ref={modalRef}
                className="modal max-w-[600px] p-[20px] bg-[#fff] rounded-[12px]"
            >
                <div className="rounded-[12px] overflow-hidden w-[550px] h-[550px]">
                    <img
                        src={images[index]}
                        alt="selected image"
                    />
                </div>
                <div className="buttons flex justify-center items-center gap-[15px] mt-[15px] relative">
                    <button onClick={viewPrevImage}>prev</button>
                    <button onClick={viewNextImage}>next</button>
                    <button
                        onClick={closeImageModal}
                        className="absolute top-[50%] translate-y-[-50%] right-[15px]"
                    >
                        close
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ImageModal;
