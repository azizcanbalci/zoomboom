"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { extractVideoId, generateEmbedUrl } from "../lib/utils";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

function YoutubeButton() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const setVideoUrl = useMutation(api.video.setVideoUrl);

  const handleClose = () => {
    setOpen(false);
    setInputValue("");
  };

  const handlePlayVideo = async () => {
    const videoId = extractVideoId(inputValue);
    if (videoId) {
      const embedUrl = generateEmbedUrl(videoId);
      await setVideoUrl({ url: embedUrl });
      setOpen(false);
      setInputValue("");
    } else {
      alert("Lütfen geçerli bir YouTube URL'si giriniz.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">YouTube Videosu Aç</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>YouTube Video URL'si</DialogTitle>
          <DialogDescription>
            İzlemek istediğiniz videonun bağlantısını girin.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="https://www.youtube.com/watch?v=..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <DialogFooter className="flex justify-between">
          <Button onClick={handlePlayVideo}>Oynat</Button>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default YoutubeButton;
