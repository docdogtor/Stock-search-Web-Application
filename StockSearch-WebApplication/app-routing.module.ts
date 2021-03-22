import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { SearchComponent } from "./search/search.component";
import {WatchlistComponent} from "./watchlist/watchlist.component";
import {DetailsComponent} from "./details/details.component";


const routes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'watchlist', component: WatchlistComponent},
  {path: 'portfolio', component: PortfolioComponent},
  {path: 'details/:ticker', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
