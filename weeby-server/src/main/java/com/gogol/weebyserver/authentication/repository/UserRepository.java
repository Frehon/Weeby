package com.gogol.weebyserver.authentication.repository;

import com.gogol.weebyserver.authentication.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByEmailOrName(String email, String name);

}
