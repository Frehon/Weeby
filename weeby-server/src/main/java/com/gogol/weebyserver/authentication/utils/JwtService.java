package com.gogol.weebyserver.authentication.utils;


import com.gogol.weebyserver.authentication.model.UserPrincipal;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    public String generateToken(UserPrincipal loggedInUser, List<String> roles) {

        return Jwts.builder()
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()), SignatureAlgorithm.HS512)
                .setHeaderParam("tokenType", "JWT")
                .setIssuer("secure-api")
                .setAudience("Weeby")
                .setSubject(loggedInUser.getUsername())
                .setExpiration(new Date(System.currentTimeMillis() + 864000000))
                .claim("roles", roles)
                .compact();
    }
}
