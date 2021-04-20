import { HttpClient, HttpParams } from '@angular/common/http';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) { }

  getWeatherforecast(){
   
    return new Observable((observer)=>(
        navigator.geolocation.getCurrentPosition(
          (position)=>(
            observer.next(position)
          ),
          (error)=>{
            observer.next(error)
          }
          )
        )
    ).pipe()
    map((value:any)=>{
        return new HttpParams()
        .set('lon', value.coords.longitude)
        .set('lat', value.coords.longitude)
        .set('units', 'imperial')
        .set('appid', 'dcc620ed4238b7da06b58c97ba4cb9de')
    })
    switchMap((values)=>{
      return this.http.post('https://openweathermap.org/forecast5', {postParam : values})
      //return this.http.post('https://openweathermap.org/forecast5', {"postParam : values"}).map(res=>res.json()).subscribe(data=>{console.log(data);});
     
    })
  }
}
