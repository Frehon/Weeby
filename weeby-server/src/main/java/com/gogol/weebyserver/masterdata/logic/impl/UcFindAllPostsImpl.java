package com.gogol.weebyserver.masterdata.logic.impl;

import com.gogol.weebyserver.masterdata.logic.api.UcFindAllPosts;
import com.gogol.weebyserver.masterdata.model.Post;
import com.gogol.weebyserver.masterdata.repository.PostRepository;
import com.google.common.collect.Sets;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UcFindAllPostsImpl implements UcFindAllPosts {

    private static final Logger LOGGER = LoggerFactory.getLogger(UcFindAllPostsImpl.class);

    @Autowired
    private PostRepository postRepository;

    @Override
    public Set<Post> findAll() {
        LOGGER.info("Fetching all posts data");
        return Sets.newHashSet(postRepository.findAll());
    }
}
