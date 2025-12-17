"use client"

import { useIsomorphicLayoutEffect } from "framer-motion";
import Header from "./components/layout/Header";
import Preloader from "./components/layout/Preloader";
import Contact from "./components/sections/Contact";
import Experiments from "./components/sections/Experiments";
import FeaturedWork from "./components/sections/FeaturedWork";
import Hero from "./components/sections/Hero";
import SkillStack from "./components/sections/SkillStack";
import Thinking from "./components/sections/Thinking";

export default function App() {

  useIsomorphicLayoutEffect(() => {

    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-white w-full min-h-screen">
      <Preloader onComplete={() => { }} />
        <Header />
        <Hero />
        <FeaturedWork />
        <Thinking />
        <SkillStack />
        <Experiments />
    </main>
  );
}