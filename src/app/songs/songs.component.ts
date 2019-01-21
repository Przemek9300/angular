import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {debounceTime, switchMap} from 'rxjs/operators';

import {Song} from '../model/Song';
import {ApiServiceService} from '../service/api-service.service';
import { Playlist } from '../model/Playlist';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();

  displayedColumns: string[] = ['title', 'genre', 'duration'];
  playlists:Playlist[]
  dataSource =this.playlists;

  songs: Song[]
  searchForm: FormGroup
  apiservice: ApiServiceService
  constructor(apiservice: ApiServiceService, private fb: FormBuilder) {
    this.apiservice = apiservice;
  }
  ngOnInit() {
    this.apiservice.getPlayList().subscribe(y=>this.playlists=y,(err)=>console.log(err))
    this.searchForm =
        this.fb.group({searchInput: new FormControl('')}) 
        
        this.searchForm
            .get('searchInput')
            .valueChanges
            .pipe(
                debounceTime(300),
                switchMap(value => this.apiservice.getSongsQuery(value))

                    )
            .subscribe(y => this.songs = y)

                this.apiservice.getAllSongs()
            .subscribe(x => this.songs = x)
  }
  addSongToPlaylist(playlistSlug:string,songSlug:string){
    this.apiservice.addSongToPlaylist(playlistSlug,songSlug).subscribe(x=>console.log(x))
    this.messageEvent.emit("New Song")
  }  

}

