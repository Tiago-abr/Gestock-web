package com.tiago.gestock.model.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record SaleRequestDTO(
    @NotNull(message = "O ID do cliente é obrigatório.")
    Long customerId,
        
    @NotNull(message = "O ID do vendedor é obrigatório.")
    Long userId,
        
    @NotEmpty(message = "A venda deve conter pelo menos um item")
    @Valid
    List<SaleItemRequestDTO> items
) {}
