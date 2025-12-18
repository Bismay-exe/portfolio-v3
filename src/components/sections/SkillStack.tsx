import { useRef } from "react";
import gsap from "gsap";
import { useScrollTrigger } from "../../hooks/useScrollTrigger";

const SLIDES = [
    {
        id: "01",
        category: "Core Web",
        tags: ["HTML", "CSS", "JavaScript"],
        desc: "Building clean, semantic foundations that prioritize accessibility, structure, and long-term maintainability."
    },
    {
        id: "02",
        category: "Frontend & Frameworks",
        tags: ["React.js", "Next.js", "Tailwind CSS"],
        desc: "Developing scalable interfaces with clear state flow, reusable components, and predictable layouts."
    },
    {
        id: "03",
        category: "Motion & Interaction",
        tags: ["GSAP", "Three.js"],
        desc: "Using motion to communicate hierarchy and intent, not decoration — every animation serves a purpose."
    },
    {
        id: "04",
        category: "Backend & Data",
        tags: ["Node.js", "MongoDB", "Firebase"],
        desc: "Handling data, authentication, and server-side logic with simplicity and performance in mind."
    },
    {
        id: "05",
        category: "Programming Logic",
        tags: ["Python"],
        desc: "Applying structured thinking and problem-solving skills beyond the browser when required."
    },
    {
        id: "06",
        category: "Design & Visual Tools",
        tags: [
            "Figma",
            "Affinity Suite",
            "Adobe Photoshop",
            "Adobe Illustrator",
            "Blender"
        ],
        desc: "Translating visual ideas into precise, buildable interfaces with strong attention to detail."
    }
];


export default function SkillStack() {
    const container = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const progressRef = useRef<HTMLDivElement>(null);

    useScrollTrigger({
        scope: container,
        animation: () => {
            if (!container.current) return;

            const scrollDistance = window.innerHeight * (SLIDES.length - 1);

            const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: `+=${scrollDistance}`,
                pin: true,
                scrub: 1,
                onUpdate: (self) => {
                // Progress bar fill
                if (progressRef.current) {
                    gsap.to(progressRef.current, {
                    scaleY: self.progress,
                    ease: "none",
                    overwrite: true
                    });
                }}
            }
        });

            // Animate each card (except the first one, which is already there)
            cardsRef.current.forEach((card, i) => {
                if (i === 0) return; // Skip first card

                const prevCard = cardsRef.current[i - 1];

                // 1. Slide the new card UP
                tl.fromTo(card,
                    { yPercent: 100, rotateX: -5 }, // Start below, slightly tilted
                    { yPercent: 0, rotateX: 0, ease: "none", duration: 1 },
                    i - 1 // Start at the previous index time
                );

                // 2. Scale the previous card DOWN (Depth Effect)
                if (prevCard) {
                    tl.to(prevCard, {
                        scale: 0.95,
                        transformOrigin: "center top",
                        ease: "none",
                        duration: 1
                    }, i - 1); // Run simultaneously
                }

                // 3. Text Reveal inside the card (Parallax)
                const textContent = card?.querySelectorAll(".card-anim");
                if (textContent) {
                    tl.from(textContent, {
                        y: 50,
                        opacity: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "power2.out"
                    }, i - 1 + 0.3); // Start slightly after card begins moving
                }
            });
        }
    });

    // Helper
    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
    };

    return (
        <section
            id="skillstack"
            ref={container}
            className="relative w-full h-screen bg-[#111] text-black overflow-hidden"
        >
            {/* GLOBAL PROGRESS INDICATOR */}
            <div className="fixed top-0 left-0 w-screen h-screen p-13 z-50 hidden md:flex justify-end items-center mix-blend-difference text-white pointer-events-none">

                {/* Progress Track */}
                <div className="relative w-1 h-32 rounded-full bg-white/20 overflow-hidden">
                    <div
                    ref={progressRef}
                    className="absolute bottom-0 left-0 w-full h-full bg-white origin-bottom scale-y-0"
                    />
                </div>

            </div>


            {/* THE CARD STACK */}
            <div className="relative w-full h-full"> {/* Padding Left for sidebar */}

                {SLIDES.map((slide, i) => (
                    <div
                        key={slide.id}
                        ref={addToRefs}
                        className="absolute inset-0 w-full h-full flex flex-col justify-center px-6 md:px-12 origin-top will-change-transform"
                        style={{
                            zIndex: i + 1,
                            backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#F4F4F4' // Subtle alternation
                        }}
                    >
                        {/* SWISS GRID LINES ON CARD */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="w-full h-px bg-black/10 absolute bottom-12 left-0" />
                            <div className="w-px h-full bg-black/10 absolute left-1/2 top-0 hidden md:block" />
                        </div>

                        {/* CARD CONTENT */}
                        <div className="relative z-10 w-full md:px-14 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                            {/* Left: Giant Typography */}
                            <div className="flex flex-col justify-center">
                                <div className="card-anim overflow-hidden">
                                    <span className="block font-mono text-xs uppercase tracking-widest text-accent mb-4">
                                        ( {slide.id} )
                                    </span>
                                </div>
                                <div className="card-anim overflow-hidden">
                                    <h2 className="text-[12vw] md:text-[8vw] leading-[0.85] font-bold uppercase tracking-tighter text-black">
                                        {slide.category}
                                    </h2>
                                </div>
                            </div>

                            {/* Right: Technical Details */}
                            <div className="flex flex-col justify-center h-full pt-12 md:pt-0">
                                <p className="card-anim text-2xl md:text-4xl font-light leading-tight mb-12 max-w-md">
                                    {slide.desc}
                                </p>

                                <div className="card-anim border-t border-black pt-6">
                                    <span className="font-mono text-xs uppercase tracking-widest text-gray-400 block mb-4">
                                        Tech Stack
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {slide.tags.map((tag) => (
                                            <span key={tag} className="px-3 py-1 border border-black rounded-full text-xs font-mono uppercase hover:bg-black hover:text-white transition-colors cursor-default">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Decorative Footer on Card */}
                        <div className="absolute bottom-4 left-6 md:left-12 right-6 md:right-12 flex justify-between font-mono text-[10px] uppercase text-gray-400">
                            <span>Index: {slide.id}</span>
                            <span>Scroll to proceed ↓</span>
                        </div>

                    </div>
                ))}

            </div>
        </section>
    );
}