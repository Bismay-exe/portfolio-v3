"use client"


import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

// Register once, globally safe
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollConfig {
    scope: React.RefObject<HTMLElement | null>;
    animation: (ctx: gsap.Context) => void;
    dependencies?: any[];
}

export const useScrollTrigger = ({ scope, animation, dependencies = [] }: ScrollConfig) => {
    useIsomorphicLayoutEffect(() => {
        // Safety check for scope
        if (!scope.current) return;

        // Create a GSAP Context: Handles cleanup automatically
        const ctx = gsap.context((self) => {
            animation(self);
        }, scope);

        // Cleanup phase
        return () => ctx.revert();
    }, dependencies);
};