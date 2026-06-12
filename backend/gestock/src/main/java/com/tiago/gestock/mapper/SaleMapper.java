package com.tiago.gestock.mapper;

import com.tiago.gestock.model.Sale;
import com.tiago.gestock.model.dto.SaleResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SaleMapper {
    
    @Mapping(source = "customer.name", target = "customerName")
    @Mapping(source = "user.name", target = "userName")
    SaleResponseDTO toResponseDTO(Sale entity);
}
