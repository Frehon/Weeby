export class Post {

  private _avatar: string;
  private _userName: string;
  private _userNick: string;
  private _photo: string;
  private _photoDescription: string;
  private _likes: string [];
  private _comments: string [];

  public static from(avatar: string, userName: string, userNick: string, photo: string, photoDescription: string) {
    const post = new Post();
    post.avatar = avatar;
    post.userName = userName;
    post.userNick = userNick;
    post.photo = photo;
    post.photoDescription = photoDescription;
    return post;
  }

  get avatar(): string {
    return this._avatar;
  }

  set avatar(value: string) {
    this._avatar = value;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  get userNick(): string {
    return this._userNick;
  }

  set userNick(value: string) {
    this._userNick = value;
  }

  get photo(): string {
    return this._photo;
  }

  set photo(value: string) {
    this._photo = value;
  }

  get photoDescription(): string {
    return this._photoDescription;
  }

  set photoDescription(value: string) {
    this._photoDescription = value;
  }

  get likes(): string[] {
    return this._likes;
  }

  set likes(value: string[]) {
    this._likes = value;
  }

  get comments(): string[] {
    return this._comments;
  }

  set comments(value: string[]) {
    this._comments = value;
  }
}
