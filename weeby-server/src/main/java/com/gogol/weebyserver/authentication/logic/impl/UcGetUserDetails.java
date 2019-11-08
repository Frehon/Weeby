package com.gogol.weebyserver.authentication.logic.impl;

import com.gogol.weebyserver.authentication.model.User;
import com.gogol.weebyserver.authentication.model.UserPrincipal;
import com.gogol.weebyserver.authentication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UcGetUserDetails implements UserDetailsService {

    public static final Pattern VALID_EMAIL_ADDRESS_REGEX =
            Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

    private static final String USER_ROLE = "User";

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userNameOrEmail) throws UsernameNotFoundException {
        Optional<User> loggedUser;
        if (VALID_EMAIL_ADDRESS_REGEX.matcher(userNameOrEmail).find()) {
            loggedUser = userRepository.findByEmail(userNameOrEmail);
        } else {
            loggedUser = userRepository.findByName(userNameOrEmail);
        }
        if (!loggedUser.isPresent()) {
            throw new UsernameNotFoundException("User with given email or name does not exists.");
        }
        return new UserPrincipal(loggedUser.get(), USER_ROLE);
    }
}
