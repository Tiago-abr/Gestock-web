package com.tiago.gestock.model.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record SaleResponseDTO(
    Long id,
    Long customerId,
    String customerName,
    String userName,
    BigDecimal totalAmount,
    LocalDateTime saleDate,
    List<SaleItemResponseDTO> items
) {}
