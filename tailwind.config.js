/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                // Pure Swiss palette
                black: "#050505", // Slightly off-black for screen readability
                white: "#FFFFFF",
                accent: "#FF2A00", // International Typographic Style Red
                "gray-light": "#F2F2F2",
            },
            fontFamily: {
                // Tight, confident sans-serifs
                sans: ['"Inter"', '"Helvetica Neue"', "Arial", "sans-serif"],
                display: ['"Darker Grotesque"', "sans-serif"], // Assuming an import or swap for a bold display font
            },
            fontSize: {
                // Massive editorial hierarchy
                "10xl": ["12rem", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
                "hero": ["9rem", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
                "title": ["5rem", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
                "body": ["1.125rem", { lineHeight: "1.6", letterSpacing: "-0.01em" }],
            },
            transitionTimingFunction: {
                "expo": "cubic-bezier(0.19, 1, 0.22, 1)", // GSAP Expo.easeOut equivalent
            }
        },
    },
    plugins: [],
};