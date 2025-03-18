"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle } from "lucide-react"

interface List {
  id: string
  name: string
  imageUrl: string
}

interface AddToListDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddToList: (listId: string) => void
  onCreateNewList: (name: string) => void
}

const sampleLists: List[] = [
  {
    id: "1",
    name: "Favorite Homes",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-03%20at%204.15.01%E2%80%AFPM-tTXF8GBH8cjNuGqQz7giNlq6giwWF2.png",
  },
  {
    id: "2",
    name: "Investment Properties",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-03%20at%204.15.01%E2%80%AFPM-tTXF8GBH8cjNuGqQz7giNlq6giwWF2.png",
  },
  {
    id: "3",
    name: "Dream Locations",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-03%20at%204.15.01%E2%80%AFPM-tTXF8GBH8cjNuGqQz7giNlq6giwWF2.png",
  },
]

export function AddToListDialog({ isOpen, onClose, onAddToList, onCreateNewList }: AddToListDialogProps) {
  const [lists, setLists] = useState<List[]>(sampleLists)
  const [isCreatingNewList, setIsCreatingNewList] = useState(false)
  const [newListName, setNewListName] = useState("")

  const handleCreateNewList = () => {
    if (newListName.trim()) {
      const newList = {
        id: `${lists.length + 1}`,
        name: newListName.trim(),
        imageUrl:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-03%20at%204.15.01%E2%80%AFPM-tTXF8GBH8cjNuGqQz7giNlq6giwWF2.png", // Default image for new lists
      }
      setLists([...lists, newList])
      onCreateNewList(newListName.trim())
      setNewListName("")
      setIsCreatingNewList(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to List</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {lists.map((list) => (
            <div
              key={list.id}
              className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => onAddToList(list.id)}
            >
              <Image
                src={list.imageUrl || "/placeholder.svg"}
                alt={list.name}
                width={50}
                height={50}
                className="rounded-md object-cover"
              />
              <span className="flex-grow">{list.name}</span>
            </div>
          ))}
        </div>
        <DialogFooter>
          {isCreatingNewList ? (
            <div className="flex w-full space-x-2">
              <Input
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="New list name"
                maxLength={50}
              />
              <Button onClick={handleCreateNewList} disabled={!newListName.trim()}>
                Create
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsCreatingNewList(true)} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create new list
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

