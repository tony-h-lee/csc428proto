import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  images = [
  '../assets/Photos/4KK2_20150823_152106_985.jpg',
  '../assets/Photos/4KK2_20150829_162922_083.jpg' 
  ];
}
