import { EventEmitter, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Weather } from './weather';

@Injectable()
export class WeatherService {

  _weather: Weather = new Weather();

  
  private weatherData = new Subject<Weather>();
  public weatherData$ = this.weatherData.asObservable();




  apiKey ="gXtlKAmSEliHpo9pPygkPVeAwGbKibKz"


  constructor(private http: HttpClient) {}

  getCityName(city: string){
    return this.http.get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=' +city+ '&apikey=' +this.apiKey)
  }

  getCurrentWeatherByLocation(locationKey: string){
    return this.http.get('http://dataservice.accuweather.com/currentconditions/v1/'+ locationKey+ '?apikey='+ this.apiKey)
  }

  getFiveNextDaysWeather(locationKey){
    return this.http.get('http://dataservice.accuweather.com/forecasts/v1/daily/5day/'+ locationKey+ '?apikey='+ this.apiKey)
  }

  goToWeatherPage(weatherObj: Weather){
    // this.getWeatherCity(weatherObj.cityName, weatherObj.locationKey)
    this.weatherData.next(weatherObj);
  }


}
