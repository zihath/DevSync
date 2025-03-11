import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import AnimatedBackground from "@/components/HomePage/AnimatedBackground";
import Header from "@/components/HomePage/Header";
import HeroSection from "@/components/HomePage/HeroSection";
import FeaturesGrid from "@/components/HomePage/FeaturesGrid";
import AdvancedFeatures from "@/components/HomePage/AdvancedFeatures";
import CodeEditorPreview from "@/components/HomePage/CodeEditorPreview";
import Testimonials from "@/components/HomePage/Testimonials";
import CallToAction from "@/components/HomePage/CallToAction";
import Footer from "@/components/HomePage/Footer";

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Preload animations
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const href = link.getAttribute("href");
        if (!href) return;

        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });
  }, []);

  return (
    <div className="relative home-page">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary/80 z-50 origin-left"
        style={{ scaleX }}
      />

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] opacity-95" />

        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-purple-900/50 blur-2xl rounded-full"
          animate={{ x: [0, 30, 0], y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-48 h-48 bg-cyan-900/50 blur-xl rounded-full"
          animate={{ x: [0, -25, 0], y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />

        <svg
          className="absolute inset-0 w-full h-full opacity-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="lighterGridPattern"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#333333"
                strokeWidth="0.8"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lighterGridPattern)" />
        </svg>
      </div>

      <div className="relative min-h-screen w-full text-white flex flex-col">
        <AnimatedBackground />
        <Header />

        <main className="flex-grow">
          <HeroSection />

          <section id="features" className="py-16 px-4">
            <FeaturesGrid />
            <AdvancedFeatures />
          </section>

          <section id="editor" className="overflow-hidden">
            <CodeEditorPreview />
          </section>

          <section id="testimonials">
            <Testimonials />
          </section>

          <section id="cta">
            <CallToAction />
          </section>
        </main>

        <Footer />
      </div>

      {/* Vignette Overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at center,
              transparent 50%,
              rgba(0, 0, 0, 0.5) 90%,
              rgba(0, 0, 0, 0.8) 100%
            )
          `,
          mixBlendMode: "multiply",
          zIndex: 5,
        }}
      />
    </div>
  );
};

export default HomePage;
