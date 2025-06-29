// src/ScrollRestoration.tsx
import { useEffect } from "react";

export function useScrollRestoration() {
  useEffect(() => {
    // Restore scroll position on load
    const scrollY = sessionStorage.getItem("scrollY");
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY, 10));
    }

    // Save scroll position before unload
    const saveScroll = () => {
      sessionStorage.setItem("scrollY", window.scrollY.toString());
    };
    window.addEventListener("beforeunload", saveScroll);

    return () => {
      window.removeEventListener("beforeunload", saveScroll);
    };
  }, []);
}
