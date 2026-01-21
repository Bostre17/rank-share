import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Plus, 
  Globe, 
  Lock, 
  Image as ImageIcon,
  X 
} from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { DraggableList } from "@/components/ranking/DraggableList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { RankItem } from "@/types";
import { mockCategories } from "@/data/mockData";
import { toast } from "sonner";

const Create = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [items, setItems] = useState<RankItem[]>([]);
  
  // Dialog state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RankItem | null>(null);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");

  const handleAddItem = () => {
    if (!newItemTitle.trim()) return;

    if (editingItem) {
      setItems(items.map(item => 
        item.id === editingItem.id 
          ? { ...item, title: newItemTitle, description: newItemDescription }
          : item
      ));
    } else {
      const newItem: RankItem = {
        id: Date.now().toString(),
        title: newItemTitle,
        description: newItemDescription || undefined,
        position: items.length + 1,
      };
      setItems([...items, newItem]);
    }

    setNewItemTitle("");
    setNewItemDescription("");
    setEditingItem(null);
    setIsAddDialogOpen(false);
  };

  const handleEditItem = (item: RankItem) => {
    setEditingItem(item);
    setNewItemTitle(item.title);
    setNewItemDescription(item.description || "");
    setIsAddDialogOpen(true);
  };

  const handleDeleteItem = (itemId: string) => {
    setItems(items
      .filter(item => item.id !== itemId)
      .map((item, index) => ({ ...item, position: index + 1 }))
    );
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast.error("Inserisci un titolo per la classifica");
      return;
    }
    if (items.length < 2) {
      toast.error("Aggiungi almeno 2 elementi");
      return;
    }

    // Here we would save to database
    toast.success("Classifica creata con successo!");
    navigate("/profile");
  };

  return (
    <PageContainer>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b">
        <div className="container flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold"
            >
              Nuova Classifica
            </motion.h1>
          </div>
          <Button variant="hero" onClick={handleSave}>
            Salva
          </Button>
        </div>
      </header>

      <div className="container px-4 py-6 space-y-6">
        {/* Title & Description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="title">Titolo</Label>
            <Input
              id="title"
              placeholder="Es. Migliori film di sempre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="description">Descrizione (opzionale)</Label>
            <Textarea
              id="description"
              placeholder="Descrivi la tua classifica..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 min-h-[80px]"
            />
          </div>
        </motion.div>

        {/* Category */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Label>Categoria</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {mockCategories.map((cat) => (
              <Badge
                key={cat.id}
                variant={category === cat.id ? "default" : "category"}
                className="cursor-pointer px-4 py-2"
                onClick={() => setCategory(cat.id)}
              >
                {cat.icon} {cat.name}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Privacy Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between rounded-xl border bg-card p-4"
        >
          <div className="flex items-center gap-3">
            {isPublic ? (
              <Globe className="h-5 w-5 text-badge-public" />
            ) : (
              <Lock className="h-5 w-5 text-muted-foreground" />
            )}
            <div>
              <p className="font-medium">
                {isPublic ? "Classifica Pubblica" : "Classifica Privata"}
              </p>
              <p className="text-xs text-muted-foreground">
                {isPublic 
                  ? "Tutti possono vedere questa classifica" 
                  : "Solo tu puoi vedere questa classifica"
                }
              </p>
            </div>
          </div>
          <Switch
            checked={isPublic}
            onCheckedChange={setIsPublic}
          />
        </motion.div>

        {/* Items List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <Label>Elementi ({items.length})</Label>
            <Button
              variant="soft"
              size="sm"
              onClick={() => {
                setEditingItem(null);
                setNewItemTitle("");
                setNewItemDescription("");
                setIsAddDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Aggiungi
            </Button>
          </div>

          {items.length > 0 ? (
            <DraggableList
              items={items}
              onReorder={setItems}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
            />
          ) : (
            <div className="rounded-xl border border-dashed bg-muted/30 p-8 text-center">
              <p className="text-muted-foreground">
                Aggiungi elementi alla tua classifica
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-3"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Aggiungi elemento
              </Button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Add/Edit Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Modifica elemento" : "Aggiungi elemento"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="itemTitle">Nome</Label>
              <Input
                id="itemTitle"
                placeholder="Es. Il Padrino"
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="itemDescription">Note (opzionale)</Label>
              <Input
                id="itemDescription"
                placeholder="Es. Un capolavoro senza tempo"
                value={newItemDescription}
                onChange={(e) => setNewItemDescription(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsAddDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleAddItem}>
              {editingItem ? "Salva" : "Aggiungi"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default Create;
