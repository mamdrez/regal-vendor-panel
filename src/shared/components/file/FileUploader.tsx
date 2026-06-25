import { useState, useRef, FC, CSSProperties } from "react";
import styles from "./styles.module.css";
import Icons from "@/shared/icons";

interface IProps {
  description?: string;
  onFilesChange?: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  validationError?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
}

const FileUploader: FC<IProps> = ({
  description,
  onFilesChange,
  multiple = true,
  accept = "*/*",
  maxSize,
  validationError,
  disabled,
  style,
  className,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `فایل ${file.name} از حد مجاز ${formatFileSize(
        maxSize
      )} بزرگتر است`;
    }
    return null;
  };

  const processFiles = (files: FileList | File[]): File[] => {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    let errorMessage = "";

    fileArray.forEach((file) => {
      const validationError = validateFile(file);
      if (validationError) {
        errorMessage = validationError;
      } else {
        validFiles.push(file);
      }
    });

    setError(errorMessage);
    return validFiles;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles = processFiles(files);

      setSelectedFiles((prevFiles) => {
        let updatedFiles: File[];

        if (multiple) {
          updatedFiles = [...prevFiles, ...validFiles];
        } else {
          updatedFiles = validFiles.slice(0, 1);
        }

        onFilesChange?.(updatedFiles);
        return updatedFiles;
      });
      event.target.value = "";
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (files) {
      const validFiles = processFiles(files);

      setSelectedFiles((prevFiles) => {
        let updatedFiles: File[];

        if (multiple) {
          updatedFiles = [...prevFiles, ...validFiles];
        } else {
          updatedFiles = validFiles.slice(0, 1);
        }

        onFilesChange?.(updatedFiles);
        return updatedFiles;
      });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveFile = (fileName: string) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file.name !== fileName);
      onFilesChange?.(updatedFiles);
      return updatedFiles;
    });
    setError("");
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`${styles.fileUploaderContainer} ${className} ${
        validationError ? styles.error : ""
      } ${disabled ? styles.disabled : ""}`}
      style={style}
    >
      {validationError && (
        <span className={styles.errorMsg}>{validationError}</span>
      )}
      {description && <p className={styles.description}>{description}</p>}

      {error && (
        <div className={styles.errorMessage}>
          <Icons name="Warning" color="#ff0000" size={16} />
          <span>{error}</span>
        </div>
      )}

      <div
        className={`${styles.dropArea} ${isDragging ? styles.dragging : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
        role="button"
        tabIndex={0}
        aria-label="فایل مورد نظر را درگ و دراپ بکنید یا برای انتخاب کلیک کنید"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple={multiple}
          accept={accept}
          className={styles.fileInput}
          aria-hidden="true"
        />
        <Icons name="Upload" color="#666" isFill size={24} />
        <p className={styles.dropText}>
          فایل مورد نظر را درگ و دراپ بکنید یا برای انتخاب کلیک کنید
        </p>
        {maxSize && (
          <p className={styles.maxSizeText}>
            حداکثر اندازه فایل: {formatFileSize(maxSize)}
          </p>
        )}
      </div>

      {selectedFiles.length > 0 && (
        <div className={styles.fileList}>
          <p className={styles.fileListHeader}>فایل های انتخاب شده :</p>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={file.name + index} className={styles.fileItemUploader}>
                <div className={styles.fileInfo}>
                  <span className={styles.fileName}>{file.name}</span>
                  <span className={styles.fileSize}>
                    ({formatFileSize(file.size)})
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(file.name);
                  }}
                  className={styles.removeButton}
                  aria-label={`Remove ${file.name}`}
                >
                  <Icons name="Close" color="#000" size={18} cursor="pointer" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
