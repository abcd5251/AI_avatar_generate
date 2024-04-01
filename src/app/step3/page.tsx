"use client"
import React, { useState } from 'react';
import { ShineAPI } from '../utils/shine';
import { useRouter } from 'next/navigation';

const sleep = (milliseconds: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const Step3: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [resultText, setResultText] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [resultGenerated, setResultGenerated] = useState<boolean>(false);
    const router = useRouter();
  
    const handleGenerateClick = async () => {
        setLoading(true);
        
        await sleep(2000)
        try {
            
            await ShineAPI.summarize({ content: text, language: "1" })
            .then((response) => {

                const summarizedResult = response.data;
                const resultString = summarizedResult.data;
    
                setResultText(resultString);
                setResultGenerated(true);
            })
            .catch((error) => {
                console.error('Error in Summarization:', error);
            });
    
        } catch (error) {
          console.error('Error generating result:', error);
    
        } finally {
          setLoading(false);
        }
    };
  
    const handleSkipClick = () => {
        router.push('/step4');
    };
  
    return (
        <html lang="en">
          <body className="bg-gray-900 text-white h-screen flex flex-col justify-center items-center">
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
            <div className="flex flex-row justify-between items-start w-full px-10">
              {/* Left Box */}
              <div className="w-1/4 ml-1 mt-60">
                <ul className="space-y-2">
                  <img src="/logo.png" alt="Logo" className="logo" />
                  <li>Step 1: Start</li>
                  <li>Step 2: Avatar Image</li>
                  <li className="bg-blue-500 text-white px-4 py-2 rounded-md">Step 3: Content</li>
                  <li>Step 4: Audio</li>
                  <li>Step 5: Preview</li>
                </ul>
              </div>
              
              {/* Main Content */}
              <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
                  {/* Left Box Content */}
                  <div className="flex flex-col items-center">
                    <h2 className="text-white text-2xl mb-2">Your text</h2>
                    <p className="text-gray-400 mb-4">Put your content here.</p>
                    <div>
                        <textarea
                            className="border-4 border-blue text-black bg-white w-full h-full rounded-lg p-2"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            style={{ width: '300px', height: '400px' }}
                        />
                    </div>
                  </div>
    
                  {/* Generate Button */}
                  <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleGenerateClick}
                  >
                    Generate
                  </button>
    
                  {/* Right Box Content */}
                  <div className="flex flex-col items-center">
                    <h2 className="text-white text-2xl mb-2">Result</h2>
                    {loading ? (
                  <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-blue-500 mx-auto my-4"></div>
                ) : (
                  <div>
                    <p className="text-gray-400 mb-4">You may adjust it in the text box.</p>
                    <div>
                      <textarea
                        className="border-4 border-blue text-black bg-white w-full h-full rounded-lg p-2"
                        value={resultText}
                        onChange={(e) => setResultText(e.target.value)}
                        style={{ width: '300px', height: '400px' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Conditional Rendering for Skip or Next Button */}
              {resultGenerated ? (
                <button
                  className="bg-transparent text-white font-semibold py-2 px-4 border border-white rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleSkipClick}
                >
                  Next <i className="fas fa-chevron-right ml-2"></i>
                </button>
              ) : (
                <div>
                <p className="text-gray-400 mb-2">Skip If you already have audio file</p>
                <button
                  className="bg-transparent text-white font-semibold py-2 px-4 border border-white rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleSkipClick}
                >
                  Skip <i className="fas fa-chevron-right ml-2"></i>
                </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Step3;