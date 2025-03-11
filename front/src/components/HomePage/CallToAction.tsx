import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <div className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card max-w-4xl mx-auto p-12 rounded-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-500 to-purple-600"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Coding Experience?
          </h2>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have already elevated their coding
            workflow. Start with a free account today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <Button
              size="lg"
              className="button-glow bg-primary hover:bg-primary/90 text-white font-medium text-lg h-14 px-8 w-full sm:w-auto"
            >
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-gray-700 hover:bg-gray-800 text-white font-medium text-lg h-14 px-8 w-full sm:w-auto"
            >
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CallToAction;
