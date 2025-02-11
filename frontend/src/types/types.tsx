export interface Task {
  name: string;
  text: string;
  type: string;
  answerOptions: {
    text: string;
    isCorrect: boolean;
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
  authorId: number;
  rating: number;
  reviewCount: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: Date;
  isVerified: boolean;
  userRating: number;
  createdQuests: Quest[];
  completedQuests: Quest[];
}
