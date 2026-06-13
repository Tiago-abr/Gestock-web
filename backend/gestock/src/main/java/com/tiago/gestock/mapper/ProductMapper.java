package com.tiago.gestock.mapper;

import com.tiago.gestock.model.Product;
import com.tiago.gestock.model.dto.ProductRequestDTO;
import com.tiago.gestock.model.dto.ProductResponseDTO;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {
    
    Product toEntity(ProductRequestDTO dto);
    
    ProductResponseDTO toResponseDTO(Product entity);
    
    List<ProductResponseDTO> toResponseDTOList(List<Product> entityList);
    
    void updateEntityFromDTO(ProductRequestDTO dto, @MappingTarget Product entity);
}
