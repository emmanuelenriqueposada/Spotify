import { useState, useRef, useEffect } from "react";
import {
  IoPlay,
  IoPause,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoVolumeHigh,
} from "react-icons/io5";
import type { Track } from "../../types/music";
import { Button } from "../ui/Button";
import { formatDuration } from "../../utils/utils";
import { Slider } from "../ui/Slider";

interface MusicPlayerProps {
  track: Track;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}

export default function MusicPlayer({
  track,
  isPlaying,
  onPlay,
  onPause,
}: MusicPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume / 100;
    }
  }, [volume]);

  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value;
      setCurrentTime(value);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  return (
    <div className="bg-gray-900 border-t border-gray-800 p-4">
      <audio ref={audioRef} src={track.previewUrl} onEnded={onPause} />

      <div className="flex items-center justify-between">
        {/* Track Info */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <img
            src={track.artworkUrl100 || "/placeholder.svg"}
            alt={track.trackName}
            className="w-14 h-14 rounded"
          />
          <div className="min-w-0">
            <p className="font-medium truncate">{track.trackName}</p>
            <p className="text-sm text-gray-400 truncate">{track.artistName}</p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          <div className="flex items-center space-x-4">
            <Button>
              <IoPlaySkipBack className="h-4 w-4" />
            </Button>
            <Button
              className="rounded-full w-10 h-10 p-0 bg-white text-black hover:bg-gray-200"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <IoPause className="h-5 w-5" />
              ) : (
                <IoPlay className="h-5 w-5 ml-1" />
              )}
            </Button>
            <Button>
              <IoPlaySkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatDuration(currentTime * 1000)}
            </span>
            <Slider
              value={currentTime}
              max={duration || 100}
              step={1}
              onChange={(e) => handleSeek(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-xs text-gray-400 w-10">
              {formatDuration((duration || 0) * 1000)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="hidden md:flex items-center space-x-2 flex-1 justify-end">
          <IoVolumeHigh className="h-4 w-4" />
          <Slider
            value={volume}
            max={100}
            step={1}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
}
