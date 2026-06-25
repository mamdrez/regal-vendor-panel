import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

export interface TabItem {
  id: string;
  label: string;
  component?: React.ReactNode;
  icon?: React.ReactNode;
}

interface IProps {
  tabs: TabItem[];
  defaultTab?: string;
  type?: "line" | "chips" | "chips_small";
  onChange?: (activeTab: string) => void;
  fontSize?: number;
  disabledComponent?: boolean;
}

const Tab: FC<IProps> = ({
  tabs,
  defaultTab,
  type = "line",
  onChange,
  fontSize = 14,
  disabledComponent = false,
}) => {
  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);
  const indicatorRef = useRef<HTMLDivElement | null>(null);

  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const updateIndicator = () => {
      const currentTab = tabRefs.current[activeIndex];
      const firstTabParent = tabRefs.current[0]?.parentElement;
      if (currentTab && firstTabParent && indicatorRef.current) {
        const { width, right } = currentTab.getBoundingClientRect();
        const containerLeft = firstTabParent.getBoundingClientRect().right;
        indicatorRef.current.style.width = `${width}px`;
        indicatorRef.current.style.transform = `translateX(${
          right - containerLeft
        }px)`;
      }
    };

    if (tabRefs.current[activeIndex]) {
      updateIndicator();
    }

    window.addEventListener("resize", updateIndicator);
    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeTab, tabs]);

  return (
    <div className={styles.tabChanger}>
      <div className={`${styles.tabHeader} ${styles?.[type]}`}>
        <div className={`${styles.tabList} ${styles?.[type]}`}>
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              className={`${styles.tabButton} ${
                activeTab === tab.id ? styles.active : ""
              } ${styles?.[type]}`}
              onClick={() => {
                setActiveTab(tab.id);
                onChange?.(tab.id);
              }}
              style={{
                fontSize: fontSize ? `${fontSize}px` : "inherit",
                width:
                  type === "chips" ? `calc(100% / ${tabs.length})` : "auto",
              }}
            >
              {tab.icon && React.isValidElement(tab.icon)
                ? React.cloneElement(tab.icon as React.ReactElement<any>, {
                    color:
                      activeTab === tab.id
                        ? "#000000"
                        : (tab.icon.props as any).color,
                  })
                : tab.icon}
              {tab.label}
            </div>
          ))}

          <div
            className={`${styles.tabUnderline} ${styles?.[type]}`}
            ref={indicatorRef}
          />
        </div>
      </div>
      {!disabledComponent && (
        <div className={styles.tabContent}>
          <div className={styles.tabPanel} key={activeTabData?.label}>
            {React.isValidElement(activeTabData?.component)
              ? React.cloneElement(activeTabData.component, {
                  activeTab,
                } as Record<string, string>)
              : activeTabData?.component}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tab;
