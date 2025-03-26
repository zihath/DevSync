import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, X, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeaderRoutes } from "@/lib/helper";
import { useNavigate } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { user } = useUser();
  // console.log(user);
  // return <UserButton />;
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a
              href="/"
              className="text-white font-bold text-xl flex items-center"
            >
              <span className="text-primary mr-2">{"<"}</span>
              DevSync
              <span className="text-primary ml-1">{"/>"}</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {HeaderRoutes.map((route, index) => (
              <a
                key={index}
                href={route.href}
                className="text-gray-300 hover:text-white underline-animation transition-colors"
              >
                {route.label}
              </a>
            ))}
            <a
              href="https://github.com"
              className="text-gray-300 hover:text-white transition-colors flex items-center"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-5 w-5" />
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center ml-auto border border-gray-600 rounded-full bg-gray-900/50 p-1 hover:border-gray-400 transition-colors">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                      userButtonPopoverCard:
                        "bg-gray-900 border border-gray-700",
                      userButtonPopoverFooter: "border-gray-700",
                    },
                  }}
                />
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white"
                  onClick={() => navigate("/sign-in")}
                >
                  Log in
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => navigate("/sign-up")}
                >
                  Sign up
                </Button>
              </>
            )}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/90 backdrop-blur-lg border-b border-white/10"
          >
            <div className="px-4 py-4 space-y-3">
              <a
                href="#features"
                className="block text-gray-300 hover:text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block text-gray-300 hover:text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#docs"
                className="block text-gray-300 hover:text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Documentation
              </a>
              <div className="pt-4 space-y-2">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white w-full justify-start"
                  onClick={() => navigate("/sign-in")}
                >
                  Log in
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90 w-full"
                  onClick={() => navigate("/sign-up")}
                >
                  Sign up
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
