/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            // Add custom animations and keyframes here
            keyframes: {
                ripple: {
                    '0%': { transform: 'scale(0)', opacity: '1' },
                    '100%': { transform: 'scale(2)', opacity: '0' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(15px)', opacity: '0.8' },
                    '50%': { transform: 'translateY(-15px)', opacity: '1' },
                },
            },
            animation: {
                ripple: 'ripple 4s cubic-bezier(0, 0.2, 0.8, 1) infinite',
                float: 'float 4s infinite ease-in-out',
            },
        },
    },
    plugins: [],
};