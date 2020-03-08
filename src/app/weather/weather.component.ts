import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../shared/weather.service';
import { Weather } from '../shared/weather';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [WeatherService]
})

export class WeatherComponent implements OnInit {
  weather: Weather = new Weather();
  selectedCity: string;
  sentLocationKeyList: any[] = [];
  fivaDaysWeather: any;
  searchText: string;
  results: string[] = [];

  weatherSrc: Subject<Weather>;

  

  constructor(private weatherService: WeatherService) {
    this.weatherService.weatherData$
    .subscribe(res=>{
      if (res) {
        this.getWeatherCity(res.cityName, res.locationKey);
      }
    })
  }

  
  
  

  ngOnInit() {
    this.getWeatherCity('Tel aviv', '215854');
  }

  selectCity(event){
    this.getWeatherCity(event.LocalizedName, event.Key);   
  }

  handleSharedWeatherList(sharedName){
    if(this.sentLocationKeyList){
      for (let i in this.sentLocationKeyList){
        if (this.sentLocationKeyList[i].name === sharedName){
        this.sentLocationKeyList.splice(parseInt(i),1)
        }
      }
      if (this.sentLocationKeyList.length == 5){
        this.sentLocationKeyList.pop();
      }
    }
  }

  getWeatherCity(name:string, key:string){
    this.weatherService.getCityName(name)
      .subscribe(
        (data: any) => {
          this.selectedCity = data[0];
          this.weather.locationKey = key;
          this.weather.cityName = name;
        }
      );

      this.weatherService.getCurrentWeatherByLocation(key).subscribe(
        (data:any)=>{
          this.weather.currWeather = data[0];
          this.weather.temperature = data[0].Temperature.Metric.Value;
          this.weather.unit = data[0].Temperature.Metric.Unit;
          this.weather.weatherText = data[0].WeatherText;        
        }
      );

      this.weatherService.getFiveNextDaysWeather(key).subscribe(
        (data)=>{
          this.fivaDaysWeather = data;
          this.weather.fivaDaysforecasts = this.fivaDaysWeather.DailyForecasts
          console.log(this.fivaDaysWeather)
        }
      )

  }


  search(event) {
    this.weatherService.getCityName(event.query).subscribe((data: any)=>{
      this.results = data;
    });    
  }

  addToFavoriate(){
    this.handleSharedWeatherList(this.weather.cityName);
    this.sentLocationKeyList.push({"locationKey":this.weather.locationKey,"name":this.weather.cityName});
    localStorage.setItem("FavoriateWeather",JSON.stringify(this.sentLocationKeyList));
  }

}
