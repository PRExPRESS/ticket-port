/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  content: [
	"./src/**/*.{js,ts,jsx,tsx}",
	"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['class', "class"],

  theme: {
	extend: {
		colors: {
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))'
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))'
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))'
			},
			background: 'hsl(var(--background))',
			text: {
				light: '#212529',
				dark: '#E5E7EB',
				muted: '#6B7280',
				placeholder: '#9CA3AF'
			},
			border: 'hsl(var(--border))',
			inputBackground: {
				light: '#F3F4F6',
				dark: '#1F2937'
			},
			buttonHover: {
				light: '#162A6E',
				dark: '#162A6E'
			},
			"button-accent": "hsl(var(--button-accent))",
			feedback: {
				success: '#16A34A',
				error: '#DC2626',
				info: '#2563EB'
			},
			hoverEffects: {
				navy: '#162A6E',
				gold: '#E6BE00'
			},
			foreground: 'hsl(var(--foreground))',
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))'
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))'
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))'
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))'
			},
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			chart: {
				'1': 'hsl(var(--chart-1))',
				'2': 'hsl(var(--chart-2))',
				'3': 'hsl(var(--chart-3))',
				'4': 'hsl(var(--chart-4))',
				'5': 'hsl(var(--chart-5))'
			}
		},
		fontFamily: {
			roboto: [
				'var(--font-roboto)',
				'sans-serif'
			],
			fira: [
				'var(--font-fira-sans)',
				'sans-serif'
			],
			playfair: [
				'var(--font-playfair)',
				'serif'
			],
			ibmPlexMono: [
				'var(--font-ibm-plex-mono)',
				'monospace'
			]
		},
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		}
	}
  },
  plugins: [tailwindcssAnimate],
}

export default config;

