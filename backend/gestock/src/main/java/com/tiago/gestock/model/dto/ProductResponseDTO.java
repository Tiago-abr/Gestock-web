package com.tiago.gestock.model.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ProductResponseDTO(
    Long id,
    String name,
    String category,
    BigDecimal price,
    Integer stockQuantity,
    LocalDateTime createdAt
) {}
