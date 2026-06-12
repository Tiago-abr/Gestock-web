package com.tiago.gestock.model.dto;

import com.tiago.gestock.model.enums.Roles;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserRequestDTO(
    @NotBlank(message = "O nome é Obrigatório.")
    String name,
        
    @NotBlank(message = "O e-mail é obrigatório.")
    @Email(message = "Formato de e-mail inválido.")
    String email,
    
    @NotBlank(message = "A senha é obrigatória.")
    String password,
    
    @NotNull(message = "O nível de acesso é obrigatório.")
    Roles roles
) {}
