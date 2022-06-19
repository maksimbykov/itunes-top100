import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { ItunesService } from '../services/itunes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private itunesService: ItunesService) { }
  
  albumsList!: Item[];

  ngOnInit(): void {
    this.itunesService.getAlbumsInfo().subscribe(
      res => {
        this.albumsList = res;
      }
    );
  }

}
