import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/Model/movie';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {

  @Input('movie') movieProps: Movie = {} as Movie;
  @Input('title') titleProps: string = '';
  @Input('bg') isTrue: boolean = false;

}
