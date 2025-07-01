import { useState, useEffect } from "react";
import type { Track } from "../../types/music";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/SideBar";
import MusicPlayer from "../../components/music/MusicPlayer";
import MobileNav from "../../components/layout/MovileNav";
import MainContent from "../../components/MainContent";
import { useItemContext } from "../../context/useItemContext";

export default function MainPage() {
  const { user } = useItemContext();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  console.log(user);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePauseTrack = () => {
    setIsPlaying(false);
  };

  const handleResumeTrack = () => {
    setIsPlaying(true);
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {!isMobile && <Sidebar />}

        <div className="flex-1 flex flex-col">
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <MainContent
            searchQuery={searchQuery}
            onPlayTrack={handlePlayTrack}
          />
        </div>
      </div>

      {currentTrack && (
        <MusicPlayer
          track={currentTrack}
          isPlaying={isPlaying}
          onPlay={handleResumeTrack}
          onPause={handlePauseTrack}
        />
      )}

      {isMobile && <MobileNav />}
    </div>
  );
}
