import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ResourceParams {
  pageNumber?: number;
  orderBy?: string;
  viewAll?: boolean;
  searchQuery?: string;
  searchBy?: string;
  pageSize?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private baseUrl: string = 'http://localhost:5000/api'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  get<T>(url: string, resourceParams: ResourceParams, acceptHeader?: string): Observable<HttpResponse<T[]>> {
    const headers = new HttpHeaders({
      'Accept': acceptHeader == null ? 'application/json' : acceptHeader,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Expose-Headers': 'X-Pagination'
    });

    const { pageNumber, orderBy, viewAll, searchQuery, searchBy, pageSize } = resourceParams;

    let params = new HttpParams();

    if (pageSize != null) {
      params = params.append('pageSize', pageSize.toString());
    }

    if (pageNumber != null) {
      params = params.append('pageNumber', pageNumber.toString());
    }

    if (orderBy != null) {
      params = params.append('orderBy', orderBy);
    }

    if (searchBy != null) {
      params = params.append('searchBy', searchBy);
    }

    if (searchQuery != null) {
      params = params.append('searchQuery', searchQuery);
    }

    if (viewAll != null) {
      params = params.append('viewAll', viewAll.toString());
    }

    return this.http.get<T[]>(url, { headers, observe: 'response', params });
  }

  getById<T>(url: string, acceptHeader?: string): Observable<HttpResponse<T>> {
    const headers = new HttpHeaders({
      'Accept': acceptHeader == null ? 'application/json' : acceptHeader,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.get<T>(url, { headers, observe: 'response' });
  }

  insert<T>(url: string, model: T): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    return this.http.post<T>(url, model, { headers });
  }

  update<T>(url: string, model: T): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.put<T>(url, model, { headers });
  }

  patchDelete<T>(url: string): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    return this.http.patch<T>(
      url,
      [
        {
          'op': 'replace',
          'path': 'isDeleted',
          'value': true
        }
      ],
      { headers }
    );
  }

  delete<T>(url: string): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    return this.http.patch<T>(
      url,
      [
        {
          'op': 'replace',
          'path': 'isDeleted',
          'value': true
        },
        {
          'op': 'replace',
          'path': 'deletedBy',
          'value': '2016-06-0468'
        },
        {
          'op': 'replace',
          'path': 'modifiedBy',
          'value': '2016-06-0468'
        }
      ],
      { headers }
    );
  }
}