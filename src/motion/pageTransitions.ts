export const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.99,
    },
    enter: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.19, 1, 0.22, 1], // Custom Expo ease
            when: "beforeChildren",
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.5,
            ease: [0.19, 1, 0.22, 1],
        },
    },
};