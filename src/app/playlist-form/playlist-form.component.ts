import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-playlist-form',
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.css']
})
export class PlaylistFormComponent implements OnInit {

  constructor(private apiService:ApiServiceService) { }
  @Output() messageEvent = new EventEmitter<string>();


  sendMessage() {
    this.messageEvent.emit("Nowa Playlista Dod")
  }
 
  playlistForm: FormGroup;

  ngOnInit() {
    this.playlistForm = new FormGroup({
      name: new FormControl(),


    })
  }
  onSubmit(){
    const value = this.playlistForm.value;
    this.apiService.creataPlaylist(value.name).subscribe(x=>this.sendMessage())
  }

}
