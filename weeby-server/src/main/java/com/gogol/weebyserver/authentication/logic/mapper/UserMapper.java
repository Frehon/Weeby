package com.gogol.weebyserver.authentication.logic.mapper;

import com.gogol.weebyserver.authentication.model.User;
import com.gogol.weebyserver.authentication.model.dto.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User mapUserDtoToUser(UserDto userDto);

    @Mapping(target = "password", ignore = true)
    UserDto mapUserToUserDto(User user);
}
