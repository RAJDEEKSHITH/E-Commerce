/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                // Existing animations
                ripple: {
                    '0%': { transform: 'scale(0)', opacity: '1' },
                    '100%': { transform: 'scale(2)', opacity: '0' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(15px)', opacity: '0.8' },
                    '50%': { transform: 'translateY(-15px)', opacity: '1' },
                },
                
                // New stunning animations
                'ripple-delayed': {
                    '0%': { transform: 'scale(0)', opacity: '0.7' },
                    '100%': { transform: 'scale(2.5)', opacity: '0' },
                },
                'ripple-slow': {
                    '0%': { transform: 'scale(0)', opacity: '0.5' },
                    '100%': { transform: 'scale(3)', opacity: '0' },
                },
                sparkle: {
                    '0%, 100%': { transform: 'scale(0)', opacity: '0' },
                    '50%': { transform: 'scale(1)', opacity: '1' },
                },
                'rotate-slow': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                'spin-slow': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                'pulse-slow': {
                    '0%, 100%': { opacity: '0.4' },
                    '50%': { opacity: '0.8' },
                },
                'bounce-delayed': {
                    '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                    '40%': { transform: 'translateY(-10px)' },
                    '60%': { transform: 'translateY(-5px)' },
                },
                'pulse-sequence': {
                    '0%, 60%, 100%': { opacity: '0.3', transform: 'scale(1)' },
                    '30%': { opacity: '1', transform: 'scale(1.2)' },
                },
                progress: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(400px)' },
                },
            },
            animation: {
                // Existing animations
                ripple: 'ripple 4s cubic-bezier(0, 0.2, 0.8, 1) infinite',
                float: 'float 4s infinite ease-in-out',
                
                // New animations
                'ripple-delayed': 'ripple-delayed 4s cubic-bezier(0, 0.2, 0.8, 1) infinite 1s',
                'ripple-slow': 'ripple-slow 4s cubic-bezier(0, 0.2, 0.8, 1) infinite 2s',
                sparkle: 'sparkle 3s ease-in-out infinite',
                'rotate-slow': 'rotate-slow 8s linear infinite',
                'spin-slow': 'spin-slow 6s linear infinite',
                'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
                'bounce-delayed': 'bounce-delayed 2s infinite',
                'pulse-sequence': 'pulse-sequence 1.5s infinite',
                progress: 'progress 2s ease-in-out infinite',
            },
        },
    },
    plugins: [],
};
