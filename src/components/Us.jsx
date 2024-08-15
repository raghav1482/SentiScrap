import React from "react";

export default function Us(){
    return(<>
        <div className="box-con us">
            <div className="left-gradient"></div>
            <div className="box-head" style={{zIndex:"999",position:"relative"}}>
                <p >
                    <h4>SentiScrap</h4>
                    <p style={{lineHeight:"12px",color:"grey"}}>Analyse the sentiments</p>
                </p>
                <button className="btn-white" style={{fontSize:"20px",paddingBlock:"5px",boxShadow:"none"}}><i className="fa fa-angle-right"></i></button>
            </div>
            <h3 style={{maxWidth:"90%",zIndex:"999",position:"relative"}}>
            Instant Insights from Product Reviews
            </h3>
        </div>
        </>)
}