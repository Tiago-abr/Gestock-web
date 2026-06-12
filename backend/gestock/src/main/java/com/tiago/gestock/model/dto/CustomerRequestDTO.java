package com.tiago.gestock.model.dto;

import jakarta.validation.constraints.NotBlank;

public record CustomerRequestDTO(
    @NotBlank(message = "O nome do cliente é obrigatório.")
    String name,
        
    String document,
    String phoneNumber,
    String address
) {}
