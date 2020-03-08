import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AutoCompleteModule} from "primeng/autocomplete";
import { HttpClientModule } from '@angular/common/http'; 
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WeatherComponent } from './weather/weather.component';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';;
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider';
import { WeatherService } from './shared/weather.service';
import {TemperatureConverterPipe} from './shared/temperature-converter.pipe'



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WeatherComponent,
    FavoritesListComponent,
    TemperatureConverterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    AutoCompleteModule,
    HttpClientModule,
    MatListModule,
    MatCardModule,
    
  ],
  providers: [WeatherService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
