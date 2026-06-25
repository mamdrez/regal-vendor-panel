import { useEffect, useCallback } from "react";

const useServiceWorkerNotifier = () => {
  const applyUpdate = useCallback(() => {
    if (!("serviceWorker" in navigator)) return;

    (async () => {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg?.waiting) {
        reg.waiting.postMessage({ type: "SKIP_WAITING" });
      } else {
        window.location.reload();
      }
    })();
  }, []);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let refreshing = false;
    const controllerChangeHandler = () => {
      if (refreshing) return;
      refreshing = true;
      if (navigator.serviceWorker.controller) {
        window.location.reload();
      }
    };

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      controllerChangeHandler
    );

    return () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        controllerChangeHandler
      );
    };
  }, [applyUpdate]);
};

export default useServiceWorkerNotifier;
