/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  "./index.html",
	  "./src/**/*.{ts,tsx,js,jsx}",
	  "./pages/**/*.{ts,tsx,js,jsx}",
	  "./components/**/*.{ts,tsx,js,jsx}",
	  "./app/**/*.{ts,tsx,js,jsx}"
	],
	theme: {
	  container: {
		center: true,
		padding: "2rem",
		screens: {
		  "2xl": "1400px"
		}
	  },
	  extend: {
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)"
		},
		colors: {
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))"
		  },
		  secondary: {
			DEFAULT: "hsl(var(--secondary))",
			foreground: "hsl(var(--secondary-foreground))"
		  },
		  destructive: {
			DEFAULT: "hsl(var(--destructive))",
			foreground: "hsl(var(--destructive-foreground))"
		  },
		  muted: {
			DEFAULT: "hsl(var(--muted))",
			foreground: "hsl(var(--muted-foreground))"
		  },
		  accent: {
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))"
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))"
		  },
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))"
		  },
		  sidebar: {
			DEFAULT: "hsl(var(--sidebar-background))",
			foreground: "hsl(var(--sidebar-foreground))",
			primary: "hsl(var(--sidebar-primary))",
			"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
			accent: "hsl(var(--sidebar-accent))",
			"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
			border: "hsl(var(--sidebar-border))",
			ring: "hsl(var(--sidebar-ring))"
		  },
		  editor: {
			background: "#1e1e1e",
			foreground: "#f8f8f8",
			accent: "#0078d4",
			success: "#4caf50",
			warning: "#ff9800",
			error: "#e53935",
			panelBg: "#252526",
			inputBg: "#2d2d2d"
		  },
		  chart: {
			"1": "hsl(var(--chart-1))",
			"2": "hsl(var(--chart-2))",
			"3": "hsl(var(--chart-3))",
			"4": "hsl(var(--chart-4))",
			"5": "hsl(var(--chart-5))"
		  }
		},
		keyframes: {
		  "accordion-down": {
			from: { height: "0" },
			to: { height: "var(--radix-accordion-content-height)" }
		  },
		  "accordion-up": {
			from: { height: "var(--radix-accordion-content-height)" },
			to: { height: "0" }
		  },
		  "fade-in": {
			"0%": { opacity: "0" },
			"100%": { opacity: "1" }
		  },
		  "fade-out": {
			"0%": { opacity: "1" },
			"100%": { opacity: "0" }
		  },
		  "slide-in": {
			"0%": { transform: "translateY(10px)", opacity: "0" },
			"100%": { transform: "translateY(0)", opacity: "1" }
		  },
		  "slide-out": {
			"0%": { transform: "translateY(0)", opacity: "1" },
			"100%": { transform: "translateY(10px)", opacity: "0" }
		  },
		  spin: {
			"0%": { transform: "rotate(0deg)" },
			"100%": { transform: "rotate(360deg)" }
		  }
		},
		animation: {
		  "accordion-down": "accordion-down 0.2s ease-out",
		  "accordion-up": "accordion-up 0.2s ease-out",
		  "fade-in": "fade-in 0.3s ease-out",
		  "fade-out": "fade-out 0.3s ease-out",
		  "slide-in": "slide-in 0.3s ease-out",
		  "slide-out": "slide-out 0.3s ease-out",
		  spin: "spin 1s linear infinite"
		}
	  }
	},
	plugins: [require("tailwindcss-animate")]
  };
  