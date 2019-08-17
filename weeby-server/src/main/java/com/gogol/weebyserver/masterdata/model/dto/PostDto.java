package com.gogol.weebyserver.masterdata.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class PostDto {

    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private String avatar;

    @Getter
    @Setter
    private String userName;

    @Getter
    @Setter
    private String userNick;

    @Getter
    @Setter
    private String photo;

    @Getter
    @Setter
    private String photoDescription;

    @Getter
    @Setter
    private Set<String> likes = new HashSet<>();

    @Getter
    @Setter
    private List<String> comments = new ArrayList<>();
}
