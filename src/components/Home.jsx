import React, { useState, useEffect } from 'react';
import '../components/style.css';
import HistoryCon from './History';
import Mainsite from './Mainsite';
import Navbar from './Navbar';
import Us from './Us';
import axios from "axios";
import Graph from './Graph';
import { auth } from '../firebase'; // Import the auth instance from firebase.js
import { onAuthStateChanged } from 'firebase/auth';

function Home({ server_url }) {
    const [searchUrl, setSearchUrl] = useState("");
    const [result, setResult] = useState([]);
    const [loader, setLoader] = useState(false);
    const [sentimentProb, setSentimentProb] = useState(0);
    const [history, setHistory] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
                setHistory(storedHistory);
            } else {
                setUser(null);
                setHistory([]);
            }
        });
        return () => unsubscribe();
    }, []);

    const sendRequest = async (res,query) => {
        try {
            const response = await axios.post(`https://senti-svm.onrender.com/predict`, { sentences: res.data });

            const sentiments = response?.data?.sentiments;

            if (sentiments) {
                const ratingStr = res?.data[res?.data?.length - 1];
                const rating = parseFloat(ratingStr);

                let pos = 0, neg = 0;
                sentiments.slice(0, -1).forEach(element => {
                    if (element === "Positive") {
                        pos++;
                    } else {
                        neg++;
                    }
                });

                const avgSentiment = pos / (pos + neg);
                const avgRatingProbability = rating / 5;

                const combinedProbability = (0.4 * avgRatingProbability) + (0.6 * avgSentiment);
                setSentimentProb(combinedProbability);
                if (user) {
                    const probability = combinedProbability;
                    const searchItem = { url: query, probability }; // Save only the final sentiment probability
                    const updatedHistory = [...history, searchItem];
                    setHistory(updatedHistory);
                    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
                }
                setLoader(false);
            } else {
                console.log("No sentiments received");
                setLoader(false);
            }
        } catch (error) {
            console.error("Error in sending request:", error);
        }
    };

    const handleSearch = async (query) => {
        setSearchUrl(query);
        setLoader(true);
        if (query.startsWith("http")) {
            const parsedUrl = new URL(query);
            if (parsedUrl.hostname.includes('amazon.')) {
                try {
                    const response = await axios.get(`${server_url}/scrape-reviews?url=${query}`);
                    console.log(response);
                    setResult(response.data);

                    await sendRequest(response,query);

                } catch (e) {
                    setLoader(false);
                    console.log(e);
                }
            } else {
                setLoader(false);
                alert("Enter a valid AMAZON URL🫥");
            }
        } else {
            setLoader(false);
            alert("Enter a valid AMAZON URL🫥");
        }
    };

    return (
        <div className="m-container">
            <Navbar onSearch={handleSearch} />
            <div className="main-box">
                <Us />
                <HistoryCon user={user} history={history} />
                <Mainsite />
                <Graph sentimentProb={sentimentProb} loader={loader} setLoader={setLoader} />
            </div>
        </div>
    );
}

export default Home;
