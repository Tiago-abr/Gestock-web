package com.tiago.gestock.service;

import com.tiago.gestock.mapper.SaleMapper;
import com.tiago.gestock.model.dto.SaleResponseDTO;
import com.tiago.gestock.repository.SaleRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SaleService {
    
    @Autowired
    private SaleRepository repository;
    
    @Autowired
    private SaleMapper mapper;
    
   public List<SaleResponseDTO> findAll(){
       return mapper.toResponseDTOList(this.repository.findAll());
   }
}
