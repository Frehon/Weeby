package com.gogol.weebyserver.authentication.configuration.filer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gogol.weebyserver.authentication.model.LoginRequest;
import com.gogol.weebyserver.authentication.model.UserPrincipal;
import com.gogol.weebyserver.authentication.utils.JwtService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    @Autowired
    private JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        try {
            String requestBody = IOUtils.toString(request.getReader());
            LoginRequest loginRequest = objectMapper.readValue(requestBody, LoginRequest.class);
            UsernamePasswordAuthenticationToken token
                    = new UsernamePasswordAuthenticationToken(loginRequest.getName(), loginRequest.getPassword());
            return this.authenticationManager.authenticate(token);
        } catch (Exception e) {
            throw new InternalAuthenticationServiceException(e.getMessage());
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException {
        UserPrincipal loggedInUser = (UserPrincipal) authResult.getPrincipal();

        List<String> roles = getUserRoles(loggedInUser);

        String token = jwtService.generateToken(loggedInUser, roles);

        response.addHeader("Authorization", "Bearer " + token);
        response.setStatus(HttpStatus.OK.value());
    }

    private List<String> getUserRoles(UserPrincipal loggedInUser) {
        return loggedInUser
                    .getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        objectMapper.writeValue(response.getWriter(), "Wrong credentials or account does not exists.");
    }
}
