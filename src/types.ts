export type TrackType = 'DEV' | 'DESIGN' | 'VIDEO';

export interface TimelineClip {
  id: string;
  title: string;
  track: TrackType;
  start: number; // in seconds (0 to 10)
  duration: number; // in seconds
  color: 'cyan' | 'amber' | 'both';
  details: {
    subtitle: string;
    description: string;
    tags: string[];
    meta: string; // e.g. "02.5s / FPS 60"
    mediaType: 'code' | 'design' | 'video';
    mediaContent: {
      codeSnippet?: string;
      language?: string;
      palette?: string[];
      logoText?: string;
      shapes?: Array<{ type: string; color: string; scale?: number }>;
      videoTitle?: string;
      waveformSeed?: number[];
      videoStatus?: string;
    };
  };
}

export interface Skill {
  name: string;
  category: 'Languages' | 'Frameworks' | 'Design & Creative' | 'Video & Post';
  level: number; // 0-100
  iconName: string;
}

export interface Service {
  num: string;
  title: string;
  description: string;
  tags: string[];
}

