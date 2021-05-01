import { Component, OnInit } from '@angular/core';
import { PhotoServiceService } from '../../services/photo-service.service'
import { ActivatedRoute, Router } from "@angular/router";

import { Photo } from "../../interfaces/Photo";

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {

  photo: Photo;

  constructor(private photoService: PhotoServiceService, private router: Router, private activated: ActivatedRoute) { }

  ngOnInit(): void {
    this.activated.params
    .subscribe(res => {
      this.photoService.getPhoto(res['id'])
      .subscribe(response => {
        this.photo = <Photo>response['response'];
      },
      err => {
        console.log(err);
      });
    });
  }

  deletePhoto(id: string): void{
    this.activated.params
    .subscribe(res => {
      this.photoService.deletePhoto(res['id'])
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/photos']);
      },
      error => {
        console.log(error);  
      });
    },
    err => {
      console.log(err);
    });
  }

  updatePhoto(id: string, $title: HTMLInputElement, $description: HTMLTextAreaElement): boolean{
    const aux = {
      title: $title.value,
      description: $description.value,
      imagePath: this.photo.imagePath
    }

    this.photoService.updatePhoto(id, aux).subscribe(res => {
      console.log(res);
      this.router.navigate(['/photos']);
    },
    err => {
      console.log(err);
    });
    return false;
  }

}
