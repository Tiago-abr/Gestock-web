package com.tiago.gestock.service;


import com.tiago.gestock.mapper.CustomerMapper;
import com.tiago.gestock.model.Customer;
import com.tiago.gestock.model.dto.CustomerRequestDTO;
import com.tiago.gestock.model.dto.CustomerResponseDTO;
import com.tiago.gestock.repository.CustomerRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository repository;
    
    @Autowired
    private CustomerMapper mapper;
    
    @Transactional(readOnly = true)
    public List<CustomerResponseDTO> findAll(){
        List<Customer> customers = this.repository.findAll();
        return this.mapper.toResponseDTOList(customers);
    }
    
    @Transactional(readOnly = true)
    public CustomerResponseDTO findById(Long id){
        if(!this.repository.existsById(id)){
            throw new RuntimeException("Cliente não encontrado.");
        }
        
        return this.mapper.toResponseDTO(this.repository.findById(id).get());
    }
    
    @Transactional
    public CustomerResponseDTO create(CustomerRequestDTO request){
        Customer customer = this.mapper.toEntity(request);
        this.repository.save(customer);
        return this.mapper.toResponseDTO(customer);
    }
    
    @Transactional
    public CustomerResponseDTO update(Long id ,CustomerRequestDTO request){
        Customer customer = this.repository.findById(id).orElseThrow(() -> {
            throw new RuntimeException("Cliente não encontrado.");
        });
        
        this.mapper.updateEntityFromDTO(request, customer);
        
        this.repository.save(customer);
        
        return this.mapper.toResponseDTO(customer);
    }
    
    @Transactional
    public void delete(Long id){
        if(!this.repository.existsById(id)){
            throw new RuntimeException("Cliente não encontrado.");
        }
        
        this.repository.deleteById(id);
    }
    
    
}
