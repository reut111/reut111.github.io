import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../shared/weather.service';
import { Subject } from 'rxjs';
import { Weather } from '../shared/weather';
import { Route } from '@angular/compiler/src/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent implements OnInit {
  favoriateList: any[]=[];
  weatherFavoriateList:any[]=[];
  weatherSrc: Subject<Weather>;

  constructor(private weatherService: WeatherService, private router:Router) {
   
   }

  ngOnInit() {
   let that = this;
    this.favoriateList = JSON.parse(localStorage.getItem("FavoriateWeather"));
    this.favoriateList.forEach(ele=>
      this.weatherService.getCurrentWeatherByLocation(ele.locationKey).subscribe(data =>{
        let weatherObj = new Weather();
        weatherObj.cityName = ele.name;
        weatherObj.locationKey = ele.locationKey;
        weatherObj.weatherText = data[0].WeatherText;
        weatherObj.temperature = data[0].Temperature.Metric.Value;
        weatherObj.unit = data[0].Temperature.Metric.Unit;
        this.weatherFavoriateList.push(weatherObj);
      })
    )
  }

  goToWeatherPage(item) {
    this.router.navigate(['../weather']);
    this.weatherService.goToWeatherPage(item);
  }

}
