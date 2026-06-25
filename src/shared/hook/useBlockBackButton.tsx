import { useEffect } from "react";
import { useLocation } from "react-router";

const useBlockBackButton = () => {
  const location = useLocation();

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function () {
      window.history.pushState(null, document.title, window.location.href);
    });
  }, [location]);
};

export default useBlockBackButton;
