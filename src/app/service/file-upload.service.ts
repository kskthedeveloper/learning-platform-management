import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string> = new Observable<string>();
  fileUrl: Observable<string | null>;

  constructor(private storage: AngularFireStorage) { }

  uploadFile(filePath: string, event) {
    const file = event.target.files[0];
    const task = this.storage.upload(filePath + '/' + file.name, file);
    const fileRef = this.storage.ref(filePath);

    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        console.log('Finishing upload ', this.downloadURL);
      })
    ).subscribe();
  }

  downloadFile(filePath: string, fileName: string) {
    const ref = this.storage.ref(filePath + '/' + fileName);
    this.fileUrl = ref.getDownloadURL();
  }
}
