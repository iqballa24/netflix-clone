import React from 'react';
import Image from 'next/image';

interface Props {
  alt: string;
  poster: string;
}

const BannerPoster: React.FC<Props> = ({ alt, poster }) => {
  return (
    <div className="absolute top-0 left-0 -z-10 h-[95vh] min-w-full">
      <Image
        alt={alt}
        src={poster}
        fill
        priority
        className="object-cover w-auto"
        sizes="100%"
      />
    </div>
  );
};

export default React.memo(BannerPoster);
