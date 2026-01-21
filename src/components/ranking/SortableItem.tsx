import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { RankItem } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SortableItemProps {
  item: RankItem;
  onEdit?: (item: RankItem) => void;
  onDelete?: (itemId: string) => void;
}

export function SortableItem({ item, onEdit, onDelete }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getRankStyle = (position: number) => {
    if (position === 1) return "bg-rank-gold";
    if (position === 2) return "bg-rank-silver";
    if (position === 3) return "bg-rank-bronze";
    return "bg-muted";
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 rounded-xl border bg-card p-3 shadow-soft transition-shadow",
        isDragging && "shadow-elevated z-50"
      )}
      layout
    >
      <button
        className="touch-none text-muted-foreground hover:text-foreground"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5" />
      </button>

      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
          getRankStyle(item.position)
        )}
      >
        {item.position}
      </span>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{item.title}</p>
        {item.description && (
          <p className="text-xs text-muted-foreground truncate">
            {item.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-1">
        {onEdit && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit(item)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
        {onDelete && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => onDelete(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
