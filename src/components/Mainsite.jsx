import React from "react";

export default function Mainsite({handlePdfUpload}){
    return(<>
        <div className="box-con" style={{maxWidth:"40%"}}>
            <div className="box-head" style={{minWidth:"230px"}}>
                <h4>Site-info</h4>
                <button className="btn-white" style={{fontSize:"20px",paddingBlock:"5px",boxShadow:"none"}}><i className="fa fa-angle-right"></i></button>
            </div>
            <div className="upload-container">
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handlePdfUpload}
                    name="input-pdf"
                    id="input-pdf"
                />
                <label htmlFor="input-pdf" className='pdf-btn'><i class="fa fa-file-pdf-o"></i></label>
            </div>
        </div>
        </>)
}