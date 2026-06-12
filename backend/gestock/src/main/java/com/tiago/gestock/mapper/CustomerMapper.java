package com.tiago.gestock.mapper;

import com.tiago.gestock.model.Customer;
import com.tiago.gestock.model.dto.CustomerRequestDTO;
import com.tiago.gestock.model.dto.CustomerResponseDTO;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CustomerMapper {
        
    Customer toEntity(CustomerRequestDTO dto);
    
    CustomerResponseDTO toResponseDTO(Customer entity);
    
    List<CustomerResponseDTO> toResponseDTOList(List<Customer> entityList);
    
    void updateEntityFromDTO(CustomerRequestDTO dto, @MappingTarget Customer entity);
}
