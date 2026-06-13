package com.tiago.gestock.service;

import com.tiago.gestock.mapper.ProductMapper;
import com.tiago.gestock.model.Product;
import com.tiago.gestock.model.dto.ProductRequestDTO;
import com.tiago.gestock.model.dto.ProductResponseDTO;
import com.tiago.gestock.repository.ProductRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository repository;
    
    @Autowired
    private ProductMapper mapper;
    
    @Transactional(readOnly = true)
    public List<ProductResponseDTO> findAll(){
        return mapper.toResponseDTOList(this.repository.findAll());
    }
    
    @Transactional(readOnly = true)
    public ProductResponseDTO findById(Long id){
        return mapper.toResponseDTO(
                this.repository.findById(id).orElseThrow(() -> {
                    throw new RuntimeException("Produto não encontrado.");
                })
        );
    }
    
    @Transactional
    public ProductResponseDTO create(ProductRequestDTO request){
        Product product = this.mapper.toEntity(request);
        product = this.repository.save(product);
        return this.mapper.toResponseDTO(product);
    }
    
    @Transactional
    public ProductResponseDTO update(Long id, ProductRequestDTO request){
        Product product = this.repository.findById(id).orElseThrow(() -> {
            throw new RuntimeException("Produto não encontrado.");
        });
        
        this.mapper.updateEntityFromDTO(request, product);
        
        this.repository.save(product);
        
        return this.mapper.toResponseDTO(product);
    }
    
    @Transactional
    public void delete(Long id){
        if(!this.repository.existsById(id)){
            throw new RuntimeException("Produto não encontrado.");
        }
        
        this.repository.deleteById(id);
    }
}
