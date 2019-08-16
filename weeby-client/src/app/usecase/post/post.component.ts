import {Component, Input, OnInit} from '@angular/core';
import {Post} from './post';
import {PostRestService} from '../logic/post.rest.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input()
  public posts: Post [];

  constructor(private postRestService: PostRestService) {
    this.posts = [];
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postRestService
      .findAllPosts()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }
}
