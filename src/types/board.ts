
export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  category: string;
  views: number;
}

export type BoardCategory = 'adoption' | 'sns' | 'missing' | 'all';
