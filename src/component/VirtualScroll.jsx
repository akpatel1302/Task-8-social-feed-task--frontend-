import { useState, useEffect } from "react";

export default function useIsVisible(ref, rootMargin = "0px") {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        setIsVisible(observerEntry.isIntersecting);
      },
      { rootMargin }
    );

    if (ref.current !== null) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isVisible;
}
