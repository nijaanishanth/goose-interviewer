export type QuestionCategory = 'behavioral' | 'technical' | 'situational' | 'leadership';

export interface InterviewQuestion {
  id: string;
  category: QuestionCategory;
  question: string;
}

export const questionBank: InterviewQuestion[] = [
  // Behavioral Questions
  {
    id: 'b1',
    category: 'behavioral',
    question: 'Tell me about a time when you had to work with a difficult team member. How did you handle it?'
  },
  {
    id: 'b2',
    category: 'behavioral',
    question: 'Describe a situation where you had to meet a tight deadline. What was your approach?'
  },
  {
    id: 'b3',
    category: 'behavioral',
    question: 'Can you share an example of when you failed? What did you learn from it?'
  },
  {
    id: 'b4',
    category: 'behavioral',
    question: 'Tell me about a time when you had to adapt to a significant change at work.'
  },
  {
    id: 'b5',
    category: 'behavioral',
    question: 'Describe a situation where you went above and beyond your job responsibilities.'
  },
  
  // Technical Questions
  {
    id: 't1',
    category: 'technical',
    question: 'Walk me through your approach to debugging a complex issue in production.'
  },
  {
    id: 't2',
    category: 'technical',
    question: 'How do you stay updated with the latest developments in your field?'
  },
  {
    id: 't3',
    category: 'technical',
    question: 'Explain a technical concept from your field to someone without a technical background.'
  },
  {
    id: 't4',
    category: 'technical',
    question: 'Describe your process for learning a new technology or tool.'
  },
  {
    id: 't5',
    category: 'technical',
    question: 'What are the most important considerations when designing a scalable system?'
  },
  
  // Situational Questions
  {
    id: 's1',
    category: 'situational',
    question: 'If you noticed a colleague making a serious mistake, what would you do?'
  },
  {
    id: 's2',
    category: 'situational',
    question: 'How would you handle a situation where you disagree with your manager\'s decision?'
  },
  {
    id: 's3',
    category: 'situational',
    question: 'What would you do if you were assigned multiple high-priority tasks with the same deadline?'
  },
  {
    id: 's4',
    category: 'situational',
    question: 'How would you approach a project where requirements are unclear or constantly changing?'
  },
  {
    id: 's5',
    category: 'situational',
    question: 'If you discovered a security vulnerability in your company\'s product, what would you do?'
  },
  
  // Leadership Questions
  {
    id: 'l1',
    category: 'leadership',
    question: 'Describe your leadership style and give an example of how you\'ve applied it.'
  },
  {
    id: 'l2',
    category: 'leadership',
    question: 'How do you motivate team members who are struggling with their performance?'
  },
  {
    id: 'l3',
    category: 'leadership',
    question: 'Tell me about a time when you had to make a difficult decision that affected your team.'
  },
  {
    id: 'l4',
    category: 'leadership',
    question: 'How do you handle conflicts between team members?'
  },
  {
    id: 'l5',
    category: 'leadership',
    question: 'Describe how you would build and maintain a high-performing team.'
  }
];

export const getRandomQuestion = (category?: QuestionCategory): InterviewQuestion => {
  const filteredQuestions = category 
    ? questionBank.filter(q => q.category === category)
    : questionBank;
  
  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  return filteredQuestions[randomIndex];
};

export const getQuestionsByCategory = (category: QuestionCategory): InterviewQuestion[] => {
  return questionBank.filter(q => q.category === category);
};
