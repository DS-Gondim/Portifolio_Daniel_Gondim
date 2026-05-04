export type MusicStyle =
  | "Rock"
  | "Jazz"
  | "Funk"
  | "Samba"
  | "Blues"
  | "Pop"
  | "Metal"
  | "Reggae"
  | "Gospel"
  | "Bossa Nova"
  | "Forró"
  | "Axé"
  | "Pagode"
  | "MPB"
  | "Eletrônico";

export interface StyleInfo {
  id: string;
  name: MusicStyle;
  emoji: string;
  description: string;
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
  lessonCount: number;
}

export type LessonDuration = 30 | 60 | 90;

export type LessonStatus =
  | "agendada"
  | "em_andamento"
  | "concluida"
  | "cancelada";

export interface Lesson {
  id: string;
  style: MusicStyle;
  date: string; // ISO date string
  time: string; // "HH:MM"
  duration: LessonDuration;
  topic: string;
  notes: string;
  status: LessonStatus;
  roomName: string; // Jitsi room name
  price: number;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  lessonsCompleted: number;
  hoursStudied: number;
  stylesLearned: number;
}
