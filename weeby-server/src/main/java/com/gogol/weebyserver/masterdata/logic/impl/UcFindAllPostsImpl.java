package com.gogol.weebyserver.masterdata.logic.impl;

import com.gogol.weebyserver.masterdata.logic.api.UcFindAllPosts;
import com.gogol.weebyserver.masterdata.model.Post;
import com.gogol.weebyserver.masterdata.repository.PostRepository;
import com.google.common.collect.Sets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UcFindAllPostsImpl implements UcFindAllPosts {

    @Autowired
    private PostRepository postRepository;

    @Override
    public Set<Post> findAll() {
        return Sets.newHashSet(postRepository.findAll());
    }
}
