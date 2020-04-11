import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class ImageService {

  constructor(private http: HttpClient) {}


  public uploadImage(image: File): Observable<Response> {
    const formData = new FormData();

    formData.append('image', image);
    // Send image to api
    return this.http.post('/api/v1/image-upload', formData);
  }
}
