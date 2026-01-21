import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Category } from "@/types";

interface CategoryPillsProps {
  categories: Category[];
  selectedCategory?: string;
  onSelect: (categoryId: string | undefined) => void;
}

export function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(undefined)}
      >
        <Badge
          variant={!selectedCategory ? "default" : "category"}
          className="cursor-pointer whitespace-nowrap px-4 py-2"
        >
          ✨ Tutto
        </Badge>
      </motion.button>
      
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(category.id)}
        >
          <Badge
            variant={selectedCategory === category.id ? "default" : "category"}
            className="cursor-pointer whitespace-nowrap px-4 py-2"
          >
            {category.icon} {category.name}
          </Badge>
        </motion.button>
      ))}
    </div>
  );
}
