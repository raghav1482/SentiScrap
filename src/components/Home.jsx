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
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";

// Configure pdfjsLib worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function Home({ server_url }) {
    const [searchUrl, setSearchUrl] = useState("");
    const [result, setResult] = useState([]);
    const [loader, setLoader] = useState(false);
    const [sentimentProb, setSentimentProb] = useState(0);
    const [history, setHistory] = useState([]);
    const [user, setUser] = useState(null);
    const [pdfText, setPdfText] = useState("");

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

    const sendRequest = async (data, query) => {
        try {
            const response = await axios.post(`https://senti-svm.onrender.com/predict`, { sentences: data });

            const sentiments = response?.data?.sentiments;

            if (sentiments) {
                let pos = 0, neg = 0;
                sentiments.forEach(element => {
                    if (element === "Positive") {
                        pos++;
                    } else {
                        neg++;
                    }
                });

                const avgSentiment = pos / (pos + neg);

                setSentimentProb(avgSentiment);

                if (user) {
                    const searchItem = { url: query, probability: avgSentiment };
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
            setLoader(false);
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
                    setResult(response.data);
                    await sendRequest(response.data, query);
                } catch (e) {
                    setLoader(false);
                    console.log(e);
                }
            } else {
                setLoader(false);
                alert("Enter a valid AMAZON URL 🫥");
            }
        } else {
            setLoader(false);
            alert("Enter a valid AMAZON URL 🫥");
        }
    };

    const handlePdfUpload = async (event) => {
        setLoader(true);
        const file = event.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = async (e) => {
                try {
                    const arrayBuffer = e.target.result;
                    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                    let text = "";
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const content = await page.getTextContent();
                        text += content.items.map((item) => item.str).join(" ");
                    }
                    setPdfText(text);
                    const sentences = text.split(".").filter((sentence) => sentence.trim() !== "");
                    await sendRequest(sentences, "Uploaded PDF");
                    setLoader(false);
                } catch (err) {
                    console.error("Error reading PDF:", err);
                    setLoader(false);
                }
            };
            fileReader.readAsArrayBuffer(file);
        }
    };

    return (
        <div className="m-container">
            <Navbar onSearch={handleSearch} />
            <div className="main-box">
                <Us />

                
                <HistoryCon user={user} history={history} />
                <Mainsite handlePdfUpload={handlePdfUpload}/>
                <Graph sentimentProb={sentimentProb} loader={loader} setLoader={setLoader} />
            </div>
        </div>
    );
}

export default Home;
