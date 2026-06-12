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
    
    @Transactional
    public CustomerResponseDTO create(CustomerRequestDTO request){
        Customer customer = this.mapper.toEntity(request);
        this.repository.save(customer);
        return this.mapper.toResponseDTO(customer);
    }
}
