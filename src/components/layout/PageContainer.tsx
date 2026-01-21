import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  padBottom?: boolean;
}

export function PageContainer({ 
  children, 
  className,
  padBottom = true 
}: PageContainerProps) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        "min-h-screen bg-background",
        padBottom && "pb-24",
        className
      )}
    >
      {children}
    </motion.main>
  );
}
