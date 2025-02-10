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
  name: string;
  description: string;
  timeLimit: number;
  tasks: Task[];
  image: File | null;
}
