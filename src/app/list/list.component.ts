import { AfterViewChecked, Component, DoCheck, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Album } from '../models/album';
import { ItunesService } from '../services/itunes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewChecked {

  constructor(private itunesService: ItunesService) { }

  @Input()
  albumName!: FormControl;

  albumsList!: Album[];
  cachedList!: Album[];

  ngOnInit(): void {
    this.itunesService
      .getAlbumsInfo()
      .subscribe(
        res => this.albumsList = this.cachedList = res.map(a => {

          a.liked = this.getSavedLikes().includes(a.id.attributes['im:id']);
          return a;
        })
      );

    this.albumName
      .valueChanges.subscribe(
        value => {
          if (value) {
            this.albumsList = this.cachedList.filter(i => i.title.label.toLowerCase().includes(value.toLowerCase()))
          } else {
            this.albumsList = this.cachedList;
          }
        }
      );
  }

  ngAfterViewChecked() {
    if (this.cachedList)
      this.handleLikes(this.getSavedLikes());
  }

  addRemoveToFavourites(id: string) {
    let likedAlbums = this.getSavedLikes();
    let indx = likedAlbums?.indexOf(id);
    if (indx > -1) {
      likedAlbums.splice(indx, 1);
    } else {
      likedAlbums.push(id);
    }
    localStorage.setItem('liked_albums', JSON.stringify(likedAlbums));
    this.handleLikes(likedAlbums);
  }

  handleLikes(likedAlbums: string[]) {
    this.albumsList = this.cachedList.map(a => {
      a.liked = likedAlbums.includes(a.id.attributes['im:id']);
      return a;
    });
  }

  getSavedLikes() {
    let likedAlbums: string[] = [];
    let likedAlbumsStr = localStorage.getItem('liked_albums');
    if (likedAlbumsStr) {
      likedAlbums = JSON.parse(likedAlbumsStr) as string[];
    }
    return likedAlbums;
  }

}
