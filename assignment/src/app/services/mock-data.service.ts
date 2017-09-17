import { Injectable } from '@angular/core';
import { Http, Request, Headers, RequestOptions, Response, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MockDataService {

  constructor(private http: Http) { }

  /**
   * Generic request method to do rest call using http
   * it also handle any http request error.
   * @param {String} url URI of the service
   * @param {RequestMethod} method HTTP Request method GET, POST, PUT, DELETE etc
   * @param {Object} [body] Payload if any to be passed along with request
   * @returns Observable of JSON data
   * @memberof MockDataService
   */
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

  /**
   * Handles any http request error.
   * @param {Response} res Error object
   * @returns Observable of Error object
   * @memberof MockDataService
   */
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

  /**
   * Get the booking data
   * @param {string} url API url from where data to be fetched
   * @returns Observable of JSON data
   * @memberof MockDataService
   */
  getBooking(url: string) {
    return this.request(url, RequestMethod.Get);
  }

}
