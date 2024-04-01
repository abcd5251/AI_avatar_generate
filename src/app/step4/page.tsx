"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BackendAPI } from '../utils/backend';


const sleep = (milliseconds: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

const Step5: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [finishGenerate, setFinishGenerated] = useState<boolean>(false);
  
    const handleStartClick = () => {
      router.push('/step2');
    };
  
    const handleSaveClick = () => {
      
    };
    
    // cannot not show video
    const handleStartGenerated = async () => {
      setLoading(true);
      
      try {
          const blobData = await BackendAPI.generateAiAvatarVideo({username: 'test'})
          const blob = new Blob([blobData], { type: 'video/mp4' });
          const url = URL.createObjectURL(blob);
          console.log(url)
          setVideoUrl(url);
      } catch (error) {
          console.error('Error generating audio:', error);
      } finally {
          setFinishGenerated(true)
          setLoading(false);
      }};

  
return (
      <html lang="en">
        <body className="bg-gray-900 text-white h-screen flex flex-col justify-center items-center">
          <div className="flex flex-row justify-between items-start w-full px-10">
            <div className="w-1/4">
              <ul className="space-y-2">
                <img src="/logo.png" alt="Logo" className="logo" />
                <li>Step 1: Start</li>
                <li>Step 2: Avatar Image</li>
                <li>Step 3: Audio</li>
                <li className="bg-blue-500 text-white px-4 py-2 rounded-md">Step 4: Preview</li>
              </ul>
            </div>
            <div className="w-3/4 flex flex-col items-center">
              <h1 className="text-6xl font-bold mb-8">Here is your AI avatar video</h1>
              {!!videoUrl && <video controls src={videoUrl} className="mb-4" />}
              {!loading && finishGenerate ? (
                <div className="flex justify-center gap-4">
                  <button
                    className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={handleSaveClick}
                  >
                    Save 
                  </button>
                  <button
                    className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={handleStartClick}
                  >
                    Generate again
                  </button>
                </div>
              ) : !loading && !finishGenerate ? (
                <button
                  className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={handleStartGenerated}
                >
                  Start generated 
                </button>
              ) : (
                <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-blue-500 mx-auto my-4"></div>
              )}
            </div>
          </div>
        </body>
      </html>
    );
  };
  
  export default Step5;
  