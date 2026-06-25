import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";
import Icons from "@/shared/icons";

interface Props {
  title: React.ReactNode;
  description?: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Collapsible: React.FC<Props> = ({
  title,
  description,
  icon,
  defaultOpen = true,
  children,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  const updateContentHeight = () => {
    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.style.height = "auto";
        const newHeight = contentRef.current.scrollHeight + 5;
        contentRef.current.style.height = `${newHeight}px`;
      } else {
        contentRef.current.style.height = "0px";
      }
    }
  };

  useEffect(() => {
    updateContentHeight();
  }, [isOpen]);

  useEffect(() => {
    if (!contentRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (isOpen) {
        updateContentHeight();
      }
    });

    const contentInner = contentRef.current.querySelector(
      `.${styles.contentInner}`
    );
    if (contentInner) {
      resizeObserver.observe(contentInner);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [isOpen, children]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.collapsibleCard} ${className}`}>
      <div
        className={styles.header}
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && handleToggle()
        }
      >
        <div className={styles.headerLeft}>
          {icon && <div className={styles.icon}>{icon}</div>}
          <div>
            <div className={styles.title}>{title}</div>
            {description && (
              <div className={styles.description}>{description}</div>
            )}
          </div>
        </div>
        <div
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
        >
          <Icons name="Angle-down" color="#888" isFill size={18} />
        </div>
      </div>

      <div
        ref={contentRef}
        className={`${styles.content} ${isOpen ? styles.open : styles.closed}`}
      >
        <div className={styles.contentInner}>{children}</div>
      </div>
    </div>
  );
};

export default Collapsible;
