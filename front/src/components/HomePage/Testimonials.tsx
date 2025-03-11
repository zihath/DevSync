import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "This platform has completely transformed how our team collaborates on code. The real-time features are seamless.",
    author: "Sarah Chen",
    role: "Senior Developer, TechCorp",
  },
  {
    quote:
      "I've tried many coding environments, but this one stands out with its elegant UI and powerful features.",
    author: "Michael Rodriguez",
    role: "CS Professor, Stanford University",
  },
  {
    quote:
      "The DSA visualizations helped me understand complex algorithms in ways textbooks never could.",
    author: "Aisha Johnson",
    role: "Computer Science Student",
  },
];

const Testimonials = () => {
  return (
    <div className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Say</h2>
        <div className="h-1 w-20 bg-primary/40 mx-auto"></div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="glass-card rounded-xl p-6 text-left"
          >
            <div className="mb-4 text-primary">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.3 6.2H16.7C16.8 6.2 16.9 6.3 16.9 6.4V11.8C16.9 11.9 16.8 12 16.7 12H14.4L12 14.4V12H11.3C11.2 12 11.1 11.9 11.1 11.8V6.4C11.1 6.3 11.2 6.2 11.3 6.2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 9.8H2.6C2.5 9.8 2.4 9.9 2.4 10V15.4C2.4 15.5 2.5 15.6 2.6 15.6H4.9L7.3 18V15.6H8C8.1 15.6 8.2 15.5 8.2 15.4V10C8.2 9.9 8.1 9.8 7 9.8Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <blockquote className="text-gray-200 mb-4 leading-relaxed">
              "{testimonial.quote}"
            </blockquote>
            <footer>
              <p className="font-semibold">{testimonial.author}</p>
              <p className="text-gray-400 text-sm">{testimonial.role}</p>
            </footer>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
