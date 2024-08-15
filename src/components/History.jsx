import React from "react";

export default function HistoryCon({ user, history }) {
    return (
        <div className="box-con" style={{ maxWidth: "400px" }}>
            <div className="box-head">
                <h4>History</h4>
                <button className="btn-white" style={{ fontSize: "20px", paddingBlock: "5px", boxShadow: "none" }}>
                    <i className="fa fa-angle-right"></i>
                </button>
            </div>
            <div className="history-content" style={{ paddingInline:"10px",maxHeight: "150px", overflow: "hidden scroll" }}>
                {history.length > 0 ? (
                    <ul style={{ padding: "0 10px", margin: "0", listStyleType: "disc", fontSize: "12px" }}>
                        {history.map((item, index) => (
                            <li key={index} style={{ marginBottom: "5px" }}>
                                <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "grey" }}>
                                    {item.url}
                                </a>
                                <span style={{ marginLeft: "10px" }}>{item.probability.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ fontSize: "12px"}}>No search history available.</p>
                )}
            </div>
        </div>
    );
}
