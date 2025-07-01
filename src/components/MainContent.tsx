import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import type { Track } from "../types/music";
import { getFeaturedMusic, searchMusic } from "../utils/api";
import TrackList from "./music/TrackList";
import FeaturedSection from "./music/FeatureSection";

interface MainContentProps {
  searchQuery: string;
  onPlayTrack: (track: Track) => void;
}

export default function MainContent({
  searchQuery,
  onPlayTrack,
}: MainContentProps) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [featuredTracks, setFeaturedTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [featuredLoading, setFeaturedLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedMusic = async () => {
      try {
        const featured = await getFeaturedMusic();
        setFeaturedTracks(featured);
      } catch (error) {
        console.error("Error loading featured music:", error);
      } finally {
        setFeaturedLoading(false);
      }
    };

    loadFeaturedMusic();
  }, []);

  useEffect(() => {
    const searchTracks = async () => {
      if (!searchQuery.trim()) {
        setTracks([]);
        return;
      }

      setLoading(true);
      try {
        const results = await searchMusic(searchQuery);
        setTracks(results);
      } catch (error) {
        console.error("Error searching music:", error);
        setTracks([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchTracks, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black p-6">
      {searchQuery ? (
        <div>
          <h2 className="text-2xl font-bold mb-6">Search Results</h2>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <AiOutlineLoading3Quarters className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <TrackList tracks={tracks} onPlayTrack={onPlayTrack} />
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Good evening</h1>
            <p className="text-gray-400">
              Discover new music and enjoy your favorites
            </p>
          </div>

          {featuredLoading ? (
            <div className="flex items-center justify-center py-12">
              <AiOutlineLoading3Quarters className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <FeaturedSection
              tracks={featuredTracks}
              onPlayTrack={onPlayTrack}
            />
          )}
        </div>
      )}
    </main>
  );
}
