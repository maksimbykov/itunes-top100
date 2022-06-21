import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Album } from '../models/album';
import { ITunesResponse } from '../models/itunes-response';

@Injectable({
  providedIn: 'root'
})
export class ItunesService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl: string = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";

  public getAlbumsInfo(): Observable<Album[]> {
    return this.httpClient
      .get<ITunesResponse>(this.apiUrl)
      .pipe(map(result => result.feed.entry));
  }

}
