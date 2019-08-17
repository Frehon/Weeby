package com.gogol.weebyserver.masterdata.logic.impl;

import com.gogol.weebyserver.masterdata.logic.api.UcFindAllPosts;
import com.gogol.weebyserver.masterdata.logic.mapper.PostMapper;
import com.gogol.weebyserver.masterdata.model.dto.PostDto;
import com.gogol.weebyserver.masterdata.repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UcFindAllPostsImpl implements UcFindAllPosts {

    @Autowired
    private PostMapper mapper;

    private static final Logger LOGGER = LoggerFactory.getLogger(UcFindAllPostsImpl.class);

    @Autowired
    private PostRepository postRepository;

    @Override
    public Set<PostDto> findAll() {
        LOGGER.info("Fetching all posts data");
        return mapper.mapPostsToPostDtos(postRepository.findAll());
    }
}
