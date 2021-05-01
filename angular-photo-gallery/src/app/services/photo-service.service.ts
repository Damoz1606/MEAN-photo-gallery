import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Photo } from '../interfaces/Photo'
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root'
})
export class PhotoServiceService {

  URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {  }

  createPhoto(title: string, description: string, photo: File) {
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("image", photo);

    return this.http.post(this.URI, fd);
  }

  getPhotos(){
    return this.http.get(this.URI);
  }

  getPhoto(id: string){
    return this.http.get(`${this.URI}/${id}`);
  }

  updatePhoto(id: string, photo: Object){
    return this.http.put(`${this.URI}/${id}`, photo);
  }

  deletePhoto(id: string){
    return this.http.delete(`${this.URI}/${id}`);
  }
}
