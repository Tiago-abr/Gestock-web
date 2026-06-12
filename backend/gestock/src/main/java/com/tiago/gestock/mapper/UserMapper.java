package com.tiago.gestock.mapper;

import com.tiago.gestock.model.User;
import com.tiago.gestock.model.dto.UserRequestDTO;
import com.tiago.gestock.model.dto.UserResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    
    User toEntity(UserRequestDTO dto);
    
    UserResponseDTO toResponseDTO(User entity);
}
