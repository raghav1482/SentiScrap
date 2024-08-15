import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register necessary components
Chart.register(...registerables);

const Graph = ({ sentimentProb,loader }) => {
    const data = {
        labels: ['Sentiment Probability'],
        datasets: [
            {
                label: 'Probability',
                data: [sentimentProb],
                backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const getEmoji = (prob) => {
        if (prob >= 0.75) {
            return "😁"; // Very positive
        } else if (prob >= 0.5) {
            return "🙂"; // Positive
        } else if (prob >= 0.25) {
            return "😐"; // Neutral
        } else {
            return "😞"; // Negative
        }
    };

    return (
        <div className="box-con" style={{width:"150px"}}>
            <div className="box-head">
                <h4>Graph</h4>
                <button className="btn-white" style={{ fontSize: "20px", paddingBlock: "5px", boxShadow: "none" }}>
                    <i className="fa fa-angle-right"></i>
                </button>
            </div>
            {loader?<span className='loader'></span>: <div className='chart-container'>
                <Bar  data={data} options={{scales: { y: { beginAtZero: true, max: 1 } } }} />
                <div className="emoji-display">
                    <p>Sentiment: {getEmoji(sentimentProb)}</p>
                </div>
            </div>}
        </div>
    );
};

export default Graph;
