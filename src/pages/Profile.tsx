import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Grid3X3, List, Lock, Globe, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { RankingCard } from "@/components/ranking/RankingCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockRankings, mockUser } from "@/data/mockData";

const Profile = () => {
  const userRankings = mockRankings.filter((r) => r.userId === mockUser.id);
  const publicRankings = userRankings.filter((r) => r.isPublic);
  const privateRankings = userRankings.filter((r) => !r.isPublic);

  return (
    <PageContainer>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b">
        <div className="container flex items-center justify-between px-4 py-4">
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold"
          >
            Profilo
          </motion.h1>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="container px-4 py-6">
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center mb-8"
        >
          <Avatar className="h-24 w-24 mb-4 shadow-medium">
            <AvatarImage src={mockUser.avatarUrl} />
            <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
              {mockUser.displayName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{mockUser.displayName}</h2>
          <p className="text-sm text-muted-foreground">@{mockUser.username}</p>
          {mockUser.bio && (
            <p className="mt-2 text-sm text-muted-foreground max-w-[280px]">
              {mockUser.bio}
            </p>
          )}

          {/* Stats */}
          <div className="flex gap-8 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{userRankings.length}</p>
              <p className="text-xs text-muted-foreground">Classifiche</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{publicRankings.length}</p>
              <p className="text-xs text-muted-foreground">Pubbliche</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {userRankings.reduce((sum, r) => sum + r.likesCount, 0)}
              </p>
              <p className="text-xs text-muted-foreground">Mi piace</p>
            </div>
          </div>
        </motion.div>

        {/* Rankings Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="all" className="flex-1 gap-1.5">
                <Grid3X3 className="h-4 w-4" />
                Tutte
              </TabsTrigger>
              <TabsTrigger value="public" className="flex-1 gap-1.5">
                <Globe className="h-4 w-4" />
                Pubbliche
              </TabsTrigger>
              <TabsTrigger value="private" className="flex-1 gap-1.5">
                <Lock className="h-4 w-4" />
                Private
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {userRankings.length > 0 ? (
                userRankings.map((ranking, index) => (
                  <RankingCard key={ranking.id} ranking={ranking} index={index} />
                ))
              ) : (
                <EmptyState />
              )}
            </TabsContent>

            <TabsContent value="public" className="space-y-4">
              {publicRankings.length > 0 ? (
                publicRankings.map((ranking, index) => (
                  <RankingCard key={ranking.id} ranking={ranking} index={index} />
                ))
              ) : (
                <EmptyState type="public" />
              )}
            </TabsContent>

            <TabsContent value="private" className="space-y-4">
              {privateRankings.length > 0 ? (
                privateRankings.map((ranking, index) => (
                  <RankingCard key={ranking.id} ranking={ranking} index={index} />
                ))
              ) : (
                <EmptyState type="private" />
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </PageContainer>
  );
};

function EmptyState({ type }: { type?: "public" | "private" }) {
  const getMessage = () => {
    if (type === "public") return "Non hai ancora classifiche pubbliche";
    if (type === "private") return "Non hai ancora classifiche private";
    return "Non hai ancora creato nessuna classifica";
  };

  return (
    <div className="py-12 text-center">
      <p className="text-muted-foreground mb-4">{getMessage()}</p>
      <Link to="/create">
        <Button variant="hero">
          <Plus className="h-4 w-4 mr-2" />
          Crea la tua prima classifica
        </Button>
      </Link>
    </div>
  );
}

export default Profile;
