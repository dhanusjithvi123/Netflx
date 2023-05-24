import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Model/movie';
import { DataService } from 'src/app/Service/data.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  latestMovie: any;
  popularMovies !: Movie; 
  nowPlayingMovies ! : Movie;
  topRatedMovies ! : Movie;
  upComingMovies !: Movie;
  trendingMovies ! : Movie
  originals !: Movie;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getLatestMovie();
    this.getNowPlayingMovies();
    this.getOriginalMovies();
    this.getTrendingMovies();
    this.getPopularMovies();
    this.getUpcomingMovies();
    this.getTopRatedMovies();

  }

  getLatestMovie() {
    this.dataService.getLatestMovie().subscribe(res => this.latestMovie = this.changeData(res), err => console.log(err))
  }

  changeData(res: any): any {
      res.backdrop_path = "https://image.tmdb.org/t/p/original/ovM06PdF3M8wvKb06i4sjW3xoww.jpg?api_key=0a34a3c413c90caa2e736ba7da41e56b"

    return res;
  }

  getPopularMovies() {
    this.dataService.getPopularMovies().subscribe(res => {
       this.popularMovies = this.modifyData(res);
    }, err => console.log(err))
  }

  getNowPlayingMovies() {
    this.dataService.getNowPlayingMovies().subscribe(res => {
       this.nowPlayingMovies = this.modifyData(res);
    }, err => console.log(err))
  }

  getTopRatedMovies() {
    this.dataService.getTopRatedMovies().subscribe(res => {
       this.topRatedMovies = this.modifyData(res);
    }, err => console.log(err))
  }

  getUpcomingMovies() {
    this.dataService.getUpcomingMovies().subscribe(res => {
       this.upComingMovies = this.modifyData(res);
    }, err => console.log(err))
  }

  getTrendingMovies() {
    this.dataService.getTrendingMovies().subscribe(res => {
       this.trendingMovies = this.modifyData(res);
    }, err => console.log(err))
  }

  getOriginalMovies() {
    this.dataService.getOriginals().subscribe(res => {
       this.originals = this.modifyData(res);
    }, err => console.log(err))
  }

  modifyData(movies: Movie): Movie {
    if (movies.results) {
      movies.results.forEach(element =>{
        element.backdrop_path = 'https://image.tmdb.org/t/p/original'+element.backdrop_path+'?api_key='+environment.api_key;
        if (!element.title) {
          element.title = element.name;
        }

      } )
    }
    return movies;

  }

}
