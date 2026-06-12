package com.tiago.gestock.model.dto;

import com.tiago.gestock.model.enums.Roles;

public record UserResponseDTO(
    Long id,
    String name,
    Roles role
){}
