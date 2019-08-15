package com.gogol.weebyserver.masterdata.repository;

import com.gogol.weebyserver.masterdata.model.Post;
import org.springframework.data.repository.CrudRepository;

public interface PostRepository extends CrudRepository<Post, Long> {
}
