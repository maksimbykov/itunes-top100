import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { FavouritesComponent } from './favourites/favourites.component';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-0vwWkmjcxByi0Q9dYFic7FuF5ENAZiY",
  authDomain: "itunes-top100.firebaseapp.com",
  projectId: "itunes-top100",
  storageBucket: "itunes-top100.appspot.com",
  messagingSenderId: "192119451040",
  appId: "1:192119451040:web:f835cef4c96a26769d88c5",
  measurementId: "G-TZ2XNE7BH3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private offcanvasService: NgbOffcanvas) {  }

  name = new FormControl('');

  openFavourites(viewData: any) {
    let canvasRef = this.offcanvasService.open(FavouritesComponent, { position: 'end' });
    canvasRef.componentInstance.viewData = viewData;
  }
  
}
