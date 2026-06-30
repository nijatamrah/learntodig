export type Term = { az: string; en: string };

export type Section = {
  heading: string;
  body: string;
  formula?: { expression: string; legend: string };
  example?: string;
  caseStudy?: string;
  terms?: Term[];
};

export type QuizItem = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type Level = {
  description: string;
  sections: Section[];
  quiz: QuizItem[];
};

export type Lesson = {
  title: string;
  icon: string;
  levels: {
    baslangic: Level;
    orta: Level;
    ireli: Level;
  };
};
