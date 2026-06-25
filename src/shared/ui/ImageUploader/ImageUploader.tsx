import { useId, useState, type ChangeEvent, type FC } from "react";
import Icon from "../Icon/Icon";
import styles from "./ImageUploader.module.css";

interface ImageUploaderProps {
  /** Current image sources (base64 data URLs in this mock phase). */
  value: string[];
  onChange: (next: string[]) => void;
  label?: string;
  /** Maximum number of images. */
  max?: number;
  /** Single-image mode (logo / cover). */
  single?: boolean;
  /** Aspect hint for the preview tiles. */
  variant?: "square" | "wide";
}

const readAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("خواندن فایل ناموفق بود"));
    reader.readAsDataURL(file);
  });

/**
 * Mock image uploader: reads files locally into base64 previews (no server
 * upload in this phase). Supports single or multiple images with removal.
 */
const ImageUploader: FC<ImageUploaderProps> = ({
  value,
  onChange,
  label,
  max = 6,
  single = false,
  variant = "square",
}) => {
  const inputId = useId();
  const [isReading, setIsReading] = useState(false);

  const limit = single ? 1 : max;
  const isFull = value.length >= limit;

  const handleFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    setIsReading(true);
    try {
      const allowed = files.slice(0, limit - value.length);
      const dataUrls = await Promise.all(allowed.map(readAsDataUrl));
      onChange(single ? dataUrls.slice(0, 1) : [...value, ...dataUrls]);
    } finally {
      setIsReading(false);
      event.target.value = "";
    }
  };

  const removeAt = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.field}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.grid}>
        {value.map((src, index) => (
          <div
            key={`${src.slice(0, 16)}-${index}`}
            className={`${styles.tile} ${styles[variant]}`}
          >
            <img src={src} alt="" className={styles.preview} />
            <button
              type="button"
              className={styles.remove}
              onClick={() => removeAt(index)}
              aria-label="حذف تصویر"
            >
              <Icon name="close" size={14} />
            </button>
          </div>
        ))}

        {!isFull && (
          <label
            htmlFor={inputId}
            className={`${styles.dropzone} ${styles[variant]}`}
          >
            <Icon name="products" size={22} />
            <span className={styles.dropText}>
              {isReading ? "در حال بارگذاری..." : "افزودن تصویر"}
            </span>
            <input
              id={inputId}
              type="file"
              accept="image/*"
              multiple={!single}
              className={styles.input}
              onChange={handleFiles}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
