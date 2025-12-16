import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

const NAV_ITEMS = [
    { label: "Featured Work", href: "#work", id: "01", img: "/images/profile2.jpg" },
    { label: "Thinking", href: "#thinking", id: "03", img: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2400" },
    { label: "Skill Stack", href: "#skillstack", id: "02", img: "https://images.unsplash.com/photo-1595166649720-6d7b425b0789?q=80&w=2400" },
    { label: "Experiments", href: "#experiments", id: "04", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2400" },
    { label: "Get in Touch", href: "#contact", id: "05", img: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2400" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeImg, setActiveImg] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLElement>(null);

    // Toggle Animation
    useEffect(() => {
        if (isOpen) {
            // OPEN: Shutter Down
            const tl = gsap.timeline();

            tl.to(menuRef.current, {
                scaleY: 1,
                duration: 1,
                ease: "expo.inOut",
                transformOrigin: "top"
            })
                .from(".nav-link", {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                }, "-=0.4")
                .from(".nav-line", {
                    scaleX: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "expo.out",
                }, "-=1.0");

            // Hide scroll
            document.body.style.overflow = "hidden";

        } else {
            // CLOSE: Shutter Up
            gsap.to(menuRef.current, {
                scaleY: 0,
                duration: 0.8,
                ease: "expo.inOut",
                transformOrigin: "top"
            });
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    return (
        <>
            {/* === THE HUD BAR (Always Visible) === */}
            <header
                ref={headerRef}
                className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-8 mix-blend-difference text-white"
            >
                <div className="flex justify-between items-center">

                    {/* LOGO */}
                    <a href="/" className="font-bold text-lg uppercase tracking-tighter">
                        Bismay ©
                    </a>

                    {/* CENTER DATA (Desktop) */}
                    <div className="hidden md:flex gap-12 font-mono text-xs uppercase tracking-widest opacity-80">
                        <span>Odisha, In</span>
                        <span>19.21° N, 85.76° E</span>
                    </div>

                    {/* MENU TRIGGER */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="group flex gap-2 items-center"
                    >
                        <span className="font-mono text-xs uppercase tracking-widest group-hover:opacity-50 transition-opacity">
                            {isOpen ? "Close" : "Menu"}
                        </span>
                        <div className={`w-2 h-2 bg-white rounded-full transition-transform duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`} />
                    </button>

                </div>
            </header>


            {/* === THE FULLSCREEN MENU OVERLAY === */}
            <div
                ref={menuRef}
                className="fixed inset-0 z-40 px-6 md:px-12 py-8 bg-[#111] text-[#EAEAEA] w-screen h-screen origin-top transform scale-y-0"
            >
                {/* BACKGROUND PREVIEW IMAGE */}
                <div className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-500">
                    {activeImg && (
                        <img
                            src={activeImg}
                            alt=""
                            className="w-full h-full object-cover grayscale"
                        />
                    )}
                </div>

                {/* MENU CONTENT */}
                <div className="relative z-10 w-screen h-screen flex flex-col">

                    <div className="flex flex-col justify-center h-full">
                        {NAV_ITEMS.map((item) => (
                            <div
                                key={item.id}
                                className="group w-full border-t border-white/20 hover:border-white transition-colors duration-300"
                                onMouseEnter={() => setActiveImg(item.img)}
                                onMouseLeave={() => setActiveImg(null)}
                            >
                                {/* The Link Row */}
                                <a
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="nav-link w-screen py-8 md:py-12 flex flex-col md:flex-row justify-between items-baseline"
                                >
                                    {/* ID */}
                                    <span className="font-mono text-xs md:text-sm text-gray-500 group-hover:text-accent transition-colors">
                                        ({item.id})
                                    </span>

                                    {/* Label */}
                                    <span className="text-5xl md:text-7xl font-bold uppercase tracking-tighter transition-transform duration-500 group-hover:translate-x-4">
                                        {item.label}
                                    </span>

                                    {/* Arrow */}
                                    <span className="hidden md:block text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        ↗
                                    </span>
                                </a>
                            </div>
                        ))}
                        {/* Bottom Line */}
                        <div className="nav-line w-full h-px bg-white/20" />
                    </div>

                </div>
            </div>
        </>
    );
}