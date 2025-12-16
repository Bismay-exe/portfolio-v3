import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollTrigger } from "../../hooks/useScrollTrigger";

const MANIFESTO = [
    {
        id: "01",
        title: "Reduction",
        text: "I remove the [unnecessary] to reveal the [essential]. Design is not about decoration, but about [clarity] of thought.",
        highlight: ["unnecessary", "essential", "clarity"]
    },
    {
        id: "02",
        title: "System",
        text: "Chaos is a failure of [structure]. I build strict [grids] so creativity can operate with intent. The right [rules] create freedom.",
        highlight: ["structure", "grids", "rules"]
    },
    {
        id: "03",
        title: "Motion",
        text: "Static interfaces are [dead]. Systems must [breathe] and respond. Thoughtful [interaction] creates trust without instruction.",
        highlight: ["dead", "breathe", "interaction"]
    },
    {
        id: "04",
        title: "Performance",
        text: "Speed is not a feature — it is a [baseline]. Every animation must justify its [cost]. Smoothness means nothing without efficiency.",
        highlight: ["baseline", "cost"]
    },
    {
        id: "05",
        title: "Intent",
        text: "Nothing exists by accident. Every pixel has a [reason]. Every transition has a [purpose]. Intent separates design from noise.",
        highlight: ["reason", "purpose"]
    },
    {
        id: "06",
        title: "Restraint",
        text: "Not everything deserves attention. I use [contrast] sparingly and motion with [discipline]. Silence is a design tool.",
        highlight: ["contrast", "discipline"]
    },
    {
        id: "07",
        title: "Engineering",
        text: "Visual quality collapses without [structure]. Clean [architecture] enables scale, refactoring, and long-term confidence.",
        highlight: ["structure", "architecture"]
    },
    {
        id: "08",
        title: "User",
        text: "This work is not for applause. It is for [people]. I reduce friction, lower [cognitive load], and respect attention.",
        highlight: ["people", "cognitive load"]
    },
    {
        id: "09",
        title: "Consistency",
        text: "Consistency is not repetition — it is [logic]. Predictable systems build [trust] and disappear into use.",
        highlight: ["logic", "trust"]
    },
    {
        id: "10",
        title: "Longevity",
        text: "Trends expire. Principles endure. I build for [time], not novelty — systems meant to remain useful beyond launch.",
        highlight: ["time"]
    }
];



