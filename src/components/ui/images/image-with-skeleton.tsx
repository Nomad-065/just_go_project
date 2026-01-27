import {useState, useRef, useEffect, type CSSProperties} from "react";
import {cn} from "../../../utils/cn";


type ImageWithSkeletonProps = {
  src?: string | null;
  alt?: string;
  imgClassName?: string;
  className?: string;
  skeletonClassName?: string;
  placeholder?: string | null;
  onError?: () => void;
  maxRetries?: number;
  initialDelay?: number;
  style?: CSSProperties;
};



const ImageWithSkeleton = ({
                             src = null,
                             alt = "",
                             imgClassName = "object-cover",
                             className,
                             skeletonClassName,
                             // placeholder = "/assets/images/blank-image.jpg",
                             placeholder = null,
                             onError,
                             maxRetries = 3,
                             initialDelay = 3000,
                             style,
                           }: ImageWithSkeletonProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [currentSrc, setCurrentSrc] = useState<string | null>(src);

  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Reset state when src changes
    // setLoaded(false);
    // setError(false);
    // setRetryCount(0);
    // setCurrentSrc(src);

    // Cleanup timeout on unmount
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [src]);

  const handleError = async () => {

    if (!src) {
      setError(true);
      onError?.();
      return;
    }

    // Check if it's a 429 error by trying to fetch the image metadata
    try {
      // method head so it only fetches the metadata instead of trying to download the whole image again
      const response = await fetch(src, {method: 'HEAD'});

      if (response.status === 429 && retryCount < maxRetries) {
        console.log('rate limit')
        // Calculate exponential backoff delay
        const delay = initialDelay * Math.pow(2, retryCount);

        console.log(`429 error detected. Retrying in ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`);

        // Retry after delay
        retryTimeoutRef.current = setTimeout(() => {
          console.log('retrying')
          setRetryCount(prev => prev + 1);
          // Force image reload by adding cache-busting param
          setCurrentSrc(`${src}${src.includes('?') ? '&' : '?'}_retry=${Date.now()}`);
        }, delay);

        return;
      }
    } catch (fetchError) {
      console.error('Error checking image status:', fetchError);
    }

    // If not 429 or max retries reached, show placeholder
    setError(true);
    onError?.();
  };

  const imageSrc: string | null = error ? placeholder : currentSrc;

  return (
    <div
      className={cn(
        "relative overflow-hidden flex items-center justify-center",
        className
      )}
      style={style}>
      {!loaded && !error && (
        <div
          className={cn(
            "w-full h-full bg-gray-300 animate-pulse shadow-sm",
            loaded ? 'hidden' : 'block',
            skeletonClassName
          )}
        />
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={cn(
            'w-full h-full',
            imgClassName,
            loaded ? 'block' : 'hidden',
          )}
          onLoad={() => setLoaded(true)}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default ImageWithSkeleton;