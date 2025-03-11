import { Share2, Layout, Cpu } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { motion } from "framer-motion";

const FeaturesGrid = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-24"
    >
      <FeatureCard
        icon={<Share2 className="h-12 w-12" />}
        title="Live Collaboration"
        description="Code in real-time with teammates, students, or mentors with cursor tracking and instant updates."
        iconColor="text-emerald-400"
        delay={0.1}
      />

      <FeatureCard
        icon={<Layout className="h-12 w-12" />}
        title="Web Dev Environment"
        description="Integrated HTML, CSS, and JavaScript editor with instant preview and responsive design testing."
        iconColor="text-purple-400"
        delay={0.2}
      />

      <FeatureCard
        icon={<Cpu className="h-12 w-12" />}
        title="DSA Practice"
        description="Built-in data structures and algorithms playground with step-by-step visualization."
        iconColor="text-rose-400"
        delay={0.3}
      />
    </motion.div>
  );
};

export default FeaturesGrid;
