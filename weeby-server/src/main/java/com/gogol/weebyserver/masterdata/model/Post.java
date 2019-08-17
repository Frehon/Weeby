package com.gogol.weebyserver.masterdata.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "avatar_url")
    private String avatar;

    @Column
    private String userName;

    @Column
    private String userNick;

    @Column(name = "photo_url")
    private String photo;

    @Column
    private String photoDescription;

    @ElementCollection
    private Set<String> likes = new HashSet<>();

    @ElementCollection
    private List<String> comments = new ArrayList<>();

    public Long getId() {
        return this.id;
    }

    public String getAvatar() {
        return this.avatar;
    }

    public String getUserName() {
        return this.userName;
    }

    public String getUserNick() {
        return this.userNick;
    }

    public String getPhoto() {
        return this.photo;
    }

    public String getPhotoDescription() {
        return this.photoDescription;
    }

    public Set<String> getLikes() {
        return this.likes;
    }

    public List<String> getComments() {
        return this.comments;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setUserNick(String userNick) {
        this.userNick = userNick;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public void setPhotoDescription(String photoDescription) {
        this.photoDescription = photoDescription;
    }

    public void setLikes(Set<String> likes) {
        this.likes = likes;
    }

    public void setComments(List<String> comments) {
        this.comments = comments;
    }
}
