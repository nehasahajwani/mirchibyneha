/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Primary site background
        ink: '#0B01D6',
        // Darker background used for alternating/inset sections
        'ink-dark': '#0B095B',
        // Primary text colour on the blue backgrounds
        paper: '#FDFDFD',
        // Links / accents
        accent: '#F35E02',
      },
      fontFamily: {
        // Logo + section titles (",by neha", "About me")
        display: ['Lora', 'serif'],
        // Body copy
        body: ['"Nunito Sans"', 'sans-serif'],
        // Nav bar
        nav: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
