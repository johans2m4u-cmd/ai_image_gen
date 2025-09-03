
import React, { useState, useCallback } from 'react';
import { generateImage } from './services/geminiService';
import type { AspectRatio } from './types';
import { aspectRatios } from './types';
import Spinner from './components/Spinner';
import WandIcon from './components/Icon';

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>("A beautiful woman wearing a stylish bikini on a sunny tropical beach, cinematic, detailed, hyper-realistic");
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!prompt) {
            setError("Please enter a prompt.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedImageUrl(null);

        try {
            const imageUrl = await generateImage(prompt, aspectRatio);
            setGeneratedImageUrl(imageUrl);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [prompt, aspectRatio]);
    
    const getAspectRatioClass = (ratio: AspectRatio) => {
        switch(ratio) {
            case '1:1': return 'aspect-square';
            case '3:4': return 'aspect-[3/4]';
            case '4:3': return 'aspect-[4/3]';
            case '9:16': return 'aspect-[9/16]';
            case '16:9': return 'aspect-video';
            default: return 'aspect-square';
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-4xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
                        Bikini Image <span className="text-cyan-500">Generator</span>
                    </h1>
                    <p className="text-slate-600 mt-2">Create stunning AI-generated images with a simple text prompt.</p>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                        <div>
                            <label htmlFor="prompt" className="block text-sm font-medium text-slate-700 mb-2">
                                1. Describe your image
                            </label>
                            <textarea
                                id="prompt"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="e.g., A woman in a red bikini on a white sand beach"
                                className="w-full h-32 p-3 border border-slate-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 ease-in-out"
                                disabled={isLoading}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                2. Select Aspect Ratio
                            </label>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                {aspectRatios.map((ratio) => (
                                    <button
                                        key={ratio}
                                        onClick={() => setAspectRatio(ratio)}
                                        disabled={isLoading}
                                        className={`px-4 py-2 text-sm font-semibold border rounded-md transition duration-200 ease-in-out
                                            ${aspectRatio === ratio
                                                ? 'bg-cyan-500 border-cyan-500 text-white shadow'
                                                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 disabled:bg-slate-100'
                                            }`}
                                    >
                                        {ratio}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-transform transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:scale-100 shadow-lg"
                        >
                            {isLoading ? (
                                <>
                                    <Spinner />
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <>
                                    <WandIcon className="w-5 h-5" />
                                    <span>Generate Image</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 flex items-center justify-center">
                        <div className={`w-full max-w-md bg-slate-200 rounded-lg overflow-hidden ${getAspectRatioClass(aspectRatio)}`}>
                            {isLoading ? (
                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                                    <Spinner />
                                    <p className="mt-4 font-semibold">Creating your image...</p>
                                </div>
                            ) : error ? (
                                <div className="w-full h-full flex items-center justify-center p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                                    <p className="text-center text-red-600 font-medium">{error}</p>
                                </div>
                            ) : generatedImageUrl ? (
                                <img src={generatedImageUrl} alt="Generated" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 p-4">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 mb-4"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path><rect x="2" y="3" width="6" height="18" rx="1"></rect><path d="M10 3v18"></path><path d="m15.88 12.5-3.76 3.76"></path><path d="m12.12 16.26 3.76-3.76"></path></svg>
                                    <p className="text-center font-semibold">Your generated image will appear here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
