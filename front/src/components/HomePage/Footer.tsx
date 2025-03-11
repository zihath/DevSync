import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <a
            href="/"
            className="text-white font-bold text-xl flex items-center"
          >
            <span className="text-primary mr-2">{"<"}</span>
            CodeChum
            <span className="text-primary ml-1">{"/>"}</span>
          </a>
          <p className="mt-4 text-gray-400 text-sm">
            A collaborative coding platform designed for teams, educators, and
            students to code, learn, and build together.
          </p>
          <div className="mt-6 flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Release Notes
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Tutorials
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Community
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                API
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm">
          © 2023 CodeChum. All rights reserved.
        </p>
        <div className="mt-4 md:mt-0">
          <ul className="flex space-x-6">
            <li>
              <a
                href="#"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Terms
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
