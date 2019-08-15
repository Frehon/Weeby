package com.gogol.weebyserver.setup.testdata;

import com.gogol.weebyserver.masterdata.model.Post;
import com.gogol.weebyserver.masterdata.repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.Arrays;

/**
 * Loading test data right after application starts
 */
@Component
public class StartupTestDataLoader implements ApplicationListener<ApplicationReadyEvent> {

    private static final Logger LOGGER = LoggerFactory.getLogger(StartupTestDataLoader.class);

    @Autowired
    private PostRepository postRepository;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        LOGGER.info("Loading posts test data");
        setupPostsTestData();
    }

    private void setupPostsTestData() {
        Post post1 = new Post();
        post1.setAvatar("https://material.angular.io/assets/img/examples/shiba1.jpg");
        post1.setUserName("Shiba The Dog");
        post1.setUserNick("#Shibby");
        post1.setPhoto("https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/04/11/12/package-holiday-credit-grafner.jpg?w968h681");
        post1.setPhotoDescription("My Vacations #Vacations #Beach #Sunshine");

        Post post2 = new Post();
        post2.setAvatar("https://www.psy.pl/wp-content/uploads/2009/01/welsh6-e1489950125537.jpg");
        post2.setUserName("Pluto The Dog");
        post2.setUserNick("#Shibbys opponent");
        post2.setPhoto("https://www.budgetdirect.com.au/blog/wp-content/uploads/2018/03/Thailand-Travel-Guide-Hero-1-951x512.jpg");
        post2.setPhotoDescription("My Vacations are better than yours! #Vacations #Beach #Sunshine");
        postRepository.saveAll(Arrays.asList(post1, post2));
    }
}
