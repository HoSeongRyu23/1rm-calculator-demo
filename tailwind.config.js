/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'primary': '#135bec',
                'primary-dark': '#0f4bc2',
                'background-light': '#f6f6f8',
                'background-dark': '#101622',
                'card-dark': '#1c222e',
                'input-dark': '#282e39',
                'text-secondary': '#9da6b9',
            },
            fontFamily: {
                'display': ['Lexend', 'sans-serif']
            },
            borderRadius: {
                'DEFAULT': '0.25rem',
                'lg': '0.5rem',
                'xl': '0.75rem',
                '2xl': '1rem',
                'full': '9999px'
            },
            animation: {
                'fadeIn': 'fadeIn 0.3s ease-out'
            },
            keyframes: {
                fadeIn: {
                    'from': { opacity: '0', transform: 'translateY(5px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' }
                }
            }
        },
    },
    plugins: [],
};
