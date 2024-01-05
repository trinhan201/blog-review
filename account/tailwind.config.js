/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            keyframes: {
                fadeIn: {
                    '0%': {
                        opacity: 0,
                        transform: 'translateY(-140px)',
                    },

                    '100%': {
                        opacity: 1,
                        transform: 'translateY(0)',
                    },
                },
            },
            animation: {
                fadeIn: 'fadeIn 0.5s ease',
            },
        },
    },
    plugins: [],
};
