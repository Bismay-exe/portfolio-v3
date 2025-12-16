import { useLayoutEffect, useEffect } from "react";

// Solves the "useLayoutEffect does nothing on the server" warning in Next.js/SSR
const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;