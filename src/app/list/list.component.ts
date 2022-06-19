import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Item } from '../models/item';
import { ItunesService } from '../services/itunes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private itunesService: ItunesService) { }

  @Input()
  albumName!: FormControl;

  albumsList!: Item[];
  cachedList!: Item[];

  ngOnInit(): void {
    this.itunesService
      .getAlbumsInfo()
      .subscribe(
        res => this.albumsList = this.cachedList = res
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

}
