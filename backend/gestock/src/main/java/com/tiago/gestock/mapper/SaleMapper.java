package com.tiago.gestock.mapper;

import com.tiago.gestock.model.Sale;
import com.tiago.gestock.model.SaleItem;
import com.tiago.gestock.model.dto.SaleItemResponseDTO;
import com.tiago.gestock.model.dto.SaleResponseDTO;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SaleMapper {
    
    @Mapping(source = "customer.name", target = "customerName")
    @Mapping(source = "user.name", target = "userName")
    @Mapping(source = "customer.id", target = "customerId")
    SaleResponseDTO toResponseDTO(Sale entity);
    
    @Mapping(source = "customer.name", target = "customerName")
    @Mapping(source = "user.name", target = "userName")
    @Mapping(source = "customer.id", target = "customerId")
    List<SaleResponseDTO> toResponseDTOList(List<Sale> entity);
    
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    SaleItemResponseDTO toItemResponseDTO(SaleItem item);
    
    List<SaleItemResponseDTO> toItemResponseDTOList(List<SaleItem> items);
}
