import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:4242/api/v1/items';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  constructor(private http: HttpClient) {}

  getAllItems(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getItem(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  createItem(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateItem(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteItem(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAllItems(): Observable<any> {
    return this.http.delete(baseUrl);
  }
}
