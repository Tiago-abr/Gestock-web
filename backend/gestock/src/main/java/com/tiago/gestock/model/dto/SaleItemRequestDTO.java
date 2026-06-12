package com.tiago.gestock.model.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record SaleItemRequestDTO(
    @NotNull(message = "O ID do produto é obrigatório.")
    Long productId,
    
    @NotNull(message = "A quantidade é obrigatória.")
    @Positive(message = "A quantidade deve ser maior que zero.")
    Integer quantity
) {}
