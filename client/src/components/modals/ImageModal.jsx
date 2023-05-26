import React, { useEffect, useRef, useState } from "react";

const ImageModal = ({ children }) => {
    const [images, imageIndex, setImageModal] = children;
    const modalRef = useRef(null);

    //index of selectedImage
    const [index, setIndex] = useState(imageIndex);

    console.log(index);

    //view previous image
    const viewPrevImage = () => {
        setIndex(index - 1 < 0 ? images.length - 1 : index - 1);
    };

    //view next image
    const viewNextImage = () => {
        setIndex(index + 1 > images.length - 1 ? 0 : index + 1);
    };

    //closing image modal
    const closeImageModal = () => {
        setImageModal(false);
    };

    return (
        <section
            onClick={() => setImageModal(false)}
            className="bg-[rgba(0,0,0,0.3)] w-[100%] h-[100vh] overflow-hidden flex justify-center items-center absolute z-30 inset-0"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                ref={modalRef}
                className="modal max-w-[600px] p-[4px] pb-[20px] bg-[#fff] md1:w-[100vw] md1:h-[100vh] relative md1:p-0"
            >
                <div className="min-w-[550px] min-h-[550px] w-[100%] h-[100%] flex items-center bg-[rgba(1,1,1,0.1)]">
                    <img
                        className="object-contain shadow-[rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px]"
                        src={images[index]}
                        alt="selected image"
                    />
                </div>
                <div className="buttons flex justify-center items-center gap-[15px] mt-[15px] relative md1:absolute md1:w-[100%] md1:bottom-[8px] md1:left-[50%] md1:translate-x-[-50%]">
                    <button
                        className="btn bg-cyan-900"
                        onClick={viewPrevImage}
                    >
                        prev
                    </button>
                    <button
                        className="btn bg-cyan-900"
                        onClick={viewNextImage}
                    >
                        next
                    </button>
                    <button
                        onClick={closeImageModal}
                        className="btn bg-cyan-900  absolute top-[50%] translate-y-[-50%] right-[15px] sm3:static sm3:translate-y-[unset]"
                    >
                        close
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ImageModal;
