package com.tiago.gestock.controller;

import com.tiago.gestock.model.dto.CustomerResponseDTO;
import com.tiago.gestock.service.CustomerService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customers")
public class CustomerController {
    
    @Autowired
    private CustomerService service;
    
    @GetMapping
    public ResponseEntity<List<CustomerResponseDTO>> findAll(){
        return ResponseEntity.ok(this.service.findAll());
    }
}
