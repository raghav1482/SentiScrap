import React, { useState } from "react";
import cardekho from "../images/cardekho.png";

export default function Mainsite({ handlePdfUpload, analyzeText, carsearch }) {
    const [isTextInputVisible, setIsTextInputVisible] = useState(false); // For general text input
    const [isCarInputVisible, setIsCarInputVisible] = useState(false);   // For CarDekho input
    const [text, setText] = useState(''); // State to store the entered text
    const [placeholder, setPlaceholder] = useState("");

    const handleTextInputToggle = () => {
        setIsTextInputVisible(!isTextInputVisible);
        setIsCarInputVisible(false); // Close CarDekho input if open
        setPlaceholder('Enter text here...');
    };

    const handleCarInputToggle = () => {
        setIsCarInputVisible(!isCarInputVisible);
        setIsTextInputVisible(false); // Close text input if open
        setPlaceholder("Enter car review URL (https://www.cardekho.com/company/car/user-reviews)");
    };

    const handleSearchClick = () => {
        console.log("Searching text...");
        let sentenceArray = [];
        if (Array.isArray(text)) {
            sentenceArray = text.map((sentence) => sentence.trim());
        } else if (typeof text === 'string') {
            sentenceArray = text.split(/[.!?\n]\s+/).map((sentence) => sentence.trim());
        }
        analyzeText(sentenceArray);
    };

    return (
        <>
            <div className="box-con" style={{ maxWidth: "40%" }}>
                <div className="box-head" style={{ minWidth: "230px" }}>
                    <h4>Site-info</h4>
                    <button
                        className="btn-white"
                        style={{ fontSize: "20px", paddingBlock: "5px", boxShadow: "none" }}
                    >
                        <i className="fa fa-angle-right"></i>
                    </button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {/* PDF file input */}
                    <div className="upload-container m-2">
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handlePdfUpload}
                            name="input-pdf"
                            id="input-pdf"
                        />
                        <label htmlFor="input-pdf" className="pdf-btn">
                            <i className="fa fa-file-pdf-o"></i>
                        </label>
                    </div>

                    {/* Text input toggle */}
                    <div className="upload-container m-2">
                        {isTextInputVisible && (
                            <div className="large-input-container" style={{ position: 'absolute' }}>
                                <textarea
                                    onChange={(e) => setText(e.target.value)}
                                    name="input-text"
                                    id="input-text"
                                    placeholder={placeholder}
                                    rows="6"
                                    style={{ width: "100%" }}
                                ></textarea>
                                <div style={{ display: "flex", justifyContent: "space-around" }}>
                                    <button
                                        className="pdf-btn"
                                        onClick={handleSearchClick}
                                        style={{ width: "50px", height: "50px", fontSize: "17px" }}
                                    >
                                        <i className="fa fa-search"></i>
                                    </button>
                                    <button
                                        className="pdf-btn"
                                        onClick={() => setIsTextInputVisible(false)}
                                        style={{ width: "50px", height: "50px", fontSize: "17px", backgroundColor: "red" }}
                                    >
                                        <i className="fa fa-close"></i>
                                    </button>
                                </div>
                            </div>
                        )}
                        <label
                            htmlFor="input-text"
                            className="pdf-btn blue"
                            onClick={handleTextInputToggle}
                            style={{ backgroundColor: "#0290f5" }}
                        >
                            T
                        </label>
                    </div>

                    {/* CarDekho input toggle */}
                    <div className="upload-container m-2">
                        {isCarInputVisible && (
                            <div className="large-input-container" style={{ position: 'absolute' }}>
                                <textarea
                                    onChange={(e) => setText(e.target.value)}
                                    name="car-input"
                                    id="car-input"
                                    placeholder={placeholder}
                                    rows="6"
                                    style={{ width: "100%" }}
                                ></textarea>
                                <div style={{ display: "flex", justifyContent: "space-around" }}>
                                    <button
                                        className="pdf-btn"
                                        onClick={() => carsearch(text)}
                                        style={{ width: "50px", height: "50px", fontSize: "17px" }}
                                    >
                                        <i className="fa fa-search"></i>
                                    </button>
                                    <button
                                        className="pdf-btn"
                                        onClick={() => setIsCarInputVisible(false)}
                                        style={{ width: "50px", height: "50px", fontSize: "17px", backgroundColor: "red" }}
                                    >
                                        <i className="fa fa-close"></i>
                                    </button>
                                </div>
                            </div>
                        )}
                        <label
                            htmlFor="car-input"
                            className="pdf-btn orange"
                            onClick={handleCarInputToggle}
                        >
                            <img src={cardekho} alt="CarDekho" />
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}
