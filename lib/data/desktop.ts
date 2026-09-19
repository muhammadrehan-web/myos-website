import type { DesktopIcon, MovieCard, ResourceLink, WindowLayout } from "@/lib/types";

export const DESKTOP_ICONS: DesktopIcon[] = [
  { id: "framer", className: "i-framer", label: "Framer", src: "/assets/img/mZqGpzVPfXwbNcjhjFyqOoyYY.png", open: "external", url: "https://www.framer.com/@talha-uxd/" },
  { id: "music", className: "i-music", label: "Music", src: "/assets/img/S2dPCIKpWlDgRhbT7ZLDwM2v9s.png", open: "ipod" },
  { id: "resume", className: "i-resume", label: "Resume", src: "/assets/img/lMVci5SNdljIQS4LiI3djqZLQk.png", open: "resume" },
  { id: "veyra", className: "i-veyra", label: "Veyra", src: "/assets/img/uy87JonjAVE23J7z8J81GA0A0U.png", open: "projects", project: "veyra" },
  { id: "figma", className: "i-figma", label: "Figma", src: "/assets/img/Fa7Ks6pz00sczkXCYO8Qmz7GPA.png", open: "external", url: "https://www.figma.com" },
  { id: "sorae", className: "i-sorae", label: "Sorae", src: "/assets/img/xybTQ8M8gQkUOzQ57Horl5riXsc.png", open: "projects", project: "sorae" },
  { id: "laver", className: "i-laver", label: "Laver", src: "/assets/img/oPWqkM4Rtq6IW8rAis6I2SC7CfE.png", open: "projects", project: "laver" },
  { id: "atria", className: "i-atria", label: "Atria", src: "/assets/img/qy5LwBcw9X277bvPo6OZEanrtdY.png", open: "projects", project: "atria" },
  { id: "plinq", className: "i-plinq", label: "Plinq", src: "/assets/img/HcRlNxppO9AMHI0KhcKJtc3wvO0.png", open: "projects", project: "plinq" },
  { id: "nuvio", className: "i-nuvio", label: "Nuvio", src: "/assets/img/BL7zv9EGej7d1dYE5rLEhB911pI.png", open: "projects", project: "nuvio" },
  { id: "about", className: "i-about", label: "About Me", src: "/assets/img/mpLoZ8OywwyBRHZrb96PxvZ1Is.png", open: "about" },
  { id: "interstellar", className: "i-interstellar", label: "Interstellar", src: "/assets/img/PWuUiO2aouvctH4NNK1MNPe9o.png", open: "movies" },
  { id: "game", className: "i-game wide", label: "Herding cats", src: "/assets/img/NBs3etFTadPxbSVNjpbB56GouU.png", open: "game", wide: true },
  { id: "resources", className: "i-resources", label: "Resources", src: "/assets/img/dNUl2Ob68CbdwU9wmtjvGraRyk.png", open: "resources" },
];

export const DOCK_ITEMS = [
  { open: "about" as const, tip: "About", src: "/assets/img/1X4pnmera790LOPkPTTP1zyOcJI.png" },
  { open: "projects" as const, tip: "Projects", src: "/assets/img/oiUFcFGXTqeEgrYrOAetMoYs0.png" },
  { open: "gallery" as const, tip: "Gallery", src: "/assets/img/3KAjwFg3Vs6OQWKEepih5JnMoo.png" },
  { open: "reel" as const, tip: "Reel", src: "/assets/img/aTak0a7zFvo2sb8xgwbBVmgxq4.png" },
  { open: "contact" as const, tip: "Contact", src: "/assets/img/czNCmarMvIpvhboxeEDI8G2qrU.png", badge: "1" },
];

export const WINDOW_LAYOUTS: WindowLayout[] = [
  { id: "about", x: 55, y: 2 },
  { id: "projects", x: 324, y: 135 },
  { id: "gallery", x: 304, y: 118 },
  { id: "reel", x: 100, y: 119 },
  { id: "contact", x: 340, y: 118, narrow: true },
  { id: "resume", x: 547, y: 55, narrow: true, extraClass: "resume" },
  { id: "resources", x: 422, y: 135, narrow: true },
  { id: "movies", x: 386, y: 135 },
];

