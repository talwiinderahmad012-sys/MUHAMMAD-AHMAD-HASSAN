import { TimelineClip, Skill, Service } from './types';

export const TIMELINE_CLIPS: TimelineClip[] = [
  // --- DEV TRACK ---
  {
    id: 'dev-1',
    title: 'SaaS Dev Console',
    track: 'DEV',
    start: 0,
    duration: 3.5,
    color: 'cyan',
    details: {
      subtitle: 'Real-time Web Platform',
      description: 'A custom developer dashboard mockup showing a terminal, an interactive state visualizer, and live-running API proxy scripts.',
      tags: ['React 19', 'Vite', 'Tailwind v4', 'WebSockets'],
      meta: '0.0s - 3.5s | React Engine',
      mediaType: 'code',
      mediaContent: {
        language: 'typescript',
        codeSnippet: `// Interactive React Hook
import { useState, useEffect } from 'react';

export function useDevMetrics() {
  const [cpu, setCpu] = useState(42);
  useEffect(() => {
    const timer = setInterval(() => {
      setCpu(prev => Math.min(99, Math.max(10, prev + (Math.random() - 0.5) * 10)));
    }, 1500);
    return () => clearInterval(timer);
  }, []);
  return { cpu: Math.round(cpu), status: 'OPERATIONAL' };
}`,
      }
    }
  },
  {
    id: 'dev-2',
    title: 'D3 Engine Sync',
    track: 'DEV',
    start: 4.0,
    duration: 3.0,
    color: 'cyan',
    details: {
      subtitle: 'Data Visualization Engine',
      description: 'Dynamic graph render tracking performance load, pipeline memory spikes, and frames-per-second averages with canvas overlays.',
      tags: ['D3.js', 'HTML5 Canvas', 'SVG Math', 'FPS Counter'],
      meta: '4.0s - 7.0s | Math Graphics',
      mediaType: 'code',
      mediaContent: {
        language: 'javascript',
        codeSnippet: `// D3 Node Force Simulation
const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id))
  .force("charge", d3.forceManyBody().strength(-120))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .on("tick", () => {
    // Tick animations
    renderCanvasFrame();
  });`,
      }
    }
  },
  {
    id: 'dev-3',
    title: 'API Node Gateway',
    track: 'DEV',
    start: 7.5,
    duration: 2.5,
    color: 'cyan',
    details: {
      subtitle: 'Edge API Middleware',
      description: 'Ultra-fast node gateway utilizing serverless caching strategies, custom token rate limiters, and response headers compression.',
      tags: ['Node.js', 'Express', 'Redis Cache', 'Edge Routing'],
      meta: '7.5s - 10.0s | Edge Router',
      mediaType: 'code',
      mediaContent: {
        language: 'typescript',
        codeSnippet: `// Middleware Rate Limiter
export async function rateLimit(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.ip;
  const count = await redis.incr(\`rl:\${ip}\`);
  if (count === 1) {
    await redis.expire(\`rl:\${ip}\`, 60);
  }
  if (count > 100) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  next();
}`,
      }
    }
  },

  // --- DESIGN TRACK ---
  {
    id: 'design-1',
    title: 'Branding Identity',
    track: 'DESIGN',
    start: 0.5,
    duration: 3.5,
    color: 'amber',
    details: {
      subtitle: 'Vector Logo & Typography Guides',
      description: 'Clean typographic layout focusing on modern letter-spacing, grid proportions, and primary brand palette swatches.',
      tags: ['Adobe Illustrator', 'Figma', 'Grid Algebra', 'Brand Guide'],
      meta: '0.5s - 4.0s | Vector Grid',
      mediaType: 'design',
      mediaContent: {
        logoText: 'HEXFRAME',
        palette: ['#0B0E14', '#5EEAD4', '#8FA3AE'],
        shapes: [
          { type: 'hexagon', color: '#5EEAD4', scale: 1.1 }
        ]
      }
    }
  },
  {
    id: 'design-2',
    title: 'Neo-UI App Shell',
    track: 'DESIGN',
    start: 4.5,
    duration: 3.0,
    color: 'amber',
    details: {
      subtitle: 'Mobile UI/UX Wireframe',
      description: 'Interactive high-fidelity layout representing mobile app overlays, bento style grid units, and subtle drop shadows.',
      tags: ['UI/UX Design', 'Figma Auto-Layout', 'Design Systems', 'Dark UI'],
      meta: '4.5s - 7.5s | Bento UX',
      mediaType: 'design',
      mediaContent: {
        logoText: 'BENTO CORE',
        palette: ['#0B0E14', '#5EEAD4', '#F5A524'],
        shapes: [
          { type: 'pill', color: '#5EEAD4', scale: 1.2 },
          { type: 'card', color: '#1E293B', scale: 1.0 },
          { type: 'circle', color: '#F5A524', scale: 0.5 },
        ]
      }
    }
  },
  {
    id: 'design-3',
    title: 'Motion Styleguide',
    track: 'DESIGN',
    start: 8.0,
    duration: 2.0,
    color: 'amber',
    details: {
      subtitle: 'Interactive Micro-interactions',
      description: 'Exploration of physical physics models, bouncy spring constants, and morphing element geometry on hover.',
      tags: ['Framer Motion', 'CSS Variables', 'Bezier Curves', 'Interaction'],
      meta: '8.0s - 10.0s | Motion Curves',
      mediaType: 'design',
      mediaContent: {
        logoText: 'SPRING.SYS',
        palette: ['#5EEAD4', '#F5A524'],
        shapes: [
          { type: 'morphing', color: '#5EEAD4', scale: 1 },
          { type: 'rotated', color: '#F5A524', scale: 1.1 },
        ]
      }
    }
  },

  // --- VIDEO TRACK ---
  {
    id: 'video-1',
    title: 'Cinematic B-Roll',
    track: 'VIDEO',
    start: 0,
    duration: 3.0,
    color: 'both',
    details: {
      subtitle: 'Color Grading & Lighting Control',
      description: 'Advanced LUT applications, color mask tracking, and simulated film grain rendering on a dark-neon cityscape.',
      tags: ['DaVinci Resolve', 'Premiere Pro', 'Color Grading', 'LUTs'],
      meta: '0.0s - 3.0s | LUT Grading',
      mediaType: 'video',
      mediaContent: {
        videoTitle: 'Night Cityscape Graded [RE-432]',
        videoStatus: 'COMPILING EXPORT',
        waveformSeed: [20, 50, 40, 80, 95, 30, 20, 45, 60, 35, 70, 90, 85, 40, 30, 65, 80, 50, 25, 60]
      }
    }
  },
  {
    id: 'video-2',
    title: 'Promo Title Reveal',
    track: 'VIDEO',
    start: 3.5,
    duration: 3.0,
    color: 'both',
    details: {
      subtitle: 'Kinetic Typography & Glitch Mask',
      description: 'Impactful text displacement, dynamic rgb splitting, and cinematic transitions syncing with sub-bass hits.',
      tags: ['After Effects', 'Keyframe Animation', 'Sound Sync', 'Glitch FX'],
      meta: '3.5s - 6.5s | Kinetic FX',
      mediaType: 'video',
      mediaContent: {
        videoTitle: 'TECH REVEAL COMPONENT_V2',
        videoStatus: 'RENDER ACTIVE',
        waveformSeed: [40, 35, 60, 75, 90, 85, 40, 20, 60, 80, 95, 100, 85, 50, 35, 75, 90, 70, 40, 55]
      }
    }
  },
  {
    id: 'video-3',
    title: 'Sound Design Sync',
    track: 'VIDEO',
    start: 7.0,
    duration: 3.0,
    color: 'both',
    details: {
      subtitle: 'Audio Visualization & Compression',
      description: 'Audio mastering workflow showcasing high-frequency filtering, ambient reverb spacers, and dynamic decibel peaking.',
      tags: ['Audition', 'FMOD Studio', 'Stereo Imaging', 'Mastering'],
      meta: '7.0s - 10.0s | Audio Mastering',
      mediaType: 'video',
      mediaContent: {
        videoTitle: 'Ambient Wave Synth Master',
        videoStatus: 'AUDIO CAPTURE ON',
        waveformSeed: [10, 20, 35, 45, 55, 60, 75, 85, 90, 80, 70, 60, 45, 35, 25, 15, 12, 18, 30, 40]
      }
    }
  }
];

