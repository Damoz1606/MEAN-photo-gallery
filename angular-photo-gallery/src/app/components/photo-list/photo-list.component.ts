import { Component, OnInit } from '@angular/core';
import { PhotoServiceService } from '../../services/photo-service.service'
import { Router } from "@angular/router";

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos = [];

  constructor(private photoService: PhotoServiceService, private router: Router) { }

  ngOnInit(): void {
    this.photoService.getPhotos()
    .subscribe(res => {
      this.photos = res['photos'];
    }, 
    err => {
      console.log(err);
    });
  }

  selectedCard(id: string): void{
    this.router.navigate(["/photos/" + id]);
  }

}
