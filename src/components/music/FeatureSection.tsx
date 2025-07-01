import type { Track } from "../../types/music";
import TrackCard from "./TrackCard";

interface FeaturedSectionProps {
  tracks: Track[];
  onPlayTrack: (track: Track) => void;
}

export default function FeaturedSection({
  tracks,
  onPlayTrack,
}: FeaturedSectionProps) {
  const featuredAlbums = tracks.slice(0, 6);
  const recentlyPlayed = tracks.slice(6, 12);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredAlbums.map((track) => (
            <TrackCard
              key={track.trackId}
              track={track}
              onPlay={() => onPlayTrack(track)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {recentlyPlayed.map((track) => (
            <TrackCard
              key={track.trackId}
              track={track}
              onPlay={() => onPlayTrack(track)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
