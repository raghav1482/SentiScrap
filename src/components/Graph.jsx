import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register necessary components
Chart.register(...registerables);

const Graph = ({ sentimentProb, emotions, loader }) => {
    // Calculate negative probability
    const negativeProb = 1 - sentimentProb;

    // Data for sentiment probabilities
    const sentimentData = {
        labels: ['Positive', 'Negative'],
        datasets: [
            {
                label: 'Probability',
                data: [sentimentProb, negativeProb],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)', // Positive bar color
                    'rgba(255, 99, 132, 0.2)', // Negative bar color
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)', // Positive border color
                    'rgba(255, 99, 132, 1)', // Negative border color
                ],
                borderWidth: 1,
            },
        ],
    };

    // Data for emotions
    const emotionData = {
        labels: ['Sadness', 'Anger', 'Surprise', 'Fear', 'Love', 'Joy'],
        datasets: [
            {
                label: 'Emotion Intensity',
                data: emotions, // Pass an array of emotion intensities
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)', // Sadness
                    'rgba(255, 99, 132, 0.2)', // Anger
                    'rgba(255, 205, 86, 0.2)', // Surprise
                    'rgba(54, 162, 235, 0.2)', // Fear
                    'rgba(153, 102, 255, 0.2)', // Love
                    'rgba(255, 159, 64, 0.2)', // Joy
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)', // Sadness
                    'rgba(255, 99, 132, 1)', // Anger
                    'rgba(255, 205, 86, 1)', // Surprise
                    'rgba(54, 162, 235, 1)', // Fear
                    'rgba(153, 102, 255, 1)', // Love
                    'rgba(255, 159, 64, 1)', // Joy
                ],
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
        <div className="box-con" style={{ width: "150px", display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            <div className="box-head">
                <h4>Graph</h4>
                <button className="btn-white" style={{ fontSize: "20px", paddingBlock: "5px", boxShadow: "none" }}>
                    <i className="fa fa-angle-right"></i>
                </button>
            </div>
            {loader ? (
                <span className="loader"></span>
            ) : (
                <>
                    <div className="chart-container">
                        <h5>Sentiment Probability</h5>
                        <Bar
                            data={sentimentData}
                            options={{
                                scales: {
                                    y: { beginAtZero: true, max: 1 }, // Ensure values are within 0 to 1
                                },
                            }}
                        />
                        <div className="emoji-display">
                            <p>Sentiment: {getEmoji(sentimentProb)}</p>
                        </div>
                    </div>

                    <div className="chart-container">
                        <h5>Emotions</h5>
                        <Bar
                            data={emotionData}
                            options={{
                                scales: {
                                    y: {
                                        beginAtZero: true, 
                                        ticks: {
                                            callback: (value) => `${value}%`, 
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Graph;
