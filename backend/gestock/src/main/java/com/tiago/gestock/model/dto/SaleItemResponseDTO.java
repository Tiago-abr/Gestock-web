package com.tiago.gestock.model.dto;

import java.math.BigDecimal;

public record SaleItemResponseDTO(
    Long id,
    Long productId,
    String productName,
    Integer quantity,
    BigDecimal unitPrice,
    BigDecimal subtotal
) {}
