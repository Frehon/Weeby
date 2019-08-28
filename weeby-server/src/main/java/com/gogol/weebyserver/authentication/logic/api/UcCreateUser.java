package com.gogol.weebyserver.authentication.logic.api;

import com.gogol.weebyserver.authentication.model.dto.UserDto;

public interface UcCreateUser {

    UserDto createUser(UserDto userDto);
}
