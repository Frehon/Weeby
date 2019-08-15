import {Component, OnInit} from '@angular/core';
import {Post} from './post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public post: Post;

  constructor() {

    this.post =
      Post.from('https://material.angular.io/assets/img/examples/shiba1.jpg',
        'Shiba', 'Dog breed', 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/04/11/12/package-holiday-credit-grafner.jpg?w968h681',
        'My Vacations #Vacations #Beach #Sunshine');
  }

  ngOnInit() {}

}
