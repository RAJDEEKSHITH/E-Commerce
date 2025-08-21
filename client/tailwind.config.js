/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                // Grid moving background
                'grid-move': {
                    '0%': { transform: 'translate(0, 0)' },
                    '100%': { transform: 'translate(50px, 50px)' },
                },
                
                // Spinning animations
                'spin-slow': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                'spin-medium': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                'spin-fast': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                'spin-reverse': {
                    '0%': { transform: 'rotate(360deg)' },
                    '100%': { transform: 'rotate(0deg)' },
                },
                
                // Smooth pulse
                'pulse-smooth': {
                    '0%, 100%': { opacity: '0.4', transform: 'scale(0.8)' },
                    '50%': { opacity: '1', transform: 'scale(1)' },
                },
                
                // Wave animation for bars
                'bar-wave': {
                    '0%, 40%, 100%': { transform: 'scaleY(0.4)' },
                    '20%': { transform: 'scaleY(1)' },
                },
                
                // Text sliding
                'text-slide': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                
                // Expanding circles
                'expand': {
                    '0%': { transform: 'translate(-50%, -50%) scale(0)', opacity: '1' },
                    '100%': { transform: 'translate(-50%, -50%) scale(6)', opacity: '0' },
                },
                
                // Progress sliding
                'progress-slide': {
                    '0%': { transform: 'translateX(-100%)' },
                    '50%': { transform: 'translateX(200%)' },
                    '50.01%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                
                // Random floating
                'float-random': {
                    '0%, 100%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.2' },
                    '25%': { transform: 'translateY(-20px) translateX(10px)', opacity: '0.4' },
                    '50%': { transform: 'translateY(-40px) translateX(-5px)', opacity: '0.6' },
                    '75%': { transform: 'translateY(-20px) translateX(-10px)', opacity: '0.4' },
                },
            },
            animation: {
                'grid-move': 'grid-move 20s linear infinite',
                'spin-slow': 'spin-slow 4s linear infinite',
                'spin-medium': 'spin-medium 2s linear infinite',
                'spin-fast': 'spin-fast 1s linear infinite',
                'spin-reverse': 'spin-reverse 3s linear infinite',
                'pulse-smooth': 'pulse-smooth 2s ease-in-out infinite',
                'bar-wave': 'bar-wave 1.5s ease-in-out infinite',
                'text-slide': 'text-slide 3s linear infinite',
                'expand': 'expand 2s ease-out infinite',
                'progress-slide': 'progress-slide 2s ease-in-out infinite',
                'float-random': 'float-random 6s ease-in-out infinite',
            },
        },
    },
    plugins: [],
};
