import React, { useRef } from "react";
import gsap from "gsap";
import { useScrollTrigger } from "../../hooks/useScrollTrigger";

export default function Contact() {
    const container = useRef<HTMLElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);
    const lastRotation = useRef(0);

    // Refs for corner animations
    const tlRef = useRef<HTMLDivElement>(null); // Top Left
    const trRef = useRef<HTMLDivElement>(null); // Top Right
    const blRef = useRef<HTMLAnchorElement>(null); // Bottom Left (Email)
    const brRef = useRef<HTMLDivElement>(null); // Bottom Right

    useScrollTrigger({
        scope: container,
        animation: () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 60%",
                }
            });

            // 1. Reveal Center Arrow (Scale Up)
            tl.from(arrowRef.current, {
                scale: 0,
                opacity: 0,
                duration: 1.5,
                ease: "expo.out"
            });

            // 2. Corners Slide In (From their directions)
            tl.from(tlRef.current, { x: -50, y: -50, opacity: 0, duration: 1, ease: "power3.out" }, "-=1.2");
            tl.from(trRef.current, { x: 50, y: -50, opacity: 0, duration: 1, ease: "power3.out" }, "-=1.1");
            tl.from(blRef.current, { x: -50, y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=1.0");
            tl.from(brRef.current, { x: 50, y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.9");
        },
    });

    // MOUSE TRACKING LOGIC (The Arrow)
    const handleMouseMove = (e: React.MouseEvent) => {
    if (!arrowRef.current || !container.current) return;

    const rect = container.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;

    // Normalize difference to shortest path
    let diff = angle - lastRotation.current;
    diff = ((diff + 180) % 360) - 180;

    lastRotation.current += diff;

    gsap.to(arrowRef.current, {
        rotation: lastRotation.current,
        duration: 0.4,
        ease: "power2.out",
    });
    };

    return (
        <section
            id="contact"
            ref={container}
            onMouseMove={handleMouseMove}
            className="relative w-full h-screen bg-white text-black overflow-hidden"
        >

            {/* === THE CENTERPIECE (Magnetic Arrow) === */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div ref={arrowRef} className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                    {/* Simple SVG Arrow pointing UP */}
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-full h-full stroke-[1px]"
                    >
                        <line x1="12" y1="22" x2="12" y2="2" />
                        <polyline points="5 9 12 2 19 9" />
                    </svg>
                </div>
            </div>


            {/* === TOP LEFT: CONTEXT === */}
            <div ref={tlRef} className="absolute top-22 left-0 px-6 md:px-12">
                <span className="block font-mono text-xs uppercase tracking-widest text-gray-400 mb-2">
                    ( Availability )
                </span>
                <h2 className="text-xl md:text-2xl font-medium leading-tight max-w-xs">
                    Have a project in mind? <br /> Let's build it creative.
                </h2>
            </div>


            {/* === TOP RIGHT: LOCATION === */}
            <div ref={trRef} className="absolute top-22 right-0 px-6 md:px-12 text-right">
                <span className="block font-mono text-xs uppercase tracking-widest text-gray-400 mb-2">
                    ( Location )
                </span>
                <address className="text-sm md:text-base font-medium not-italic leading-relaxed">
                    Odisha, India <br />
                    Remote friendly
                </address>
            </div>


            {/* === BOTTOM LEFT: THE ACTION (Email) === */}
            <a
                ref={blRef}
                href="mailto:hello@studio.com"
                className="group absolute bottom-0 left-0 p-6 md:p-12 z-20"
            >
                <span className="block font-mono text-xs uppercase tracking-widest text-gray-400 mb-4 group-hover:text-accent transition-colors">
                    ( Contact )
                </span>

                {/* The Text Scale Interaction */}
                <div className="flex flex-col md:-space-y-8">
                    <div className="overflow-hidden">
                        <h1 className="text-[10vw] leading-none font-bold uppercase tracking-tighter origin-bottom-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:opacity-50 group-hover:text-gray-900">
                            hello@
                        </h1>
                    </div>
                    <div className="overflow-hidden">
                        <h1 className="text-[10vw] leading-none font-bold uppercase tracking-tighter origin-top-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:opacity-50 group-hover:text-gray-900">
                            bismay.com
                        </h1>
                    </div>
                </div>
            </a>


            {/* === BOTTOM RIGHT: SOCIALS === */}
            <div ref={brRef} className="absolute bottom-0 right-0 p-6 md:p-12 text-right z-20">
                <span className="block font-mono text-xs uppercase tracking-widest text-gray-400 mb-4">
                    ( Online )
                </span>
                <div className="flex flex-col gap-2">
                    {["GitHub", "LinkedIn", "Twitter / X"].map((link) => (
                        <a
                            key={link}
                            href="#"
                            className="text-lg md:text-xl font-medium hover:text-accent hover:-translate-x-2 transition-all duration-300"
                        >
                            {link}
                        </a>
                    ))}
                </div>

                <div className="mt-12">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="font-mono text-[10px] uppercase text-gray-400 hover:text-black transition-colors"
                    >
                        Back to Top ↑
                    </button>
                </div>
            </div>

        </section>
    );
}