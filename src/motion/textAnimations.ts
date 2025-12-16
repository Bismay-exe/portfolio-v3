import gsap from "gsap";

/**
 * Standard Swiss Reveal: Text slides up from a masked container.
 * Requires the target element to be wrapped in a container with overflow: hidden.
 */
export const animateTitleReveal = (target: string | Element, delay: number = 0) => {
    return gsap.fromTo(
        target,
        { y: "120%", rotateZ: 2, opacity: 0 },
        {
            y: "0%",
            rotateZ: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            delay,
        }
    );
};

/**
 * Staggered Text Reveal: Used for lists or paragraphs.
 */
export const animateStaggerText = (targets: string | Element[], trigger: Element) => {
    return gsap.fromTo(
        targets,
        { y: 30, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
                trigger: trigger,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
        }
    );
};

/**
 * Parallax Text: scrub-linked y-movement
 */
export const parallaxText = (target: Element, velocity: number = 100) => {
    gsap.to(target, {
        y: velocity,
        ease: "none",
        scrollTrigger: {
            trigger: target,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        },
    });
};