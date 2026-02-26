import {
  BookOpen,
  Database,
  FlaskConical,
  Github,
  MessagesSquare,
  Network,
  TerminalSquare,
  Twitter,
  type LucideIcon,
} from "lucide-react";

import type { CourseIcon, FeatureIcon, SocialIcon } from "@/src/data/mockData";

export const featureIconMap: Record<FeatureIcon, LucideIcon> = {
  "book-open": BookOpen,
  "flask-conical": FlaskConical,
  "messages-square": MessagesSquare,
};

export const courseIconMap: Record<CourseIcon, LucideIcon> = {
  terminal: TerminalSquare,
  network: Network,
  database: Database,
};

export const socialIconMap: Record<SocialIcon, LucideIcon> = {
  twitter: Twitter,
  github: Github,
};
