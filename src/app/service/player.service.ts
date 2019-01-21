import { Injectable } from '@angular/core';
import { Song } from '../model/Song';
import { Playlist } from '../model/Playlist';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private notify = new Subject<any>();
  notifyObservable$ = this.notify.asObservable();
  i:number
  playlist:Playlist
  song:Song
  setPlaylist(p:Playlist){
    this.playlist = p
  }
  getPlaylist(){
    return this.playlist
  }
  getSong(){
    if(this.playlist)
    return this.playlist.song[this.i%this.playlist.song.length]
  }
  nextSong(){
    
    this.i++;
    console.log(this.playlist.song)
    return this.playlist.song[this.i%this.playlist.song.length]
  }
  prevSong(){
    this.i--;
    return this.playlist.song[this.i%this.playlist.song.length]
  }
  notifyAll(){
    this.notify.next();
  }
  constructor() { 
    this.i = 0;
  }
}
