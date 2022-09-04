import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsApiResponse } from '../Interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private NEWS_ENDPOINT = "https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=7dfa680079a74b0ba1a6f9fd72ef36f8";
  
  private NEWS_ENDPOINT2 = "https://saurav.tech/NewsAPI/top-headlines/category/health/us.json";

  constructor(private _http: HttpClient) { }

  getAllHealthNews():Observable<NewsApiResponse>{
    return this._http.get<NewsApiResponse>(this.NEWS_ENDPOINT2) 
  }
}
