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
        'Shiba', 'Dog breed', 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.\n' +
        '    A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally\n' +
        '    bred for hunting.');
  }

  ngOnInit() {

  }

}
