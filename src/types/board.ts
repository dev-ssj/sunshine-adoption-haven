
export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  category: string;
  views: number;
  // SNS 홍보 게시판 전용 필드
  instagramEmbedUrl?: string;
  // 실종/목격 게시판 전용 필드
  breed?: string;
  gender?: string;
  age?: string;
  furColor?: string;
  missingLocation?: string;
  missingDate?: string;
}

export type BoardCategory = 'adoption' | 'sns' | 'missing' | 'all';
