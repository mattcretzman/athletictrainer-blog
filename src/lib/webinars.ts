export interface WebinarChapter {
  time: string; // e.g. "0:00"
  seconds: number;
  title: string;
}

export interface Webinar {
  slug: string;
  title: string;
  subtitle?: string;
  date: string; // ISO date string
  time: string; // e.g. "12:30 PM ET"
  registrationUrl: string;
  description: string;
  speakers: {
    name: string;
    title: string;
    organization: string;
  }[];
  topics: string[];
  isPast: boolean;
  featuredImage?: string;
  youtubeId?: string;
  chapters?: WebinarChapter[];
  transcript?: string;
}

import { readFileSync } from "fs";
import { join } from "path";

function loadTranscript(filename: string): string {
  try {
    return readFileSync(join(process.cwd(), "src", "lib", filename), "utf-8");
  } catch {
    return "";
  }
}

export function getWebinars(): Webinar[] {
  return [
    {
      slug: "level-up-your-atc-career",
      title: "Level Up Your ATC Career",
      subtitle: "Discover how athletic trainers are building rewarding careers supporting the Army's H2F program",
      date: "2026-07-30",
      time: "12:30 PM ET",
      registrationUrl:
        "https://events.teams.microsoft.com/event/9ff7a7ee-49d7-4a48-b27f-156748177d56@1f6eaccd-6486-4584-8c45-157413336af9",
      description:
        "Join Planned Systems International (PSI) for a free webinar exploring career opportunities for athletic trainers in the Army's Holistic Health and Fitness (H2F) program. Learn about H2F roles — how to apply, what to expect, and how to grow your career while making a real impact on service member health, performance, and readiness.",
      speakers: [
        {
          name: "Dr. Rosie Catanoso",
          title: "Director of Human Performance Operations",
          organization: "Cognito Systems",
        },
      ],
      topics: [
        "Athletic training career paths in the H2F program",
        "H2F program overview and the role of ATCs",
        "Application process and qualifications",
        "Benefits, compensation, and growth opportunities",
        "Q&A with the Cognito Systems team",
      ],
      isPast: true,
      youtubeId: "RcaIz94LX7A",
      transcript: loadTranscript("webinar-transcript-level-up.txt"),
      chapters: [
        { time: "0:00", seconds: 0, title: "Welcome & Introductions" },
        { time: "3:37", seconds: 217, title: "Dr. Rosie Catanoso — What Is H2F?" },
        { time: "5:16", seconds: 316, title: "The Five Domains of Soldier Readiness" },
        { time: "10:22", seconds: 622, title: "What Athletic Trainers Do in H2F" },
        { time: "13:04", seconds: 784, title: "A Day in the Life of an H2F Athletic Trainer" },
        { time: "17:05", seconds: 1025, title: "How to Transition Into H2F" },
        { time: "19:36", seconds: 1176, title: "Benefits of Working in H2F" },
        { time: "22:36", seconds: 1356, title: "Current & Future AT Opportunities" },
        { time: "25:49", seconds: 1549, title: "Q&A with the Team" },
        { time: "44:23", seconds: 2663, title: "Closing Remarks" },
      ],
    },
  ];
}

export function getWebinarBySlug(slug: string): Webinar | undefined {
  return getWebinars().find((w) => w.slug === slug);
}

export function getUpcomingWebinars(): Webinar[] {
  return getWebinars().filter((w) => !w.isPast);
}

export function getPastWebinars(): Webinar[] {
  return getWebinars().filter((w) => w.isPast);
}
