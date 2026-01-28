import type { Config } from "tailwindcss";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#137fec",
				dark: "#101922",
				card: "#192633",
				border: "#2f3336",
				muted: "#71767b",
			},
			fontFamily: {
				display: ["Plus Jakarta Sans", "sans-serif"],
			},
		},
	},
} satisfies Config;
