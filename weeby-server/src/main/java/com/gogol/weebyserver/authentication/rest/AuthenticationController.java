package com.gogol.weebyserver.authentication.rest;

import com.gogol.weebyserver.authentication.exception.AuthenticationException;
import com.gogol.weebyserver.authentication.logic.api.UcCreateUser;
import com.gogol.weebyserver.authentication.model.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/auth")
public class AuthenticationController {

    @Autowired
    private UcCreateUser ucCreateUser;

    @PostMapping(value = "/create")
    public ResponseEntity<?> createUser(@RequestBody UserDto userDto) {
        try {
            return new ResponseEntity<>(ucCreateUser.createUser(userDto), HttpStatus.CREATED);
        } catch (AuthenticationException authExc) {
            return new ResponseEntity<>(authExc.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
