package com.tiago.gestock.service;

import com.tiago.gestock.mapper.ProductMapper;
import com.tiago.gestock.model.dto.ProductResponseDTO;
import com.tiago.gestock.repository.ProductRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository repository;
    
    @Autowired
    private ProductMapper mapper;
    
    public List<ProductResponseDTO> findAll(){
        return mapper.toResponseDTOList(this.repository.findAll());
    }
    
    public ProductResponseDTO findById(Long id){
        return mapper.toResponseDTO(
                this.repository.findById(id).orElseThrow(() -> {
                    throw new RuntimeException("Produto não encontrado.");
                })
        );
    }
}
