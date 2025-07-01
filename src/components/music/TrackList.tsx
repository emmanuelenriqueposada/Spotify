import { IoPlay, IoPause } from "react-icons/io5";
import type { Track } from "../../types/music";
import { Button } from "../ui/Button";
import { formatDuration } from "../../utils/utils";

interface TrackListProps {
  tracks: Track[];
  onPlayTrack: (track: Track) => void;
  currentTrack?: Track | null;
  isPlaying?: boolean;
}

export default function TrackList({
  tracks,
  onPlayTrack,
  currentTrack,
  isPlaying,
}: TrackListProps) {
  if (tracks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>No tracks found. Try searching for something else.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tracks.map((track, index) => (
        <div
          key={track.trackId}
          className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/10 transition-colors group"
        >
          <div className="w-8 text-center text-gray-400 group-hover:hidden">
            {index + 1}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 hidden group-hover:flex items-center justify-center"
            onClick={() => onPlayTrack(track)}
          >
            {currentTrack?.trackId === track.trackId && isPlaying ? (
              <IoPause className="h-4 w-4" />
            ) : (
              <IoPlay className="h-4 w-4" />
            )}
          </Button>

          <div className="w-12 h-12 bg-gray-800 rounded overflow-hidden flex-shrink-0">
            <img
              src={track.artworkUrl100 || "/placeholder.svg"}
              alt={track.trackName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{track.trackName}</p>
            <p className="text-sm text-gray-400 truncate">{track.artistName}</p>
          </div>

          <div className="hidden md:block text-sm text-gray-400 min-w-0 flex-1">
            <p className="truncate">{track.collectionName}</p>
          </div>

          <div className="text-sm text-gray-400">
            {formatDuration(track.trackTimeMillis)}
          </div>
        </div>
      ))}
    </div>
  );
}
