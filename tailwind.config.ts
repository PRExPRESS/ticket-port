import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // Dark Navy Blue
        secondary: '#FFD700', // Soft Gold (Used for accents and buttons)
        accent: '#FFD700', // Soft Gold for consistency
        background: {
          light: '#F9FAFB', // Light Gray (Primary Background)
          dark: '#0c072a', // Dark background for dark mode
        },
        text: {
          light: '#212529', // Dark Charcoal (Primary text)
          dark: '#E5E7EB', // Light Gray (Text in dark mode)
          muted: '#6B7280', // Muted Gray (Secondary text)
          placeholder: '#9CA3AF', // Light Gray (Placeholder text)
        },
        border: {
          light: '#D1D5DB', // Light Border Gray (For borders and input fields)
          dark: '#374151', // Dark Border Gray for dark mode
        },
        inputBackground: {
          light: '#F3F4F6', // Light input background for light mode
          dark: '#1F2937', // Dark input background for dark mode
        },
        buttonHover: {
          light: '#162A6E', // Button hover (Navy) for light mode
          dark: '#162A6E', // Same button hover effect for dark mode
        },
        feedback: {
          success: '#16A34A', // Success Green
          error: '#DC2626', // Error Red
          info: '#2563EB', // Info Blue
        },
        hoverEffects: {
          navy: '#162A6E', // Button Hover (Navy)
          gold: '#E6BE00', // Button Hover (Gold)
        }
      },
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'], // Default font
        fira: ['var(--font-fira-sans)', 'sans-serif'], // Fira Sans
        playfair: ['var(--font-playfair)', 'serif'], // Playfair
      },
    },
  },
  plugins: [],
} satisfies Config;
