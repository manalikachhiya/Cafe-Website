import { useEffect, useState } from "react";

// Tracks whether the user has scrolled past a threshold, used by ScrollTop button.
export default function useScrollTop(threshold = 300) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return visible;
}
