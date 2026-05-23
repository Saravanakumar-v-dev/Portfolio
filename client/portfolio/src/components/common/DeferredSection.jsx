import React, { useEffect, useRef, useState } from "react";

/**
 * Custom event name used by the navbar to force-render all deferred sections.
 * When dispatched, every DeferredSection immediately renders its children
 * so that `getElementById` calls for scroll targets succeed.
 */
const FORCE_RENDER_EVENT = "deferred-section-force-render";

export { FORCE_RENDER_EVENT };

export default function DeferredSection({
  children,
  minHeight = 220,
  rootMargin = "220px 0px",
  className = "",
}) {
  const targetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Listen for the global force-render event (fired by navbar before scrolling)
    const handleForceRender = () => {
      setIsVisible(true);
    };

    window.addEventListener(FORCE_RENDER_EVENT, handleForceRender);

    return () => {
      window.removeEventListener(FORCE_RENDER_EVENT, handleForceRender);
    };
  }, []);

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
