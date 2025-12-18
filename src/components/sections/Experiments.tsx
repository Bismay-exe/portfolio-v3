import { useRef } from "react";
import gsap from "gsap";
import { useScrollTrigger } from "../../hooks/useScrollTrigger";

const EXPERIMENTS = [
    {
        id: "001",
        name: "Liquid Metal",
        type: "WebGL Shader",
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600",
        x: -25, y: -15
    },
    {
        id: "002",
        name: "Cloth Sim",
        type: "Physics Engine",
        img: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1600",
        x: 30, y: 10
    },
    {
        id: "003",
        name: "Raymarcher",
        type: "SDF Geometry",
        img: "https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=1600",
        x: -15, y: 30
    },
    {
        id: "004",
        name: "Audio Viz",
        type: "Frequency Data",
        img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1600",
        x: 20, y: -25
    },
    {
        id: "005",
        name: "Particles",
        type: "Instanced Mesh",
        img: "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?q=80&w=1600",
        x: -35, y: 5
    },
    {
        id: "006",
        name: "Voronoi",
        type: "Cellular Noise",
        img: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=1600",
        x: 35, y: 20
    },
    {
        id: "007",
        name: "Glitch Pass",
        type: "Post-Processing",
        img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600",
        x: 0, y: -35
    },
    {
        id: "008",
        name: "Fluid Grid",
        type: "Flow Fields",
        img: "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?q=80&w=1600",
        x: -25, y: 25
    },
    {
        id: "009",
        name: "Reaction Diffusion",
        type: "Compute Shader",
        img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600",
        x: 25, y: -10
    },
    {
        id: "010",
        name: "Iso Surface",
        type: "Marching Cubes",
        img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600",
        x: -10, y: -20
    },
    {
        id: "011",
        name: "Soft Body",
        type: "Verlet Integration",
        img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600",
        x: 15, y: 35
    },
    {
        id: "012",
        name: "Attractors",
        type: "Chaos Theory",
        img: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1600",
        x: -30, y: 0
    },
    {
        id: "013",
        name: "Neural Net",
        type: "TensorFlow.js",
        img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600",
        x: 20, y: 20
    },
    {
        id: "014",
        name: "Pixel Sort",
        type: "Algorithmic Art",
        img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600",
        x: -20, y: -30
    },
    {
        id: "015",
        name: "Volumetrics",
        type: "Cloud Shader",
        img: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?q=80&w=1600",
        x: 30, y: -5
    }
];




export default function Experiments() {
    const container = useRef<HTMLElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useScrollTrigger({
        scope: container,
        animation: () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "+=4000", // Long scroll for deep tunnel feel
                    pin: true,
                    scrub: 1,
                }
            });

            // Animate each item from "Deep" (Scale 0) to "Past Camera" (Scale 5)
            itemsRef.current.forEach((item, i) => {
                // Stagger the start times so they don't all come at once
                const startTime = i * 0.5;

                tl.fromTo(item,
                    {
                        scale: 0,
                        opacity: 0,
                        zIndex: i
                    },
                    {
                        scale: 2,     // Explode past viewer
                        opacity: 1,   // Fade in then out handled below
                        duration: 2,
                        ease: "power1.in", // Accel as it gets closer
                    },
                    startTime
                );

                // Fade out as it passes camera (last 10% of animation)
                tl.to(item, { opacity: 0, duration: 0.5 }, startTime + 1.5);
            });

            // Rotate the crosshair based on scroll
            tl.to(".center-cross", { rotate: 360, duration: 9, ease: "none" }, 0);
        },
    });

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !itemsRef.current.includes(el)) itemsRef.current.push(el);
    };

    return (
        <section
            id="experiments"
            ref={container}
            className="relative w-full h-screen bg-[#050505] text-[#EAEAEA] overflow-hidden flex items-center justify-center perspective-1000"
        >

            {/* === THE STATIC HUD LAYER (Stays on top) === */}
            <div className="absolute inset-0 pointer-events-none z-50 flex flex-col justify-between p-6 md:p-12 mix-blend-difference">
                {/* Header */}
                <div className="flex justify-between items-start md:border-t border-white/20 mt-6 pt-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
                        ( Archive )
                    </span>
                    <span className="font-mono text-xs uppercase text-white">
                        Z-Axis Navigation
                    </span>
                </div>

                {/* Center Target */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 border border-white/10 rounded-full flex items-center justify-center center-cross">
                    <div className="w-full h-px bg-white/10" />
                    <div className="h-full w-px bg-white/10 absolute" />
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end border-b border-white/20 pb-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
                        Total Logs: {EXPERIMENTS.length}
                    </span>
                    <span className="font-mono text-xs uppercase text-white animate-pulse">
                        ● Live
                    </span>
                </div>
            </div>


            {/* === THE TUNNEL ITEMS === */}
            <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
                {EXPERIMENTS.map((exp) => (
                    <div
                        key={exp.id}
                        ref={addToRefs}
                        className="absolute flex flex-col items-center justify-center"
                        style={{
                            // Offset them from center so they don't block the view perfectly
                            transform: `translate(${exp.x}vw, ${exp.y}vh)`,
                        }}
                    >
                        {/* The Slide Card */}
                        <div className="relative w-[40vw] md:w-[20vw] aspect-4/3 bg-black border border-white/20 p-2">

                            {/* Image */}
                            <div className="w-full h-full overflow-hidden relative grayscale">
                                <img src={exp.img} alt={exp.name} className="w-full h-full object-cover" />
                                {/* Overlay Scanlines */}
                                <div className="absolute inset-0 bg-size-[100%_4px]" />
                            </div>

                            {/* Label (Attached to the card) */}
                            <div className="absolute -bottom-8 left-0 w-max">
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-[8px] md:text-[10px] bg-white text-black px-1">
                                        {exp.id}
                                    </span>
                                    <span className="font-bold text-xs md:text-sm uppercase tracking-tight">
                                        {exp.name}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}