import { useState, useEffect, useRef } from "react";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  /** Load immediately instead of waiting until scrolled into view. */
  eager?: boolean;
}

const ImageReveal = ({ src, alt, className = "", style, eager = false }: ImageRevealProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(eager);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const isVideo = /\.(?:mp4|webm)(?:$|[?#])/i.test(src);

  useEffect(() => {
    if (eager) return;

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
      
      {isVideo ? (
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
          disablePictureInPicture
          disableRemotePlayback
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

