import { motion } from "framer-motion";
import { Heart, Bookmark, Lock, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ranking } from "@/types";
import { cn } from "@/lib/utils";

interface RankingCardProps {
  ranking: Ranking;
  index?: number;
}

export function RankingCard({ ranking, index = 0 }: RankingCardProps) {
  const topItems = ranking.items.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link to={`/ranking/${ranking.id}`}>
        <Card variant="interactive" className="overflow-hidden">
          {ranking.coverUrl && (
            <div className="h-32 w-full overflow-hidden">
              <img
                src={ranking.coverUrl}
                alt={ranking.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {ranking.title}
                </h3>
                {ranking.description && (
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {ranking.description}
                  </p>
                )}
              </div>
              <Badge variant={ranking.isPublic ? "public" : "private"}>
                {ranking.isPublic ? (
                  <Globe className="mr-1 h-3 w-3" />
                ) : (
                  <Lock className="mr-1 h-3 w-3" />
                )}
                {ranking.isPublic ? "Pubblica" : "Privata"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            {/* Top 3 Preview */}
            <div className="space-y-2">
              {topItems.map((item, i) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2"
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                      i === 0 && "bg-rank-gold text-foreground",
                      i === 1 && "bg-rank-silver text-foreground",
                      i === 2 && "bg-rank-bronze text-foreground"
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="flex-1 truncate text-sm font-medium">
                    {item.title}
                  </span>
                </div>
              ))}
              {ranking.items.length > 3 && (
                <p className="text-center text-xs text-muted-foreground">
                  +{ranking.items.length - 3} altri elementi
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={ranking.user?.avatarUrl} />
                  <AvatarFallback className="text-[10px]">
                    {ranking.user?.displayName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">
                  {ranking.user?.displayName}
                </span>
              </div>
              
              {ranking.isPublic && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="flex items-center gap-1 text-xs">
                    <Heart className="h-3.5 w-3.5" />
                    {ranking.likesCount}
                  </span>
                  <span className="flex items-center gap-1 text-xs">
                    <Bookmark className="h-3.5 w-3.5" />
                    {ranking.savesCount}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
