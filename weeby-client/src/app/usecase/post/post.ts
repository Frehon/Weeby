export class Post {

  public avatar: string;
  public userName: string;
  public userNick: string;
  public photo: string;
  public photoDescription: string;
  public likes: string [];
  public comments: string [];

  public static from(avatar: string, userName: string, userNick: string, photo: string, photoDescription: string) {
    const post = new Post();
    post.avatar = avatar;
    post.userName = userName;
    post.userNick = userNick;
    post.photo = photo;
    post.photoDescription = photoDescription;
    post.comments = [];
    post.likes = [];
    return post;
  }
}
