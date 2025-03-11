import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative pt-24 pb-16 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full text-sm inline-flex items-center"
        >
          <span className="mr-2 h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          Real-time Collaborative Coding Platform
        </motion.span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-glow"
      >
        Code Together, <br />
        <span className="text-primary">Learn Together</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
      >
        Revolutionize your coding experience with instant collaboration,
        integrated DSA practice, and a powerful web development environment.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-16"
      >
        <Button
          size="lg"
          className="button-glow bg-primary hover:bg-primary/90 text-white font-medium text-lg h-14 px-8"
        >
          Start Coding
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-gray-700 hover:bg-gray-800 text-white font-medium text-lg h-14 px-8"
        >
          Learn More
        </Button>
      </motion.div>
    </div>
  );
};

export default HeroSection;
