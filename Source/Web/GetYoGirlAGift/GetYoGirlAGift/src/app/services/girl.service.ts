import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Girl } from '../models/girl';

@Injectable()
export class girlService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Girl[]>('${config.apiUrl}/girls');
  }

  getById(id: number) {
    return this.http.get('${config.apiUrl}/girls/' + id);
  }

  register(girl: Girl) {
    return this.http.post('${config.apiUrl}/users/register', Girl);
  }

  update(girl: Girl) {
    return this.http.put('${config.apiUrl}/girls/' + Girl.Id, Girl);
  }

  delete(id: number) {
    return this.http.delete('${config.apiUrl}/girls/' + id);
  }
}
