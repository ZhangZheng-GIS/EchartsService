import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const data_url = './assets/FPQYYDFBZ.json';

@Injectable()
export class DataService {

  constructor(private _http: HttpClient) { }

  getData(): Observable<any> {
    return this._http.get(data_url);
  }
}
