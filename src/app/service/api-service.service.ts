import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, filter, map, mergeMap} from 'rxjs/operators';

import {Playlist} from '../model/Playlist';
import {Profile} from '../model/Profile'
import {Song} from '../model/Song'



    @Injectable({providedIn: 'root'}) export class ApiServiceService {

      constructor(private http: HttpClient) {}

      public getProfile(): Observable<Profile> {return this.http.get<Profile>(`http://localhost:8080/profile`)
      .pipe(map((x) => <Profile>{username: x.username, playlist: x.playlist
        .map(y => <Playlist>{name: y.name, picture: y.picture, slug:y.slug})

      }))
      } public getPlayList(): Observable<Playlist[]> {
        return this.http.get<Playlist []>('http://localhost:8080/playlist').pipe(
          map((x)=>x.map((y)=><Playlist>{name:y.name,picture:y.picture,song:y.song.map(c=><Song>{title:c.title,genre:c.genre } ), slug:y.slug} ))
        )
      } public getAllSongs(): Observable<Song[]> {
        return this.http.get<Song []>('http://localhost:8080/songs').pipe(
          map((x)=>x.map((y)=><Song>{title:y.title,genre:y.genre,duration:y.duration,slug:y.slug, show :false} ))
        )
      } public getSongsQuery(qeury: string): Observable<Song[]> {
        return this.http.get<Song []>('http://localhost:8080/songs',{params:{q:qeury}}).pipe(
          map((x)=>x.map((y)=><Song>{title:y.title,genre:y.genre,duration:y.duration, slug:y.slug,show:false} ))
        )
      } public addSongToPlaylist(playlistSlug: string, songSlug: string) {
        return this.http.post('http://localhost:8080/playlist/'+playlistSlug+'/songs',{slug:songSlug})
      }
      public creataPlaylist(name: string) {
        return this.http.post('http://localhost:8080/playlist',{name:name})
      }
      public deletePlaylist(slug: string) {
        return this.http.delete('http://localhost:8080/playlist/'+slug)
      }

    }
