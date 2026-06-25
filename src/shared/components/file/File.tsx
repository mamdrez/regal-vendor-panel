import Icons from "@/shared/icons";
import styles from "./styles.module.css";
import { truncateText } from "@/utils/utils";
import { AssetsUrl } from "@/config/urls";

interface IProps {
  type: "word" | "pdf" | "excel" | "img";
  fileName?: string;
  kind?: "horizontal" | "vertical";
  url?: string;
  onRemove?: () => void;
}

export const getFileType = (fileName: string) => {
  const extension = fileName?.split(".")?.pop()?.toLowerCase();

  switch (extension) {
    case "doc":
    case "docx":
      return "word";
    case "pdf":
      return "pdf";
    case "xls":
    case "xlsx":
      return "excel";
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
      return "img";
    default:
      return "pdf";
  }
};

const File: React.FC<IProps> = ({ type, fileName, kind, url, onRemove }) => {
  const fileConfig = {
    word: {
      color: "#1565C0",
      icon: "word",
      extension: ".docx",
      bgColor: "#E3F2FD",
      size: 36.8,
      smallSize: 20.8,
    },
    pdf: {
      color: "#D32F2F",
      icon: "pdf",
      extension: ".pdf",
      bgColor: "#FFEBEE",
      size: 36.8,
      smallSize: 20.8,
    },
    excel: {
      color: "#2E7D32",
      icon: "excel",
      extension: ".xlsx",
      bgColor: "#E8F5E9",
      size: 36.8,
      smallSize: 20.8,
    },
    img: {
      color: "#6D4C41",
      icon: "image-file",
      extension: ".jpg",
      bgColor: "#EFEBE9",
      size: 2,
      smallSize: 17.6,
    },
  };

  const config = fileConfig?.[type];
  const displayName = fileName || `example${config.extension}`;

  const handleDownload = async () => {
    if (url) {
      try {
        const fileUrl = `${AssetsUrl}/${url}`;
        const response = await fetch(fileUrl, { mode: "cors" });
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = displayName;
        link.click();
        window.URL.revokeObjectURL(downloadUrl); // Cleanup
      } catch (error) {
        console.error("Download failed", error);
      }
    }
  };
  return (
    <div
      className={`${styles.fileItem} ${
        kind === "horizontal" && styles.horizontal
      }`}
      onClick={handleDownload}
      //   style={{ backgroundColor: config.bgColor }}
    >
      {onRemove && (
        <div
          className={
            kind === "horizontal"
              ? styles.fileItemRemoveHorizontal
              : styles.fileItemRemove
          }
          onClick={() => onRemove?.()}
        >
          <Icons name="Close" color="#e11900" size={14.4} isFill />
        </div>
      )}
      <Icons
        color={config?.color || ""}
        name={config?.icon || ""}
        size={kind === "horizontal" ? config?.smallSize : config?.size}
        isFill
      />
      <span>{truncateText(displayName, 12)}</span>
    </div>
  );
};

export default File;
