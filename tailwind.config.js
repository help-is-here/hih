import FlowbitePlugin from 'flowbite/plugin'
/** @type {import('tailwindcss').Config} */

export default {
    content: [
        './index.html',
        './src/**/*.{html,js,ts,tsx}',
        './node_modules/flowbite/**/*.js',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'main-hero': "url('/src/assets/hero - before dawn.svg')",
            },
        },
    },
    plugins: [FlowbitePlugin],
}
