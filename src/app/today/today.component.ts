import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';


@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  timeline:any;
  weatherNow:any;
  location:any;
  
  currentTime = new Date();

  constructor(private forecastService : ForecastService) { }

  ngOnInit(): void {
    this.forecastService.getWeatherforecast().subscribe(data=>{
      this.getTodayForecast(data)
    })
  }
  dateRange(){
    const start = new Date();
    start.setHours(start.getHours()+(start.getTimezoneOffset() / 60 ));
    const to = new Date(start);
    to.setHours(to.getHours() + 2, to.getMinutes() + 59, to.getSeconds() + 59);

    return { start, to}
  }
  getTodayForecast(today:any){
    this.location = today.city;
     console.log(today);
     
     for(const forecast of today.array(0, 5)) {
      this.timeline.push({
        time: forecast.dt_txt,
         temp: forecast.main.temp
      }); 
      

      const apiDate = new Date(today.dt_txt).getTime();

      if(this.dateRange().start.getTime() <= apiDate && this.dateRange().to.getTime() >= apiDate){
               this.weatherNow = today;
               console.log(this.weatherNow);
      }
    }
  } 
}