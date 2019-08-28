package com.gogol.weebyserver.authentication.logic.impl;

import com.gogol.weebyserver.authentication.exception.AuthenticationException;
import com.gogol.weebyserver.authentication.logic.api.UcLogin;
import com.gogol.weebyserver.authentication.logic.mapper.UserMapper;
import com.gogol.weebyserver.authentication.model.User;
import com.gogol.weebyserver.authentication.model.dto.UserDto;
import com.gogol.weebyserver.authentication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UcLoginImpl implements UcLogin {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDto login(UserDto userDto) {
        User loggingUser = userMapper.mapUserDtoToUser(userDto);
        Optional<User> loggedUser;
        if (loggingUser.getEmail() != null) {
            loggedUser = userRepository.findByEmail(loggingUser.getEmail());
        } else {
            loggedUser = userRepository.findByName(loggingUser.getName());
        }
        if (!loggedUser.isPresent()) {
            throw new AuthenticationException("User with given email or name does not exists.");
        }
        checkPasswords(loggingUser.getPassword(), loggedUser.get().getPassword());
        return userMapper.mapUserToUserDto(loggedUser.get());
    }

    private void checkPasswords(String rawPassword, String passwordHash) {
        if(!this.passwordEncoder.matches(rawPassword, passwordHash)){
            throw new AuthenticationException("Incorrect password");
        }
    }
}
