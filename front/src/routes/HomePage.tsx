import { Button } from "@/components/ui/button";
import {
  Code,
  Share2,
  Layout,
  Layers,
  ArrowRight,
  Cpu,
  Terminal,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <div className="mx-auto px-4 py-16 text-center flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm inline-flex items-center">
              <Code className="mr-2 h-4 w-4 text-blue-400" />
              Real-time Collaborative Coding Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Code Together, Learn Together
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Revolutionize your coding experience with instant collaboration,
            integrated DSA practice, and a powerful web development environment.
          </p>

          <div className="flex justify-center space-x-4 mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Coding
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Learn More
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <Share2 className="h-10 w-10 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Live Collaboration</h3>
              <p className="text-gray-400">
                Code in real-time with teammates, students, or mentors.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <Layout className="h-10 w-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Web Dev Environment
              </h3>
              <p className="text-gray-400">
                Integrated HTML, CSS, and JavaScript editor with instant
                preview.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <Cpu className="h-10 w-10 text-red-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">DSA Practice</h3>
              <p className="text-gray-400">
                Built-in data structures and algorithms playground.
              </p>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-left">
              <Terminal className="h-12 w-12 text-blue-400 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Web Development</h2>
              <ul className="space-y-2 text-gray-300">
                <li>• Instant HTML/CSS/JS Editing</li>
                <li>• Live Preview Pane</li>
                <li>• Syntax Highlighting</li>
                <li>• Auto-Complete</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-left">
              <Layers className="h-12 w-12 text-green-400 mb-4" />
              <h2 className="text-2xl font-bold mb-4">DSA Features</h2>
              <ul className="space-y-2 text-gray-300">
                <li>• Algorithm Visualization</li>
                <li>• Code Execution</li>
                <li>• Time & Space Complexity</li>
                <li>• Problem Set Library</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
