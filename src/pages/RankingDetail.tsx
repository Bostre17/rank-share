import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Heart, 
  Bookmark, 
  Share2, 
  Copy,
  Lock,
  Globe,
  MoreHorizontal,
  Pencil,
  Trash2
} from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockRankings, mockUser } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const RankingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const ranking = mockRankings.find((r) => r.id === id);

  if (!ranking) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-screen">
          <p>Classifica non trovata</p>
        </div>
      </PageContainer>
    );
  }

  const isOwner = ranking.userId === mockUser.id;

  const handleShare = async () => {
    try {
      await navigator.share({
        title: ranking.title,
        text: ranking.description,
        url: window.location.href,
      });
    } catch {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiato negli appunti!");
    }
  };

  const handleDuplicate = () => {
    toast.success("Classifica duplicata!");
    navigate("/create");
  };

  const getRankStyle = (position: number) => {
    if (position === 1) return "bg-rank-gold shadow-lg scale-105";
    if (position === 2) return "bg-rank-silver";
    if (position === 3) return "bg-rank-bronze";
    return "bg-muted";
  };

  return (
    <PageContainer>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b">
        <div className="container flex items-center justify-between px-4 py-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            {ranking.isPublic && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isLiked && "fill-destructive text-destructive"
                    )}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Bookmark
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isSaved && "fill-primary text-primary"
                    )}
                  />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </>
            )}
            
            {isOwner && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Pencil className="h-4 w-4 mr-2" />
                    Modifica
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Elimina
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>

      <div className="container px-4 py-6">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <h1 className="text-2xl font-bold">{ranking.title}</h1>
            <Badge variant={ranking.isPublic ? "public" : "private"}>
              {ranking.isPublic ? (
                <Globe className="mr-1 h-3 w-3" />
              ) : (
                <Lock className="mr-1 h-3 w-3" />
              )}
              {ranking.isPublic ? "Pubblica" : "Privata"}
            </Badge>
          </div>
          
          {ranking.description && (
            <p className="text-muted-foreground">{ranking.description}</p>
          )}

          {/* Author */}
          <div className="flex items-center gap-3 mt-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={ranking.user?.avatarUrl} />
              <AvatarFallback>
                {ranking.user?.displayName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{ranking.user?.displayName}</p>
              <p className="text-xs text-muted-foreground">
                @{ranking.user?.username}
              </p>
            </div>
          </div>

          {/* Stats */}
          {ranking.isPublic && (
            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {ranking.likesCount + (isLiked ? 1 : 0)} mi piace
              </span>
              <span className="flex items-center gap-1">
                <Bookmark className="h-4 w-4" />
                {ranking.savesCount + (isSaved ? 1 : 0)} salvati
              </span>
            </div>
          )}
        </motion.div>

        {/* Items List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {ranking.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className={cn(
                "flex items-center gap-4 rounded-xl border bg-card p-4 transition-all",
                item.position <= 3 && "shadow-soft"
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                  getRankStyle(item.position)
                )}
              >
                {item.position}
              </span>
              
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{item.title}</p>
                {item.description && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Duplicate Button */}
        {ranking.isPublic && !isOwner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Button
              variant="hero"
              className="w-full"
              onClick={handleDuplicate}
            >
              <Copy className="h-4 w-4 mr-2" />
              Duplica questa classifica
            </Button>
          </motion.div>
        )}
      </div>
    </PageContainer>
  );
};

export default RankingDetail;