export const GALLERY = [
  { src: "/assets/img/rpHSunPVVu1XAUeDZ3pRRhFCuxg.png", alt: "Palmé" },
  { src: "/assets/img/djhJMkCA9g7SYVna9s8voBpQ.png", alt: "Club Sol" },
  { src: "/assets/img/5lyoReJJbT7nSdhUNFlcI3S6qk.png", alt: "Espresso" },
  { src: "/assets/img/FSt2DFHxkOfTIEO54wG88PqMqo.png", alt: "Tennis" },
  { src: "/assets/img/F1tcMrodVxAaobV9cySMUlgKcY.png", alt: "Ocean" },
  { src: "/assets/img/h2QQZowFkI1BAiEkr2sbbYN57b8.png", alt: "Melville" },
];

export const MOVIES: MovieCard[] = [
  { title: "Interstellar", img: "/assets/img/dxzK2DcICODtYz6Y9iJ35RvwUmg.png", genre: "Sci-Fi • Adventure", year: "2014" },
  { title: "Severance", img: "/assets/img/SyqI8djWrUYnfSGNLetgGF9suiA.png", genre: "Sci-Fi • Mystery", year: "2002" },
  { title: "Spider-Verse", img: "/assets/img/IsZKpTEakU0Y7yEHWW2IuPwqaGI.png", genre: "Animation • Action", year: "2018" },
  { title: "The Dark Night", img: "/assets/img/VmJJ54KaLLdPQ08GicULe6KBI.png", genre: "Action • Crime", year: "2008" },
  {
    title: "Breaking Bad",
    img: "/assets/img/UMVXQx5THCNxzcEG66wcvuJ1zvU.png",
    genre: "Crime • Drama",
    year: "2008",
    gem: "★ Hidden Gem",
    quote: "“The definition of perfect storytelling.”",
  },
  { title: "The Bear", img: "/assets/img/2pNp8igFHQQ9zk5erMJdLTZeKg.png", genre: "Comedy • Drama", year: "2022" },
];

export const RESOURCES: ResourceLink[] = [
  { label: "F University", href: "https://www.framer.com/academy", img: "/assets/img/ivkHkH1OVxe7Y3M9G6MFEOlpoI.png" },
  { label: "Lucid Icons", href: "https://lucide.dev", img: "/assets/img/1qvuKxFW53ilv6MzO5iF2rqkuA.png" },
  { label: "Shapes Gallery", href: "https://shapes.framer.website", img: "/assets/img/718cstFZ8jnqtjMobHMpAqxKC0.png" },
  { label: "Rive", href: "https://rive.app", img: "/assets/img/TSz3ChM096h7eAE999wqWvMztY.png" },
  { label: "Fonts Ninja", href: "https://www.fontsquirrel.com", img: "/assets/img/E3oWCwDwxDGd5R4qwIVHzes1ogc.png" },
  { label: "Haikei", href: "https://haikei.app", img: "/assets/img/BQOZ3jbADhKA4g05AVskN29Ssw.png" },
  { label: "SVG Gobbler", href: "https://svggobbler.com", img: "/assets/img/MioMfE11fCCXFttjA1102lwsRDw.png" },
];

export const SERVICES = [
  {
    img: "/assets/img/IbWeDpfHeHsVAQlPnx410HC4Oew.png",
    title: "Web Design",
    copy: "Distinctive websites with clear visuals and thoughtful interactions.",
  },
  {
    img: "/assets/img/j9itQ0VvSxiJ2LdOY9EfhxP9AU.png",
    title: "Product Design",
    copy: "Simple, user-focused interfaces with clear flows and intuitive experiences.",
  },
  {
    img: "/assets/img/cAlfNdFoPWGl3qAnKjyBo2uvCeM.png",
    title: "Creative Direction",
    copy: "Visual concepts and art direction that create clear, memorable digital brands.",
  },
];

export const RESUME_SKILLS = [
  "Product Design",
  "Design Systems",
  "User Research",
  "UI Design",
  "Prototyping",
  "Usability Testing",
  "UX Design",
  "Wireframing",
  "Information Architecture",
];

export const GAME_URL = "https://herding-cats-ten.vercel.app/";
