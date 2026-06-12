package com.tiago.gestock.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;

public record ProductRequestDTO(
    @NotBlank(message = "O nome do produto é obrigatório.")
    String name,
        
    String category,
    
    @NotNull(message = "O preço é obrigatório.")
    @PositiveOrZero(message = "O preço não pode ser negativo.")
    BigDecimal price,
    
    @NotNull(message = "A quantidade é obrigatória.")
    @PositiveOrZero(message = "A quantidade não pode ser negativa.")
    Integer stockQuantity
) {}
