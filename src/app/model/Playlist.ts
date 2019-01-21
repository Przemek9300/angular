import { Song } from "./Song";


export interface Playlist {
    name:string
    slug:string
    picture:string
    song: Song[]
}