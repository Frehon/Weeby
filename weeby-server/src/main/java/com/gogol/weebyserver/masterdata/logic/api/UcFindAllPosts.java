package com.gogol.weebyserver.masterdata.logic.api;

import com.gogol.weebyserver.masterdata.model.dto.PostDto;

import java.util.Set;
/**
 * Finds all posts for all users
 */
public interface UcFindAllPosts {
    Set<PostDto> findAll();
}
