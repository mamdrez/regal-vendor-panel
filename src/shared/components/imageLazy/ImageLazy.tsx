import React, { useState } from "react";
import styles from "./css/styles.module.css";
import { AssetsUrl } from "@/config/urls";

interface FadeInImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  pointerEvent?: boolean;
  type: "scale" | "fade";
  className?: string;
  needAssetsUrl?: boolean;
}

const ImageLazy: React.FC<FadeInImageProps> = ({
  src,
  alt,
  pointerEvent = false,
  type,
  className,
  needAssetsUrl = true,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  const getClassName = () => {
    const baseClass = type === "fade" ? styles.image : styles.imageScale;
    const loadedClass = loaded
      ? type === "fade"
        ? styles.loaded
        : styles.scale
      : "";
    return `${baseClass} ${loadedClass}`;
  };

  return (
    <img
      src={needAssetsUrl ? `${AssetsUrl}/${src}` : src}
      // src={src}
      alt={alt}
      className={`${getClassName()} ${className}`}
      onLoad={handleImageLoad}
      style={{ pointerEvents: pointerEvent ? "auto" : "none" }}
      {...props}
    />
  );
};

export default ImageLazy;
