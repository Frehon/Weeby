package com.gogol.weebyserver.masterdata.rest;

import com.gogol.weebyserver.masterdata.logic.api.UcFindAllPosts;
import com.gogol.weebyserver.masterdata.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("post")
public class PostController {

    @Autowired
    private UcFindAllPosts ucFindAllPosts;

    @GetMapping(value = "/all")
    public ResponseEntity<Set<Post>> findAll() {
        return new ResponseEntity<>(ucFindAllPosts.findAll(), HttpStatus.OK);
    }

}