export default function Thinking() {
    const container = useRef<HTMLElement>(null);
    const leftCol = useRef<HTMLDivElement>(null);

    useScrollTrigger({
        scope: container,
        animation: (ctx) => {
            // 1. STICKY SIDEBAR
            ScrollTrigger.create({
                trigger: container.current,
                start: "top top",
                end: "bottom bottom",
                pin: leftCol.current,
            });

            // 2. THE REDACTION REVEAL
            // We select all ".redaction-bar" elements
            const bars = ctx.selector?.(".redaction-bar");

            bars?.forEach((bar: HTMLElement) => {
                gsap.to(bar, {
                    scaleX: 0, // Shrink width to 0
                    transformOrigin: "right center", // Shrink towards the right
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: bar,
                        start: "top 85%", // Start revealing when near bottom of screen
                        end: "top 60%",   // Fully revealed by center
                        scrub: true,      // Tie animation to scroll position
                    }
                });
            });

            // 3. CHAPTER ACTIVATION
            // Light up the sidebar numbers as we pass sections
            const sections = ctx.selector?.(".manifesto-item");
            sections?.forEach((section: HTMLElement, i: number) => {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top center",
                    end: "bottom center",
                    onToggle: (self) => {
                        if (self.isActive) {
                            gsap.to(`.sidebar-item-${i}`, { opacity: 1, x: 10, color: "#000", duration: 0.3 });
                        } else {
                            gsap.to(`.sidebar-item-${i}`, { opacity: 0.3, x: 0, color: "#000", duration: 0.3 });
                        }
                    }
                });
            });
        }
    });

    // Helper function to wrap highlighted words in the Redaction markup
    const renderText = (text: string, highlights: string[]) => {
        // Split text by brackets [] to find highlighted words
        // Input: "We remove the [unnecessary]..."
        const parts = text.split(/\[(.*?)\]/g);

        return parts.map((part, i) => {
            if (highlights.includes(part)) {
                return (
                    <span key={i} className="relative inline-block mx-1">
                        <span className="relative z-10 text-black">{part}</span>
                        {/* The Black Bar that covers the text */}
                        <span className="redaction-bar absolute inset-0 bg-black z-20" />
                    </span>
                );
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <section
            id="thinking"
            ref={container}
            className="relative w-full bg-white text-black border-t border-gray-200"
        >
            <div className="flex flex-col md:flex-row max-w-[100vw]">

                {/* === LEFT COLUMN: THE INDEX (Sticky) === */}
                <div
                    ref={leftCol}
                    className="hidden md:flex w-[20vw] h-screen flex-col justify-between p-12 border-r border-gray-200"
                >
                    {/* Header */}
                        <h2 className="font-mono text-xs uppercase tracking-widest text-gray-400 py-32">
                            ( Philosophy )
                        </h2>
                    <div>
                        <div className="flex flex-col justify-center gap-4">
                            {MANIFESTO.map((item, i) => (
                                <div
                                    key={item.id}
                                    className={`sidebar-item-${i} flex items-center gap-4 opacity-30 transition-all font-mono text-sm`}
                                >
                                    <span className="text-xs">0{i + 1}</span>
                                    <span className="uppercase tracking-widest">{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Decoration */}
                    <div className="w-full">
                        <div className="w-full bg-gray-200 mb-4" />
                        <div className="flex justify-between font-mono text-[10px] text-gray-400 uppercase pt-64">
                            <span>EST. 2025</span>
                            <span>READ TIME: 4 MIN</span>
                        </div>
                    </div>
                </div>

                {/* === RIGHT COLUMN: THE MANIFESTO (Scroll) === */}
                <div className="w-full md:w-[70vw] px-6 md:px-24 py-24 md:py-0">
                    {MANIFESTO.map((item, i) => (
                        <div
                            key={item.id}
                            className="manifesto-item min-h-[80vh] flex flex-col justify-center border-b border-gray-100 last:border-none py-12"
                        >
                            {/* Mobile Chapter Title */}
                            <div className="md:hidden font-mono text-xs text-accent mb-4">
                                0{i + 1} / {item.title.toUpperCase()}
                            </div>

                            {/* The Text Block */}
                            <div className="max-w-4xl">
                                <p className="text-4xl md:text-7xl font-bold leading-[1.1] tracking-tight">
                                    {renderText(item.text, item.highlight)}
                                </p>
                            </div>

                            {/* Technical Annotations (Appear on hover or active) */}
                            <div className="mt-12 flex gap-8">
                                <div className="flex flex-col gap-2">
                                    <span className="w-8 h-px bg-black" />
                                    <span className="font-mono text-xs text-gray-500 uppercase">
                                        Fig. 1.{i + 1}
                                    </span>
                                </div>
                                <div className="max-w-xs font-mono text-xs text-gray-500 leading-relaxed">
                                    Logic dictates form. I do not design for the sake of aesthetics alone. Every pixel must earn its place on the screen.
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* FINAL CTA AREA */}
                    <div className="min-h-[50vh] flex flex-col justify-center items-center text-center">
                        <div className="overflow-hidden">
                            <h3 className="text-2xl font-light mb-8">Ready to build your system?</h3>
                        </div>
                        <a
                            href="#contact"
                            className="group relative inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-full overflow-hidden"
                        >
                            <span className="relative z-10 font-bold uppercase tracking-widest text-xs group-hover:text-black transition-colors">
                                Start Project
                            </span>
                            <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-expo" />
                        </a>
                    </div>

                </div>

            </div>
        </section>
    );
}