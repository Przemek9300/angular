import { Component, OnInit } from '@angular/core';
import { Song } from '../model/Song';
import { Playlist } from '../model/Playlist';
import { PlayerService } from '../service/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  song:Song
  playNow:boolean

  constructor(private playerService:PlayerService) { }

  ngOnInit() {
     this.playNow=true;
     this.song = this.playerService.getSong()
     this.playerService.notifyObservable$.subscribe(x=>this.song = this.playerService.getSong())
     
  }

  play(){
    if(this.playNow){
    this.playNow = false
    }
    else{
      this.playerService.getSong()
      this.playNow = true
    }
  }
  next(){
    this.song = this.playerService.nextSong()
  }
  prev(){
    this.song = this.playerService.prevSong()
  }

}
