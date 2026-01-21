import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Users, Clock, Flame } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { RankingCard } from "@/components/ranking/RankingCard";
import { CategoryPills } from "@/components/ranking/CategoryPills";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockRankings, mockCategories } from "@/data/mockData";

type SortOption = "trending" | "recent" | "popular";

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("trending");

  const publicRankings = mockRankings.filter((r) => r.isPublic);

  const filteredRankings = publicRankings.filter((ranking) => {
    const matchesCategory = !selectedCategory || 
      mockCategories.find((c) => c.id === selectedCategory)?.name === ranking.category;
    const matchesSearch = !searchQuery || 
      ranking.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ranking.user?.displayName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedRankings = [...filteredRankings].sort((a, b) => {
    if (sortBy === "popular") return b.likesCount - a.likesCount;
    if (sortBy === "recent") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return b.likesCount + b.savesCount - (a.likesCount + a.savesCount);
  });

  const sortOptions = [
    { key: "trending" as SortOption, label: "Tendenze", icon: Flame },
    { key: "recent" as SortOption, label: "Recenti", icon: Clock },
    { key: "popular" as SortOption, label: "Popolari", icon: Users },
  ];

  return (
    <PageContainer>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b">
        <div className="container px-4 py-4">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold mb-4"
          >
            Esplora
          </motion.h1>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cerca per titolo o utente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </motion.div>
        </div>
      </header>

      <div className="container px-4 py-6">
        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <CategoryPills
            categories={mockCategories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </motion.div>

        {/* Sort Options */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 mb-6"
        >
          {sortOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Button
                key={option.key}
                variant={sortBy === option.key ? "default" : "secondary"}
                size="sm"
                onClick={() => setSortBy(option.key)}
                className="gap-1.5"
              >
                <Icon className="h-3.5 w-3.5" />
                {option.label}
              </Button>
            );
          })}
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid gap-4"
        >
          {sortedRankings.map((ranking, index) => (
            <RankingCard key={ranking.id} ranking={ranking} index={index} />
          ))}
          
          {sortedRankings.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                Nessuna classifica trovata
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default Explore;
