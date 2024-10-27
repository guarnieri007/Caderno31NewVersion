import React, { ReactElement, useState  } from "react";
import { CarrouselMainDiv } from "../styles/common/carrousel-styles";
import { CarrouselProps } from "../interfaces";

export const Carrousel = ({ children }: CarrouselProps): ReactElement => {
    const childrenArray = React.Children.toArray(children);

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
    };
    
    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? childrenArray.length - 1 : prevIndex - 1
        );
    };
    


    return (
        <CarrouselMainDiv>
            <div className="content">
                {childrenArray.length > 0 && (
                    <>
                    <div className="carrousel-item">
                        {childrenArray[currentIndex]}
                    </div>
                    </>
                )}
            </div>
            <div className="defaultPadding navegation">
                {childrenArray.length > 1 && (
                    <>
                        <button className="previous-button" onClick={handlePrev}>Voltar</button>
                        <span>
                            {currentIndex + 1} / {childrenArray.length}
                        </span>
                        <button className="next-button" onClick={handleNext}>Próximo</button>
                    </>
                )}
            </div>
        </CarrouselMainDiv>
    );
    
};
