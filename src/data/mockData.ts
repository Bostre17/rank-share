import { Ranking, User, Category } from "@/types";

// Mock user data
export const mockUser: User = {
  id: "1",
  username: "marco_rossi",
  displayName: "Marco Rossi",
  avatarUrl: undefined,
  bio: "Amante del cinema, cibo e viaggi ✨",
  createdAt: new Date("2024-01-15"),
};

// Mock categories
export const mockCategories: Category[] = [
  { id: "1", name: "Film", icon: "🎬", count: 1250 },
  { id: "2", name: "Musica", icon: "🎵", count: 890 },
  { id: "3", name: "Cibo", icon: "🍕", count: 2100 },
  { id: "4", name: "Viaggi", icon: "✈️", count: 650 },
  { id: "5", name: "Libri", icon: "📚", count: 430 },
  { id: "6", name: "Sport", icon: "⚽", count: 780 },
  { id: "7", name: "Gaming", icon: "🎮", count: 1560 },
  { id: "8", name: "Serie TV", icon: "📺", count: 920 },
];

// Mock rankings
export const mockRankings: Ranking[] = [
  {
    id: "1",
    title: "Migliori Film di Sempre",
    description: "La mia classifica personale dei film che hanno segnato la storia del cinema",
    category: "Film",
    isPublic: true,
    items: [
      { id: "1", title: "Il Padrino", position: 1, description: "Un capolavoro senza tempo" },
      { id: "2", title: "Pulp Fiction", position: 2, description: "Tarantino al suo meglio" },
      { id: "3", title: "Inception", position: 3, description: "Mente = Blown" },
      { id: "4", title: "The Dark Knight", position: 4 },
      { id: "5", title: "Forrest Gump", position: 5 },
    ],
    userId: "1",
    user: mockUser,
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-15"),
    likesCount: 234,
    savesCount: 45,
  },
  {
    id: "2",
    title: "Ristoranti Provati a Roma",
    description: "I miei posti preferiti dove mangiare nella Capitale",
    category: "Cibo",
    isPublic: true,
    items: [
      { id: "1", title: "Roscioli", position: 1, description: "Carbonara da urlo" },
      { id: "2", title: "Pizzarium", position: 2, description: "Pizza al taglio perfetta" },
      { id: "3", title: "Armando al Pantheon", position: 3 },
      { id: "4", title: "Da Enzo", position: 4 },
    ],
    userId: "1",
    user: mockUser,
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-03-01"),
    likesCount: 156,
    savesCount: 89,
  },
  {
    id: "3",
    title: "Album che Ascolto in Loop",
    description: "Quelli che non mi stanco mai di ascoltare",
    category: "Musica",
    isPublic: true,
    items: [
      { id: "1", title: "Random Access Memories - Daft Punk", position: 1 },
      { id: "2", title: "OK Computer - Radiohead", position: 2 },
      { id: "3", title: "Discovery - Daft Punk", position: 3 },
      { id: "4", title: "The Dark Side of the Moon - Pink Floyd", position: 4 },
      { id: "5", title: "Kid A - Radiohead", position: 5 },
      { id: "6", title: "In Rainbows - Radiohead", position: 6 },
    ],
    userId: "2",
    user: {
      id: "2",
      username: "giulia_music",
      displayName: "Giulia",
      createdAt: new Date("2024-01-01"),
    },
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-03-10"),
    likesCount: 312,
    savesCount: 67,
  },
  {
    id: "4",
    title: "Destinazioni da Visitare",
    description: "La mia bucket list di viaggi",
    category: "Viaggi",
    isPublic: false,
    items: [
      { id: "1", title: "Giappone", position: 1, description: "Tokyo + Kyoto" },
      { id: "2", title: "Islanda", position: 2 },
      { id: "3", title: "Nuova Zelanda", position: 3 },
    ],
    userId: "1",
    user: mockUser,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-02-15"),
    likesCount: 0,
    savesCount: 0,
  },
];

export const trendingRankings = mockRankings.filter(r => r.isPublic).slice(0, 3);
