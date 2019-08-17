package com.gogol.weebyserver.masterdata.logic.mapper;

import com.gogol.weebyserver.masterdata.model.Post;
import com.gogol.weebyserver.masterdata.model.dto.PostDto;
import org.mapstruct.Mapper;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface PostMapper {

    PostDto mapPostToPostDto(Post post);

    Post mapPostDtoToPost(PostDto dto);

    Set<PostDto> mapPostsToPostDtos(Iterable<Post> posts);
}
