import type { iTunesResponse, Track } from "../types/music"

const ITUNES_BASE_URL = "https://itunes.apple.com"

export async function searchMusic(query: string, limit = 50): Promise<Track[]> {
  try {
    const response = await fetch(
      `${ITUNES_BASE_URL}/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=${limit}`,
    )

    if (!response.ok) {
      throw new Error("Failed to search music")
    }

    const data: iTunesResponse = await response.json()

    return data.results
      .filter((item) => item.previewUrl)
      .map((item) => ({
        wrapperType: item.wrapperType,
        trackId: item.trackId,
        trackName: item.trackName,
        artistName: item.artistName,
        collectionName: item.collectionName,
        artworkUrl100: item.artworkUrl100,
        previewUrl: item.previewUrl,
        trackTimeMillis: item.trackTimeMillis,
        primaryGenreName: item.primaryGenreName,
        releaseDate: item.releaseDate,
        country: item.country,
      }))
  } catch (error) {
    console.error("Error searching music:", error)
    return []
  }
}

export async function getFeaturedMusic(): Promise<Track[]> {
  const featuredQueries = [
    "taylor swift",
    "ed sheeran",
    "billie eilish",
    "the weeknd",
    "dua lipa",
    "post malone",
    "ariana grande",
    "drake",
    "olivia rodrigo",
    "harry styles",
    "adele",
    "bruno mars",
  ]

  try {
    const randomQueries = featuredQueries.sort(() => 0.5 - Math.random()).slice(0, 5);

    const results = await Promise.all(randomQueries.map(q => searchMusic(q, 10)));

    return results.flat().sort(() => 0.5 - Math.random());
  } catch (error) {
    console.error("Error fetching featured music:", error);
    return [];
  }
}


export async function getArtistTracks(artistId: number): Promise<Track[]> {
  try {
    const response = await fetch(`${ITUNES_BASE_URL}/lookup?id=${artistId}&entity=song&limit=50`)

    if (!response.ok) {
      throw new Error("Failed to fetch artist tracks")
    }

    const data: iTunesResponse = await response.json()

    return data.results
      .filter((item) => item.wrapperType === "track" && item.previewUrl)
      .map((item) => ({
        wrapperType: item.wrapperType,
        trackId: item.trackId,
        trackName: item.trackName,
        artistName: item.artistName,
        collectionName: item.collectionName,
        artworkUrl100: item.artworkUrl100,
        previewUrl: item.previewUrl,
        trackTimeMillis: item.trackTimeMillis,
        primaryGenreName: item.primaryGenreName,
        releaseDate: item.releaseDate,
        country: item.country,
      }))
  } catch (error) {
    console.error("Error fetching artist tracks:", error)
    return []
  }
}
