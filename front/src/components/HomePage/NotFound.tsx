import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AnimatedBackground from "@/components/HomePage/AnimatedBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative">
      <AnimatedBackground />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-[-5]"></div>

      <div className="text-center max-w-xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-8">
            <span className="text-4xl font-bold text-primary">404</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-glow"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-gray-300 mb-8"
        >
          Oops! The page you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            asChild
            size="lg"
            className="button-glow bg-primary hover:bg-primary/90 text-white"
          >
            <a href="/">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Return to Home
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
