import React, { useState, useRef, useCallback, useEffect } from "react";
import styles from "./LogoUploader.module.css";
import Icons from "@/shared/icons/index";

interface ValidationRules {
  required?: boolean;
  maxSize?: number;
  allowedTypes?: string[];
}

interface LogoUploaderProps {
  validationRules?: ValidationRules;
  onValidationChange?: (isValid: boolean, file?: File) => void;
  onSubmitAttempt?: boolean;
  defaultImage?: string;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({
  validationRules = {
    required: true,
    maxSize: 2,
    allowedTypes: ["image/png", "image/jpeg", "image/gif"],
  },
  onValidationChange,
  onSubmitAttempt = false,
  defaultImage,
}) => {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setPreview(defaultImage || null);
  }, [defaultImage]);
  useEffect(() => {
    if (onSubmitAttempt && validationRules.required && !preview) {
      setError("آپلود فایل اجباری است");
    }
  }, [onSubmitAttempt, preview, validationRules.required]);
  const messages = {
    required: "آپلود فایل اجباری است",
    invalidType: "فرمت فایل مجاز نیست. فقط PNG, JPG, GIF مجاز است",
    maxSize: (max: number) => `حداکثر حجم فایل ${max} مگابایت است`,
  };
  const validateFile = useCallback(
    (file?: File) => {
      setError(null);

      if (validationRules.required && !file) {
        setError(messages.required);
        onValidationChange?.(false);
        return false;
      }

      if (!file) {
        onValidationChange?.(true);
        return true;
      }

      if (
        validationRules.allowedTypes &&
        !validationRules.allowedTypes.includes(file.type)
      ) {
        setError(messages.invalidType);
        onValidationChange?.(false, file);
        return false;
      }

      const maxSizeBytes = (validationRules.maxSize || 2) * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        setError(messages.maxSize(validationRules.maxSize || 2));
        onValidationChange?.(false, file);
        return false;
      }

      onValidationChange?.(true, file);
      return true;
    },
    [validationRules, onValidationChange]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleFile = (file?: File) => {
    if (file && validateFile(file)) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onValidationChange?.(!validationRules.required, undefined);
  };

  const handleClick = () => {
    if (!preview) fileInputRef.current?.click();
  };

  return (
    <div className={styles.container}>
      <div
        className={`${!error ? styles.uploaderBox : styles.uploaderBoxError} ${
          isDragging ? styles.dragging : ""
        } ${preview ? styles.hasPreview : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          aria-label="Upload logo"
          aria-describedby={error ? "error-message" : undefined}
          ref={fileInputRef}
          className={styles.fileInput}
          onChange={handleFileChange}
          accept="image/png,image/jpeg,image/gif"
        />

        {preview ? (
          <div className={styles.previewContainer}>
            <img src={preview} alt="Logo preview" className={styles.preview} />
            <button className={styles.removeButton} onClick={handleRemove}>
              <Icons color="#000" name="Write" size={16} />
            </button>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <div className={styles.uploadIcon}>
              <Icons color="#000" name="Write" size={16} isFill />
            </div>
            <div className={styles.uploadText}>
              <p>فایل خود را اینجا بکشید و رها کنید</p>
              <p className={styles.uploadSubtext}>یا کلیک نمایید</p>
            </div>
            <div className={styles.supportedFormats}>
              <Icons color="#000" name="Write" size={16} isFill />
              <span>PNG, JPG, GIF (max 2MB)</span>
            </div>
          </div>
        )}
      </div>
      <div className={styles.errorMessageContainer}>
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    </div>
  );
};

export default LogoUploader;
