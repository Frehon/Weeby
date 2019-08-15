package com.gogol.weebyserver.masterdata.logic.api;

import com.gogol.weebyserver.masterdata.model.Post;

import java.util.Set;
/**
 * Finds all posts for all users
 */
public interface UcFindAllPosts {
    Set<Post> findAll();
}
