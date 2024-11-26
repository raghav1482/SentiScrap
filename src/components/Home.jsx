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
    const [emotions,setEmotions]=useState([]);
    const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
      document.body.classList.toggle('dark-mode', savedTheme === 'dark');
      const elements = document.getElementsByClassName("box-con");
        Array.from(elements).forEach((element) => {
        element.classList.toggle('dark-mode', savedTheme === 'dark');
        });
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      const theme = newMode ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      document.body.classList.toggle('dark-mode', newMode);
  
      return newMode;
    });
  };

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
            const response = await axios.post(`https://newsvm.onrender.com/predict`, { sentences: data });
            const response2 = await axios.post(`https://newsvm.onrender.com/predict_emotion`, { sentences: data });

            const sentiments = response?.data?.sentiments;
            const emo = response2?.data?.predictions;
            const emotionCounts = emo.reduce((acc, emotion) => {
                acc[emotion] = (acc[emotion] || 0) + 1;
                return acc;
            }, {});
        
            // List of possible emotions
            const emotionList = ["sadness", "anger", "surprise", "fear", "love", "joy"];
        
            // Create an array of normalized values for graphing
            const totalEmotions = emo.length;
            const emos = emotionList.map((emotion) => {
                const count = emotionCounts[emotion] || 0;
                return (count/totalEmotions)*100; // Normalize to a percentage or proportion
            });

            setEmotions(emos);
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
        if (query) {
            // const parsedUrl = new URL(query);
            if (query) {
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
    const analyzeText = async(sentences) => {
        console.log("Sentences to analyze:", sentences);
        await sendRequest(sentences,"text pararaph")
    };
    return (
        <div className="m-container">
            <Navbar onSearch={handleSearch} toggleTheme={toggleTheme} />
            <div className="main-box">
                <Us />

                
                <HistoryCon user={user} history={history} />
                <Mainsite handlePdfUpload={handlePdfUpload} analyzeText={analyzeText} carsearch={handleSearch}/>
                <Graph sentimentProb={sentimentProb} emotions={emotions}  loader={loader} setLoader={setLoader} />
            </div>
        </div>
    );
}

export default Home;
