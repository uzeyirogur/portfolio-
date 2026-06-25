// GSAP plugin registration
// Import this file inside useGSAP or useEffect — never at server-component top level.
// registerPlugin is idempotent; calling it multiple times is safe.

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Draggable)
}

export { gsap, ScrollTrigger, Draggable }
