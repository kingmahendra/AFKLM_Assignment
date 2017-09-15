import { Injectable } from '@angular/core';
import { Http, Request, Headers, RequestOptions, Response, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MockDataService {
  
  constructor(private http: Http) { }

  request(url: String, method: RequestMethod, body?: Object) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({
      url: `${url}`,
      method: method,
      headers: headers
    });

    if (body) {
      requestOptions.body = body;
    }
    const request = new Request(requestOptions);
    return this.http.request(request)
      .map((res: Response) => res.json())
      .catch((res: Response) => this.onRequestError(res));
  } 

  onRequestError(res: Response) {
    const statusCode = res.status;
    const body = res.json();

    const error = {
      statusCode: statusCode,
      message: body.error
    };
    console.error(error);
    return Observable.throw(error);
  }

  getBooking(url: string) {
    return this.request(url, RequestMethod.Get);
  }

}
