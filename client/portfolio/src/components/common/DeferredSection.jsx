import React, { useEffect, useRef, useState } from "react";

export default function DeferredSection({
  children,
  minHeight = 220,
  rootMargin = "220px 0px",
  className = "",
}) {
  const targetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      return undefined;
    }

    const node = targetRef.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div ref={targetRef} className={className} style={isVisible ? undefined : { minHeight }}>
      {isVisible ? children : null}
    </div>
  );
}
