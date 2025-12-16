"use client";


import useIsomorphicLayoutEffect from "./hooks/useIsomorphicLayoutEffect";



import Contact from "./components/sections/Contact";
import Experiments from "./components/sections/Experiments";

import Hero from "./components/sections/Hero";
import Header from "./components/layout/Header";
import Thinking from "./components/sections/Thinking";
import SkillStack from "./components/sections/SkillStack";
import FeaturedWork from "./components/sections/FeaturedWork";



export default function App() {

  useIsomorphicLayoutEffect(() => {

    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-white w-full min-h-screen">
      <Header />
      <Hero />
      <FeaturedWork />
      <Thinking />
      <SkillStack />
      <Experiments />
      <Contact />
    </main>
  );
}