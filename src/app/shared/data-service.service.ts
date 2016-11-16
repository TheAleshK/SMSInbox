import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class DataServiceService {

    constructor(private http: Http) {

    }

    // Uses http.get() to load a single JSON file
    getMessageIn(id: number) {
        return this.http.get('http://www.smscity.net/getSMSInboxMessageIn.asp?id=' + id).map((res: Response) => res.json());
    }

    getMessageOut(id: number) {
        return this.http.get('http://www.smscity.net/getSMSInboxMessageOut.asp?id=' + id).map((res: Response) => res.json());
    }


    // Uses Observable.forkJoin() to run multiple concurrent http.get() requests.
    // The entire operation will result in an error state if any single request fails.
    getMessagesInOut(id: number) {
        return Observable.forkJoin(
            this.http.get('http://www.smscity.net/getSMSInboxMessageIn.asp?id=' + id).map((res: Response) => res.json()),
            this.http.get('http://www.smscity.net/getSMSInboxMessageOut.asp?id=' + id).map((res: Response) => res.json())
        );
    }

    sendMessage(message) {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        // let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(message);
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.post('http://www.smscity.net/setdata.asp?type=4', body, headers).map((res: Response) => res.json());
    }

    setNickName(message) {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        // let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(message);
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.post('http://www.smscity.net/setdata.asp?type=2', body, headers).map((res: Response) => res.json());
    }

    setDeleted(message) {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        // let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(message);
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.post('http://www.smscity.net/setdata.asp?type=3', body, headers).map((res: Response) => res.json());
    }

    setMessageColor(message) {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        // let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(message);
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.post('http://www.smscity.net/setdata.asp?type=1', body, headers).map((res: Response) => res.json());
    }





    updateFood(food) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(food);
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.put('/api/food/' + food.id, body, headers).map((res: Response) => res.json());
    }

    deleteFood(food) {
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.delete('/api/food/' + food.id);
    }

}
