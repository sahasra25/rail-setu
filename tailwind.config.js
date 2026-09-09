/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0F172A',
        panel: '#1E293B',
        saffron: '#FF6B00',
        railgreen: '#22C55E',
        railamber: '#F59E0B',
        railred: '#EF4444',
        railblue: '#3B82F6',
        railemergency: '#F97316',
        railaiviolet: '#8B5CF6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
