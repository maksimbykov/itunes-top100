import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Album } from '../models/album';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  @Input() public viewData!: Album[];

  constructor(readonly offcanvas: NgbActiveOffcanvas) { }

  ngOnInit(): void {
    this.viewData = this.viewData.filter(a => a.liked);
  }

  clearFavourites() {
    localStorage.removeItem('liked_albums');
    this.viewData = [];
  }

}
