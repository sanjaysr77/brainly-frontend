import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"       
import { Input } from "@/components/ui/input"         
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import axios from "axios"
import { BACKEND_URL } from "../config"

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter"
}

export function CreateContentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const titleRef = useRef<HTMLInputElement>(null)
  const linkRef = useRef<HTMLInputElement>(null)
  const tagRef = useRef<HTMLInputElement>(null)

  const [type, setType] = useState(ContentType.Youtube)

  async function addContent() {
    const title = titleRef.current?.value
    const link = linkRef.current?.value
    const tagsRaw = tagRef.current?.value || ''
    const tags = tagsRaw.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)

    await axios.post(`${BACKEND_URL}/api/v1/content`, {
      link,
      title,
      type,
      tags,
    }, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })

    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Content</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input ref={titleRef} placeholder="Title" />
          <Input ref={linkRef} placeholder="Link" />
          <Input ref={tagRef} placeholder="Tags (Optional)" />
        </div>

        <div className="flex justify-center gap-2">
          <Button
            variant={type === ContentType.Youtube ? "default" : "secondary"}
            onClick={() => setType(ContentType.Youtube)}
          >
            Youtube
          </Button>
          <Button
            variant={type === ContentType.Twitter ? "default" : "secondary"}
            onClick={() => setType(ContentType.Twitter)}
          >
            Twitter
          </Button>
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={addContent}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
