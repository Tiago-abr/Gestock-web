package com.tiago.gestock.service;

import com.tiago.gestock.mapper.SaleMapper;
import com.tiago.gestock.model.Product;
import com.tiago.gestock.model.Sale;
import com.tiago.gestock.model.SaleItem;
import com.tiago.gestock.model.dto.SaleRequestDTO;
import com.tiago.gestock.model.dto.SaleResponseDTO;
import com.tiago.gestock.repository.ProductRepository;
import com.tiago.gestock.repository.SaleRepository;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SaleService {
    
    @Autowired
    private SaleRepository repository;
    
    @Autowired
    private ProductRepository ProductRepository;
    
    @Autowired
    private SaleMapper mapper;
    
   @Transactional(readOnly = true)
   public List<SaleResponseDTO> findAll(){
       return mapper.toResponseDTOList(this.repository.findAll());
   }
   
   @Transactional(readOnly = true)
   public SaleResponseDTO findById(Long id){
       return this.mapper.toResponseDTO(
               this.repository.findById(id).orElseThrow(() -> {
                   throw new RuntimeException("Venda não encontrada.");
               })
       );
   }
   
   @Transactional
   public SaleResponseDTO create(SaleRequestDTO request){
       Sale sale = this.mapper.toEntity(request);
       
       for(SaleItem item : sale.getItems()){
           Product product = this.ProductRepository.findById(item.getProduct().getId()).orElseThrow(() -> {
               throw new RuntimeException("Produto não encontrado.");
           });
           
           item.setProduct(product);
           item.setUnitPrice(product.getPrice());
           
           BigDecimal quantity = BigDecimal.valueOf(item.getQuantity());
           item.setSubTotal(product.getPrice().multiply(quantity));

       }
       
       BigDecimal totalAmount = sale.getItems().stream()
               .map(SaleItem::getSubTotal)
               .reduce(BigDecimal.ZERO, BigDecimal::add);
       sale.setTotalAmount(totalAmount);
       
       sale = this.repository.save(sale);
       
       return this.mapper.toResponseDTO(sale);
   }
}
