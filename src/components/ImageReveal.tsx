import { useState, useEffect, useRef } from "react";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const ImageReveal = ({ src, alt, className = "", style }: ImageRevealProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const isMp4 = /\.mp4(?:$|[?#])/i.test(src);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (mediaRef.current) {
      observer.observe(mediaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden" style={style}>
      {/* Shimmer placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 shimmer" />
      )}
      
      {isMp4 ? (
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          src={isInView ? src : undefined}
          aria-label={alt}
          className={`img-reveal ${isLoaded ? "loaded" : ""} ${className}`}
          style={style}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setIsLoaded(true)}
        />
      ) : (
        <img
          ref={mediaRef as React.RefObject<HTMLImageElement>}
          src={isInView ? src : undefined}
          alt={alt}
          className={`img-reveal ${isLoaded ? "loaded" : ""} ${className}`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default ImageReveal;

