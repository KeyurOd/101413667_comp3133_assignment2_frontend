import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private uploadUrl: string;

  constructor(private http: HttpClient) {
    const baseUrl = environment.backendUrl || 'https://one01413667-comp3133-assignment2-backend.onrender.com';
    this.uploadUrl = `${baseUrl}/upload`;
    console.log('FileUploadService uploadUrl:', this.uploadUrl); // Debug log
  }

  uploadFile(file: File): Observable<any> {
    console.log('Uploading file to:', this.uploadUrl); // Additional debug log
    const formData = new FormData();
    formData.append('profilePicture', file);
    return this.http.post(this.uploadUrl, formData);
  }
}