// Types for the Rankify app

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: Date;
}

export interface RankItem {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  position: number;
}

export interface Ranking {
  id: string;
  title: string;
  description?: string;
  coverUrl?: string;
  category: string;
  isPublic: boolean;
  items: RankItem[];
  userId: string;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
  likesCount: number;
  savesCount: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}
