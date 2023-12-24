/** @type {import('tailwindcss').Config} */

export default {
    content: [
        './index.html',
        './src/**/*.{html,js,ts,tsx}',
        'node_modules/flowbite-react/lib/esm/**/*.js',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'main-hero': "url('/src/assets/hero - before dawn.svg')",
            },
        },
    },
    plugins: [
        // ...
        require('flowbite/plugin'),
    ],
}
