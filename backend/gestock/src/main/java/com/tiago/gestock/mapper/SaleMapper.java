package com.tiago.gestock.mapper;

import com.tiago.gestock.model.Sale;
import com.tiago.gestock.model.SaleItem;
import com.tiago.gestock.model.dto.SaleItemRequestDTO;
import com.tiago.gestock.model.dto.SaleItemResponseDTO;
import com.tiago.gestock.model.dto.SaleRequestDTO;
import com.tiago.gestock.model.dto.SaleResponseDTO;
import java.util.ArrayList;
import java.util.List;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SaleMapper {
    
    @Mapping(source = "customerId", target = "customer.id")
    @Mapping(source = "userId", target = "user.id")
    Sale toEntity(SaleRequestDTO dto);
    
    @AfterMapping
    default void linkItems(@MappingTarget Sale sale) {
        if (sale.getItems() != null) {
            // Limpa a lista temporária criada pelo MapStruct e reinsere usando seu método helper
            var temporaryItems = new ArrayList<>(sale.getItems());
            sale.getItems().clear();
            temporaryItems.forEach(sale::addItem);
        }
    }
    
    @Mapping(source = "productId", target = "product.id")
    SaleItem toItemEntity(SaleItemRequestDTO dto);
    
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
