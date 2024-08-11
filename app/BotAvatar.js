import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function BotAvatar({ bot, isFirst }) { // Add isFirst prop

  const [imageSource, setImageSource] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      const source = await import(`./public${bot.imagePath}`);
      setImageSource(source.default);
    };

    loadImage();
  }, [bot]); // Dependency on `bot` prop

  if (!imageSource) return null; // Return null while image is loading

  return (
    <div className="w-auto h-auto rounded-full overflow-hidden mr-2">
      <Image
        src={imageSource}
        alt={bot.name}
        width={80}
        height={80}
        className="w-full h-full object-cover"
        priority={isFirst} // Set priority only for the first image
      />
    </div>
  );
}
