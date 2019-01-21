import {Component, OnInit} from '@angular/core';

import {Playlist} from '../model/Playlist';
import {Profile} from '../model/Profile'
import {User} from '../model/User';
import {ApiServiceService} from '../service/api-service.service';
import { PlayerService } from '../service/player.service';
import { Subject } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {




  addPlaylist($event) {
    this.apiservice.getPlayList().subscribe(y=>this.playlists=y,(err)=>console.log(err))
  }
  addSongToPlaylist($event) {
    this.apiservice.getPlayList().subscribe(y=>this.playlists=y,(err)=>console.log(err))
  }
  profile: Profile;
  playlists: Playlist[];
  apiservice: ApiServiceService;
  constructor( private router:Router,private auth:AuthService,apiservice: ApiServiceService, private playerService: PlayerService) {
    this.apiservice = apiservice;
  }

  ngOnInit() {
    this.apiservice.getProfile().subscribe(x => this.profile = x,(err)=>console.log(err))
    this.apiservice.getPlayList().subscribe(y=>{this.playlists=y; this.playerService.setPlaylist(this.playlists[0])},(err)=>console.log(err))
   
  }

  public removePlaylist(playlist:Playlist){
    this.playlists=  this.playlists.filter(item=>{return item!=playlist})
    this.apiservice.deletePlaylist(playlist.slug).subscribe(x=>console.log(x))
  }

  setupPlaylist(playlist:Playlist){
    this.playerService.setPlaylist(playlist)
    this.playerService.notifyAll()
    

  }
  loggout(){
    
    this.auth.loggout()
    this.router.navigateByUrl('/login')  }
 
}
