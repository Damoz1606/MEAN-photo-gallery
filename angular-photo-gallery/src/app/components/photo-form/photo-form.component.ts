import { Component, OnInit } from '@angular/core';
import { PhotoServiceService } from '../../services/photo-service.service'
import { Router } from "@angular/router";

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  file: File;
  photoSelected: string | ArrayBuffer;

  constructor(private photoService: PhotoServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  onPhotoSelect(file: HTMLInputElement): void {
    
    if(file.files && file.files[0]){
      this.file = <File>file.files[0];

      const reader = new FileReader();
      reader.onload = () => this.photoSelected = reader.result as string;
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto(title: HTMLInputElement, description: HTMLTextAreaElement): boolean{
    this.photoService.createPhoto(title.value, description.value, this.file)
    .subscribe(res => {
      console.log(res);
      this.router.navigate(["/photos"]);
    }, 
    err => {
      console.log(err);
    });
    return false;
  }

}
