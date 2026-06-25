import { useState } from "react";
import { AssetsUrl } from "@/config/urls";
import styles from "./styles.module.css";

const FadeInImage = ({
  src,
  alt,
  pointerEvent = false,
  assetsUrl = true,
  width,
  height,
  objectFit = "cover",
  className = "",
}: {
  src: string;
  alt?: string;
  pointerEvent?: boolean;
  assetsUrl?: boolean;
  width?: string | number;
  height?: string | number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  className?: string;
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  // Convert numeric width/height to string with px
  const formatSize = (size?: string | number) => {
    if (size === undefined) return undefined;
    return typeof size === "number" ? `${size}px` : size;
  };

  return (
    <img
      src={assetsUrl ? `${AssetsUrl}/${src}` : src}
      alt={alt}
      className={`${styles.image} ${loaded ? styles.loaded : ""} ${className}`}
      onLoad={handleImageLoad}
      key={src}
      style={{
        width: formatSize(width),
        height: formatSize(height),
        objectFit: objectFit,
        pointerEvents: pointerEvent ? "auto" : "none",
      }}
    />
  );
};

export default FadeInImage;
