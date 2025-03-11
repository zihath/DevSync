import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!spotlightRef.current) return;

      const { clientX, clientY } = event;
      const rect = spotlightRef.current.getBoundingClientRect();

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      spotlightRef.current.style.setProperty("--x", `${x}px`);
      spotlightRef.current.style.setProperty("--y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="absolute inset-0 spotlight -z-10"
      aria-hidden="true"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
    </div>
  );
};

export default AnimatedBackground;
