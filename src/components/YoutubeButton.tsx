"use client";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { extractVideoId, generateEmbedUrl } from "../lib/utils";

function YoutubeButton() {
    const [open, setOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [inputValue, setInputValue] = useState("");

    const handleClose = () => {
        setOpen(false);
        setInputValue("");
    };

    const handlePlayVideo = () => {
        const videoId = extractVideoId(inputValue);
        if (videoId) {
            setVideoUrl(generateEmbedUrl(videoId));
            setOpen(false);
        } else {
            alert("Lütfen geçerli bir YouTube URL'si giriniz.");
        }
    };

    return (
        <div className="flex flex-col items-center gap-6">
            {/* Dialog for URL Input */}
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

            {/* Resizable Panel for Video */}
            {videoUrl && (
                <Card className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-lg border border-muted">
                    <CardContent className="p-0 h-full">
                        <iframe
                            src={videoUrl}
                            title="YouTube video player"
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default YoutubeButton;