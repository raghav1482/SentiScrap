import React, { useState } from "react";

export default function Mainsite({ handlePdfUpload, analyzeText }) {
    const [isTextInputVisible, setIsTextInputVisible] = useState(false); // State to toggle input visibility
    const [text, setText] = useState(''); // State to store the entered text

    const handleTextInputToggle = () => {
        setIsTextInputVisible(!isTextInputVisible); // Toggle input visibility
    };

    const handleSearchClick = () => {
        let sentenceArray = [];
        if (Array.isArray(text)) {
            sentenceArray = text.map((sentence) => sentence.trim()); 
        } else if (typeof text === 'string') {
            sentenceArray = text.split(/[.!?]\s+/).map((sentence) => sentence.trim());
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
                            <div className="large-input-container" style={{position:'absolute'}}>
                                <div>
                                <textarea
                                    onChange={(e) => setText(e.target.value)} // Update text state
                                    name="input-text"
                                    id="input-text"
                                    placeholder="Enter text here..."
                                    rows="6"
                                    style={{ width: "100%" }}
                                ></textarea>
                                <p style={{display:"flex",width:"100%",justifyContent:"space-around"}}>
                                <button
                                    className="pdf-btn"
                                    onClick={handleSearchClick}
                                    style={{width:"50px",height:"50px",fontSize:"17px"}}
                                >
                                    <i class="fa fa-search"></i>
                                </button>
                                <button
                                    className="pdf-btn"
                                    onClick={()=>{setIsTextInputVisible(false)}} 
                                    style={{width:"50px",height:"50px",fontSize:"17px"}}
                                >
                                    <i class="fa fa-close"></i>
                                </button>
                                </p>
                                </div>
                            </div>
                        )}
                        <label htmlFor="input-text" className="pdf-btn" onClick={handleTextInputToggle}>
                            T
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}
