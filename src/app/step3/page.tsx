"use client"
import React, { useState, useEffect } from 'react';
import { BackendAPI } from '../utils/backend';
import { useRouter } from 'next/navigation';

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const Step4: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [generateAudio, setGenerateAudio] = useState<boolean>(false);
  const [finishGenerate, setFinishGenerate] = useState<boolean>(false);
  const [saveAudioFile, setSaveAudioFile] = useState<string | null>(null);
  const [content, setContent] = useState('輸入你想讓AI Avatar 講的話');
  const [gender, setGender] = useState<string>('1');
  const router = useRouter();

  const handleGenerateAudio = async () => {
    setGenerateAudio(true);
  };

  const handleStartGenerating = async () => {
    setLoading(true);
    
    try {
        const url = await BackendAPI.generateAudio({ content, gender });
        setSaveAudioFile(url);
    } catch (error) {
        console.error('Error generating audio:', error);
    } finally {
        setFinishGenerate(true);
        setLoading(false);
    }
  };

  const handleSaveAndNextClick = () => {
    router.push('/step4');
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Audio</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
        <style>{`
            body {
              font-family: 'Inter', sans-serif;
            }
            .logo {
              width: 70px;  // Set the width of the logo
              height: 70px;  // Maintain aspect ratio
              margin-bottom: 0px;  // Add margin to the bottom
              margin-left: 0px;
            }
          `}</style>
      </head>
      <body className="bg-gray-900 text-white h-screen flex flex-col justify-center items-center">
        <div className="flex flex-row justify-between items-start w-full px-10">
          <div className="w-1/4">
            <ul className="space-y-2">
              <img src="/logo.png" alt="Logo" className="logo" />
              <li>Step 1: Start</li>
              <li>Step 2: Avatar Image</li>
              <li className="bg-blue-500 text-white px-4 py-2 rounded-md">Step 3: Audio</li>
              <li>Step 4: Preview</li>
            </ul>
          </div>
          <div className="w-3/4 flex flex-col items-center">
            <h3 className="text-6xl font-bold mb-8">Audio Preparation</h3>
            <p className="text-gray-400 mb-8">type your script for AI</p>
            {!generateAudio ? (
              <div className="mt-4">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter content"
                  className="bg-gray-800 text-white px-4 py-2 rounded-md mb-4 h-24 resize-none"
                />
                <button
                  className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={handleGenerateAudio}
                >
                  Enter your script
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <label className="text-white mr-4">Male</label>
                <input
                  type="radio"
                  name="gender"
                  value="2"
                  checked={gender === '2'}
                  onChange={() => setGender('2')}
                />
                <label className="text-white ml-4">Female</label>
                <input
                  type="radio"
                  name="gender"
                  value="1"
                  checked={gender === '1'}
                  onChange={() => setGender('1')}
                />
                <button
                  className="bg-blue-600 text-white font-semibold py-2 px-6 rounded mt-2 ml-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={handleStartGenerating}
                >
                  Generate Audio
                </button>
              </div>
            )}
            {loading ? (
              <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-blue-500 mx-auto my-4"></div>
            ) : finishGenerate && !loading ?(
              <div>
                {!!saveAudioFile && <audio controls>
                  <source src={saveAudioFile} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>}
                <p className="text-gray-400 mb-8">Finish generated</p>
                <button
                  className="bg-blue-600 text-white font-semibold py-2 px-6 rounded mt-2 ml-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={handleSaveAndNextClick}
                >
                  Next
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </body>
    </html>
  );
};

export default Step4;
