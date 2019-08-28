package com.gogol.weebyserver.authentication.logic.impl;

import com.gogol.weebyserver.authentication.exception.AuthenticationException;
import com.gogol.weebyserver.authentication.logic.api.UcCreateUser;
import com.gogol.weebyserver.authentication.logic.mapper.UserMapper;
import com.gogol.weebyserver.authentication.model.User;
import com.gogol.weebyserver.authentication.model.dto.UserDto;
import com.gogol.weebyserver.authentication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UcCreateUserImpl implements UcCreateUser {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDto createUser(UserDto userDto) {
        User user = userMapper.mapUserDtoToUser(userDto);
        Optional<User> duplicate = userRepository.findByEmailOrName(user.getEmail(), user.getName());
        if (duplicate.isPresent()) {
            throw new AuthenticationException("User with the same name or email already exists.");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return userMapper.mapUserToUserDto(user);
    }
}