export const SKILLS: Skill[] = [
  // Languages
  { name: 'TypeScript', category: 'Languages', level: 95, iconName: 'Code2' },
  { name: 'JavaScript (ESNext)', category: 'Languages', level: 98, iconName: 'FileCode' },
  { name: 'Node.js', category: 'Frameworks', level: 90, iconName: 'Server' },
  { name: 'HTML5 / CSS3', category: 'Languages', level: 95, iconName: 'Laptop' },
  
  // Frameworks
  { name: 'React 19 & Next.js', category: 'Frameworks', level: 96, iconName: 'Layers' },
  { name: 'Tailwind CSS v4', category: 'Frameworks', level: 98, iconName: 'Palette' },
  { name: 'Express / REST', category: 'Frameworks', level: 92, iconName: 'Cpu' },
  { name: 'GraphQL / SQL', category: 'Frameworks', level: 85, iconName: 'Database' },

  // Design & Creative
  { name: 'Figma (UI/UX Systems)', category: 'Design & Creative', level: 94, iconName: 'LayoutGrid' },
  { name: 'Vector Brand Identity', category: 'Design & Creative', level: 88, iconName: 'PenTool' },
  { name: 'Motion Graphic Design', category: 'Design & Creative', level: 90, iconName: 'Sparkles' },
  { name: '3D Layout Mockups', category: 'Design & Creative', level: 75, iconName: 'Cuboid' },

  // Video & Post
  { name: 'DaVinci Resolve', category: 'Video & Post', level: 95, iconName: 'Tv' },
  { name: 'After Effects (VFX)', category: 'Video & Post', level: 90, iconName: 'Film' },
  { name: 'Premiere Pro', category: 'Video & Post', level: 92, iconName: 'Video' },
  { name: 'Sound Mastering & FX', category: 'Video & Post', level: 85, iconName: 'Volume2' },
];

