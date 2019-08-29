import {Component, Input, OnInit} from '@angular/core';
import {Post} from './post';
import {PostRestService} from '../logic/post-rest.service';
import {UserService} from '../../security/user.service';
import {User} from '../../authentication/model/user';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input()
  public posts: Post [];
  private currentUser: User;

  constructor(private userService: UserService, private postRestService: PostRestService) {
    this.posts = [];
  }

  public ngOnInit(): void {
    this.userService.currentUser
      .subscribe((currentUser: User) => this.currentUser = currentUser);
    this.loadPosts();
    console.log(this.currentUser);
  }

  public loadPosts(): void {
    this.postRestService
      .findAllPosts()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }
}
