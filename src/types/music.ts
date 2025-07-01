export interface Track {
  wrapperType: string;
  trackId: number
  trackName: string
  artistName: string
  collectionName: string
  artworkUrl100: string
  previewUrl: string
  trackTimeMillis: number
  primaryGenreName: string
  releaseDate: string
  country: string
}

export interface iTunesResponse {
  resultCount: number
  results: Track[]
}
