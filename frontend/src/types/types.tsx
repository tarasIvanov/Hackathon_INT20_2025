// я вже довбав думати як той camelCase на snake міняти
export interface Task {
  name: string;
  description: string;
  type: string;
  answer_options: {
    name: string;
    is_сorrect: boolean;
  }[];
  media: File | null;
}

export interface Quest {
  id: number;
  name: string;
  description: string;
  timeLimit: number;
  tasks: Task[];
  image: File | null;
  rating: number;
  reviewCount: number;
}

export interface UserProfile {
  avatarUrl: string;
  name: string;
  userEmail: string; // на просто email вимахується
  createdAt: Date;
  createdQuests: Quest[];
  completedQuests: Quest[];
  userRating: number;
  reviewCount: number;
}