export const SERVICES: Service[] = [
  {
    num: '01',
    title: 'Full-Stack Web Development',
    description: 'Engineering supercharged Single-Page Applications and full-stack platforms. Built using React 19, TypeScript, and serverless node gateways. Optimized for high Google Lighthouse rankings, responsiveness, and state resilience.',
    tags: ['React', 'TypeScript', 'Node.js', 'Vite', 'Tailwind']
  },
  {
    num: '02',
    title: 'High-Fidelity Branding & UI Systems',
    description: 'Structuring responsive Figma design sheets, vector logo hierarchies, typography ratios, and cohesive design languages that perfectly translate to front-end components.',
    tags: ['Figma UI', 'Vector Branding', 'Design System', 'Typography']
  },
  {
    num: '03',
    title: 'Cinematic Video Editing & Post-Production',
    description: 'Polishing dynamic trailers, SaaS product walkthroughs, and social assets. Utilizing Premiere & DaVinci Resolve for custom LUT color schemes, keyframed audio beats, and smooth kinetic text overlays.',
    tags: ['Color Grading', 'After Effects', 'Kinetic Typography', 'Sound Design']
  },
  {
    num: '04',
    title: 'Interactive Animation & SVG Physics',
    description: 'Crafting premium interactive interfaces. Utilizing physical model spring motions, fluid vector transforms, and micro-animations to improve layout narrative and guide user attention.',
    tags: ['Framer Motion', 'Web Physics', 'CSS Art', 'Micro-Interactions']
  }
];

export const SOCIAL_LINKS = [
  { name: 'Email', url: 'mailto:hexframe@gmail.com', icon: 'Mail' },
  { name: 'Phone', url: 'tel:+923078908351', icon: 'Phone' },
  { name: 'WhatsApp', url: 'https://wa.me/923078908351', icon: 'Whatsapp' },
  { name: 'GitHub', url: 'https://github.com/talwiinderahmad012-sys/MUHAMMAD-AHMAD-HASSAN', icon: 'Github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/muhammad-ahmad-hassan-449a4b40b/', icon: 'Linkedin' },
  { name: 'Instagram', url: 'https://www.instagram.com/ahmadhassan_33/', icon: 'Instagram' },
  { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61591740126168', icon: 'Facebook' },
];


