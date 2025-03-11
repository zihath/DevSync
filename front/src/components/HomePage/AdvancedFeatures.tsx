import { Terminal, Layers } from "lucide-react";
import { motion } from "framer-motion";
interface FeatureListProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  color: string;
  delay: number;
}
const FeatureList = ({
  icon,
  title,
  items,
  color,
  delay,
}: FeatureListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-8 rounded-xl text-left"
    >
      <div className={`${color} mb-4`}>{icon}</div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <ul className="space-y-3">
        {items.map((item: string, index: number) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: delay + 0.1 * index }}
            className="flex items-center text-gray-300"
          >
            <span
              className={`${color.replace(
                "text-",
                "bg-"
              )} h-1 w-1 rounded-full mr-3`}
            ></span>
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

const AdvancedFeatures = () => {
  const webDevFeatures = [
    "Instant HTML/CSS/JS Editing",
    "Live Preview Pane",
    "Syntax Highlighting",
    "Auto-Complete",
    "Responsive Testing",
    "Asset Management",
  ];

  const dsaFeatures = [
    "Algorithm Visualization",
    "Code Execution",
    "Time & Space Complexity",
    "Problem Set Library",
    "Performance Analysis",
    "Interview Preparation",
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
      <FeatureList
        icon={<Terminal className="h-14 w-14" />}
        title="Web Development"
        items={webDevFeatures}
        color="text-blue-400"
        delay={0.1}
      />
      <FeatureList
        icon={<Layers className="h-14 w-14" />}
        title="DSA Features"
        items={dsaFeatures}
        color="text-emerald-400"
        delay={0.3}
      />
    </div>
  );
};

export default AdvancedFeatures;
