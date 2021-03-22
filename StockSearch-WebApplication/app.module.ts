import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSlideToggleModule} from "@angular/material/slide-toggle";
import { MatAutocompleteModule} from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { AutocompleteService } from "./autocomplete.service";
import { DetailsComponent } from './details/details.component';
import { MatTabsModule } from "@angular/material/tabs";
import { HighchartsChartModule } from "highcharts-angular";
import { DailyChartComponent } from './daily-chart/daily-chart.component';
import { MatDialogModule} from "@angular/material/dialog";
import { BuyComponent } from './buy/buy.component';
import { NewsCardsComponent } from './news-cards/news-cards.component';
import {MatCardModule} from "@angular/material/card";
import { BigChartComponent } from './big-chart/big-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    WatchlistComponent,
    PortfolioComponent,
    DetailsComponent,
    DailyChartComponent,
    BuyComponent,
    NewsCardsComponent,
    BigChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTabsModule,
    HighchartsChartModule,
    MatDialogModule,
    MatCardModule,
  ],
  providers: [AutocompleteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
