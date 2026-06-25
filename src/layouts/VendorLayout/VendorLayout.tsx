import { useState, type FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./VendorLayout.module.css";

const VendorLayout: FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={isSidebarOpen} onNavigate={closeSidebar} />

      {isSidebarOpen && (
        <button
          type="button"
          className={styles.overlay}
          aria-label="بستن منو"
          onClick={closeSidebar}
        />
      )}

      <div className={styles.main}>
        <Header onToggleSidebar={() => setIsSidebarOpen((v) => !v)} />
        <main className={styles.content}>
          <div className={styles.contentInner}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;
