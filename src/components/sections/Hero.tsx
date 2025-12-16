import { useRef } from "react";
import gsap from "gsap";
import { useScrollTrigger } from "../../hooks/useScrollTrigger";

export default function Hero() {
    const container = useRef<HTMLElement>(null);
    const centerMask = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useScrollTrigger({
        scope: container,
        animation: () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "+=2000", // Long scroll distance for control
                    pin: true,     // Pin the entire section
                    scrub: 1,      // Smooth scrubbing
                    anticipatePin: 1,
                }
            });

            // 1. INTRO ANIMATION (Auto-play on load)
            // Words slide up, Center image scales in
            const introTl = gsap.timeline();
            introTl
                .from(".hero-word", { yPercent: 120, duration: 1.5, ease: "expo.out", stagger: 0.1 })
                .from(centerMask.current, { scale: 0, duration: 1.5, ease: "expo.out" }, "<");

            // 2. SCROLL INTERACTION (The Expansion)

            // Step A: Expand the center Mask to full screen
            tl.to(centerMask.current, {
                width: "100vw",
                height: "100vh",
                borderRadius: "0px", // Go from rounded to sharp
                ease: "power2.inOut",
                duration: 1
            });

            // Step B: Parallax the text AWAY from center
            // Top text goes up, Bottom text goes down
            tl.to(".hero-top", { yPercent: -50, opacity: 0, duration: 0.5 }, 0);
            tl.to(".hero-bottom", { yPercent: 50, opacity: 0, duration: 0.5 }, 0);

            // Step C: Scale the video INSIDE the mask (Counter-scale)
            // This creates the illusion that the window is opening, but the video is stationary
            tl.fromTo(videoRef.current,
                { scale: 1.5 },
                { scale: 1, ease: "power2.inOut", duration: 1 },
                0
            );

            // Step D: Reveal the "Enter" button at the end
            tl.fromTo(".hero-enter",
                { autoAlpha: 0, y: 20 },
                { autoAlpha: 1, y: 0, duration: 0.2 },
                ">-0.2"
            );
        },
    });

    return (
        <section
            ref={container}
            className="relative w-full h-screen bg-[#EAEAEA] text-[#050505] overflow-hidden flex flex-col items-center justify-center"
        >
            {/* === TOP TYPOGRAPHY === */}
            <div className="hero-top absolute top-[10vh] w-full px-12 flex justify-between items-end z-10 mix-blend-difference text-[#EAEAEA]">
                <div className="overflow-hidden">
                    <h1 className="hero-word text-[10vw] leading-none font-bold md:tracking-[-10px] uppercase">
                        Frontend{"ㅤ"} {/* === INVISIBLE TEXT === */}
                    </h1>
                </div>
                <div className="overflow-hidden hidden md:block">
                    <p className="hero-word font-mono text-xs max-w-37.5 text-right">
                        ( Personal Work ) <br />
                        Motion-Driven <br />
                        Interface Engineering
                    </p>
                </div>
            </div>

            {/* === CENTER EXPANDING APERTURE === */}
            {/* Starts small, expands to fill screen on scroll */}
            <div
                ref={centerMask}
                className="relative z-20 w-[30vw] h-[30vw] md:w-[25vw] md:h-[35vh] overflow-hidden rounded-none shadow-2xl"
            >
                <div className="absolute inset-0 bg-black/10 z-10" /> {/* Overlay for contrast */}

                {/* The Content (Video or Image) */}
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    src="https://cdn.coverr.co/videos/coverr-abstract-architecture-in-minimalist-style-5347/1080p.mp4"
                    /* Fallback image if video fails */
                    poster="/images/profile2.jpg"
                />

                {/* Floating Caption inside the mask */}
                <div className="absolute bottom-6 left-6 z-20 text-white font-mono text-xs uppercase tracking-widest">
                    Fig. 01 — Bismay
                </div>
            </div>

            {/* === BOTTOM TYPOGRAPHY === */}
            <div className="hero-bottom absolute bottom-[10vh] w-full px-12 flex justify-between items-start z-10 mix-blend-difference text-[#EAEAEA]">
                <div className="overflow-hidden hidden md:block">
                    <div className="hero-word flex gap-4 items-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="font-mono text-xs uppercase">Scroll to Explore</span>
                    </div>
                </div>
                <div className="overflow-hidden">
                    <h1 className="hero-word text-[10vw] leading-none font-bold md:tracking-[-10px] uppercase text-right">
                        Developer
                    </h1>
                </div>
            </div>

            {/* === FINAL REVEAL CONTENT (Appears when expanded) === */}
            <div className="hero-enter absolute bottom-12 left-1/2 -translate-x-1/2 z-30 text-white flex flex-col items-center gap-2 opacity-0">
                <span className="text-xs font-bold uppercase tracking-widest">Enter Portfolio</span>
                <div className="w-px h-12 bg-white/50" />
            </div>

            {/* === DECORATIVE GRID LINES (Fixed in background) === */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 px-12">
                <div className="w-full h-px bg-[#ccc] absolute top-[50%] left-0" />
            </div>

        </section>
    );
}