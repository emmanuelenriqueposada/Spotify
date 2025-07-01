import { IoPlay } from "react-icons/io5";
import type { Track } from "../../types/music";
import { Button } from "../ui/Button";

interface TrackCardProps {
  track: Track;
  onPlay: () => void;
}

export default function TrackCard({ track, onPlay }: TrackCardProps) {
  return (
    <div className="bg-gray-800/40 p-4 rounded-lg hover:bg-gray-800/60 transition-colors group">
      <div className="relative mb-4">
        <img
          src={track.artworkUrl100 || "/placeholder.svg"}
          alt={track.trackName}
          className="w-full aspect-square object-cover rounded-md"
        />
        <Button
          variant="default"
          size="sm"
          className="absolute bottom-2 right-2 rounded-full w-12 h-12 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 hover:bg-green-400"
          onClick={onPlay}
        >
          <IoPlay className="h-5 w-5 ml-1" />
        </Button>
      </div>

      <div>
        <h3 className="font-semibold truncate mb-1">{track.trackName}</h3>{" "}
        <p className="text-sm text-gray-400 truncate">{track.artistName}</p>
      </div>
    </div>
  );
}
