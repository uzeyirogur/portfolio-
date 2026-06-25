---
name: design-critic
description: Run this after every major UI change to evaluate whether the result is actually premium, creative, and visually strong — not generic AI-template output.
metadata:
  type: skill
---

# Design Critic — Quality Gate

After every major UI redesign, run through this checklist before reporting the task as done.

## The 9 Checks

1. **First-3-second impact** — Does the section make a strong impression immediately? If someone screenshots it, would it look like a premium portfolio or a default template?

2. **Generic AI smell** — Does it look like the output of "make me a portfolio website" with no personality? Red flags: purple gradient blobs, Inter font everywhere, gray card grid, white background with subtle drop shadows on every card.

3. **Right side of hero** — Is it intentionally designed with depth/motion, or just filler? Empty / logo carousel / stock art = fail.

4. **Computer engineering theme** — Does the visual language reference code, systems, architecture, databases, APIs, or data flow? Or is it generic "tech startup" look?

5. **Motion quality** — Is animation meaningful (reveals, parallax, depth, flow) or just `opacity: 0 → 1` fade-in on every element?

6. **Project showcase** — Are the project cards product-focused case studies or basic thumbnail + title + description cards?

7. **Premium feel** — Does spacing, typography weight, contrast, and visual hierarchy feel intentional? Or does it feel like default Tailwind CSS?

8. **Mobile** — Does the design degrade gracefully, or does the layout break / look wrong on small screens?

9. **Non-repetition** — About section should NOT repeat skills (Skills section is right below). Each section must tell a different story.

## Fail Conditions

If any of these are true, do NOT mark the task complete:

- Right side of hero is empty or has a generic image
- About section is a 2-column card grid with skill tags (already in Skills section)
- Project cards are identical-looking rectangles with placeholder icons
- The site looks like a Bootstrap/Tailwind template from 2019
- No real animation beyond fade-in

## Pass Conditions

- A developer would want to share this site because it looks impressive
- The visual theme clearly communicates "Full Stack .NET Developer who also does AI"
- Motion feels intentional and enhances the storytelling
- Each section has a unique visual identity — not the same card treatment everywhere
