import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';


export default function WelcomeScreen({ onStart, botOptions }) {
  const [imageSources, setImageSources] = useState({});
  //const { user } = useAuth(); // Get the user object from Clerk

  useEffect(() => {
    const loadImages = async () => {
      const sources = {};
      for (const bot of botOptions) {
        sources[bot.id] = (await import(`./public${bot.imagePath}`)).default;
      }
      setImageSources(sources);
    };
    loadImages();
   
  }, [botOptions]);
  

  

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-700 flex items-center justify-center ">
      <div className=" p-8 bg-gradient-to-r from-purple-700 via-indigo-200 to-blue-500 rounded-lg shadow-md text-center">
      <h1 className="text-3xl items-center font-bold mb-4">Hi There!</h1>
      
     
        <h1 className="text-3xl font-bold mb-4">Choose your ChatBot</h1>
        
        <div className="grid  grid-cols-2 gap-4 mb-6">
          {botOptions.map((bot, index) => (
            <button
              key={bot.id}
              className="flex flex-col items-center p-4 border rounded-lg  hover:bg-purple-300 transition"
              onClick={() => onStart(bot)}
            >
              {imageSources[bot.id] && (
                <Image 
                  src={imageSources[bot.id]} 
                  alt={bot.name} 
                  width={80} 
                  height={80} 
                  className="rounded-full mb-2"
                  priority={index === 0}
                />
              )}
              <span className="font-semibold">{bot.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}