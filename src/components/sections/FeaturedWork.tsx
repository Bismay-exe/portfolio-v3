import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollTrigger } from "../../hooks/useScrollTrigger";

const WORKS = [
    {
        id: "01",
        client: "Uniqlo",
        project: "LifeWear 2024",
        services: "Art Direction / Web",
        year: "2024",
        img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2400&auto=format&fit=crop" // Clean retail
    },
    {
        id: "02",
        client: "Vitra",
        project: "Chair Collection",
        services: "E-Commerce / 3D",
        year: "2023",
        img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2400&auto=format&fit=crop" // Furniture
    },
    {
        id: "03",
        client: "Braun",
        project: "Less But Better",
        services: "Campaign / Motion",
        year: "2023",
        img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2400&auto=format&fit=crop" // Product
    },
    {
        id: "04",
        client: "MoMA",
        project: "Virtual Exhibit",
        services: "Creative Dev / AR",
        year: "2022",
        img: "https://images.unsplash.com/photo-1518998053901-5348d3969105?q=80&w=2400&auto=format&fit=crop" // Abstract
    }
];

export default function FeaturedWork() {
    const container = useRef<HTMLElement>(null);
    const leftCol = useRef<HTMLDivElement>(null);
    const rightCol = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

    // State to track which project is in the "sweet spot"
    const [activeIndex, setActiveIndex] = useState(0);

    useScrollTrigger({
        scope: container,
        animation: (ctx) => {
            // 1. PIN THE LEFT COLUMN
            ScrollTrigger.create({
                trigger: container.current,
                start: "top top",
                end: "bottom bottom",
                pin: leftCol.current,
                pinSpacing: false, // Right col scrolls naturally
            });

            // 2. DETECT ACTIVE SECTION ON SCROLL
            const items = ctx.selector?.(".work-item");
            items?.forEach((item: Element, i: number) => {
                ScrollTrigger.create({
                    trigger: item,
                    start: "top center", // When item hits center of viewport
                    end: "bottom center",
                    onEnter: () => setActiveIndex(i),
                    onEnterBack: () => setActiveIndex(i),
                });
            });
        },
    });

    // 3. HANDLE IMAGE SWAP ANIMATION
    useEffect(() => {
        // Reveal the new active image
        const nextImg = imageRefs.current[activeIndex];

        if (!nextImg) return;

        // Hide all images first (z-index shuffle)
        gsap.set(".work-image-container", { zIndex: 0 });
        gsap.set(nextImg, { zIndex: 10 });

        // Animate Clip Path (The "Wipe")
        gsap.fromTo(nextImg,
            { clipPath: "inset(100% 0 0 0)" }, // Hidden at bottom
            {
                clipPath: "inset(0% 0 0 0)", // Reveal up
                duration: 1,
                ease: "expo.out"
            }
        );

        // Subtle scale effect for the image inside
        const imgElement = nextImg.querySelector("img");
        if (imgElement) {
            gsap.fromTo(imgElement,
                { scale: 1.4 },
                { scale: 1, duration: 1.5, ease: "expo.out" }
            );
        }

    }, [activeIndex]);

    // Helper to store refs
    const addToImageRefs = (el: HTMLDivElement | null) => {
        if (el && !imageRefs.current.includes(el)) imageRefs.current.push(el);
    };

    return (
        <section
            id="work"
            ref={container}
            className="relative w-full min-h-screen bg-white text-black flex flex-col md:flex-row border-t border-gray-200"
        >

            {/* === LEFT COLUMN: STICKY VISUALS === */}
            {/* This stays fixed while you scroll the right side */}
            <div
                ref={leftCol}
                className="hidden md:flex w-1/2 h-screen flex-col justify-between p-12 border-r border-gray-200 sticky top-0"
            >
                {/* Top: Meta Data */}
                <div className="flex justify-between items-start z-20">
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
                        Selected Works
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-black">
                        ( 0{activeIndex + 1} / 0{WORKS.length} )
                    </span>
                </div>

                {/* Center: The Stacked Images */}
                <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                    {WORKS.map((work, i) => (
                        <div
                            key={work.id}
                            ref={addToImageRefs}
                            className="work-image-container absolute inset-0 w-full h-full bg-gray-100"
                            style={{
                                zIndex: i === 0 ? 10 : 0,
                                clipPath: i === 0 ? "inset(0%)" : "inset(100% 0 0 0)"
                            }}
                        >
                            <img
                                src={work.img}
                                alt={work.client}
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay Grid */}
                            <div className="absolute inset-0 bg-black/5 grid grid-cols-4 pointer-events-none">
                                <div className="border-r border-white/10 h-full" />
                                <div className="border-r border-white/10 h-full" />
                                <div className="border-r border-white/10 h-full" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom: Caption */}
                <div className="relative z-20 overflow-hidden mix-blend-difference text-white">
                    <h2 className="text-[4vw] leading-[0.8] font-bold tracking-tighter uppercase">
                        {WORKS[activeIndex].client}
                    </h2>
                </div>
            </div>

            {/* === RIGHT COLUMN: SCROLLABLE INDEX === */}
            <div ref={rightCol} className="w-full md:w-1/2 flex flex-col">
                {WORKS.map((work, i) => (
                    <div
                        key={work.id}
                        className={`work-item group relative w-full h-[60vh] flex flex-col justify-center px-6 md:px-12 border-b border-gray-200 transition-colors duration-500 ${i === activeIndex ? 'bg-gray-50' : 'bg-white'}`}
                        onMouseEnter={() => setActiveIndex(i)} // Desktop Hover support
                    >
                        {/* Active Indicator Line */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-accent transition-transform duration-500 ease-expo ${i === activeIndex ? 'scale-y-100' : 'scale-y-0'}`} />

                        <div className="flex flex-col gap-6">
                            {/* ID & Year */}
                            <div className="flex justify-between items-center font-mono text-xs text-gray-400">
                                <span>NO. {work.id}</span>
                                <span className={`transition-colors duration-300 ${i === activeIndex ? 'text-accent' : ''}`}>{work.year}</span>
                            </div>

                            {/* Title */}
                            <div className="overflow-hidden">
                                <h3 className={`text-5xl md:text-7xl font-bold tracking-tighter uppercase transition-transform duration-500 ${i === activeIndex ? 'translate-x-4' : 'translate-x-0'}`}>
                                    {work.client}
                                </h3>
                            </div>

                            {/* Accordion Details (Expands when active) */}
                            <div className={`overflow-hidden transition-all duration-700 ease-expo ${i === activeIndex ? 'max-h-50 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-xl md:text-2xl font-light leading-tight mb-6">
                                    {work.project}
                                </p>

                                <div className="flex gap-4">
                                    <span className="px-3 py-1 border border-gray-200 rounded-full text-xs font-mono uppercase tracking-wide">
                                        {work.services}
                                    </span>
                                    <button className="px-3 py-1 bg-black text-white rounded-full text-xs font-mono uppercase tracking-wide hover:bg-accent transition-colors">
                                        View Case Study
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}

                {/* Footer of the list */}
                <div className="w-full p-12 flex justify-center items-center">
                    <a href="#projects" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-accent hover:border-accent transition-colors">
                        View All Archives
                    </a>
                </div>
            </div>

        </section>
    );
}