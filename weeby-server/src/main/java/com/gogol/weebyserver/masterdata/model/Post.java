package com.gogol.weebyserver.masterdata.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Post {

    @Id
    @Getter
    @Setter
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "avatar_url")
    @Getter
    @Setter
    private String avatar;

    @Column
    @Getter
    @Setter
    private String userName;

    @Column
    @Getter
    @Setter
    private String userNick;

    @Column(name = "photo_url")
    @Getter
    @Setter
    private String photo;

    @Column
    @Getter
    @Setter
    private String photoDescription;

    @ElementCollection
    @Getter
    @Setter
    private Set<String> likes = new HashSet<>();

    @ElementCollection
    @Getter
    @Setter
    private List<String> comments = new ArrayList<>();
}
