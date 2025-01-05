export interface Author {
  name: string;
  avatar: string;
}

export interface Post {
  id: number;
  title: string;
  author: Author;
  category: string;
  content: string;
  likes: number;
  replies: number;
  timestamp: string;
}