package com.tiago.gestock.controller;

import com.tiago.gestock.model.dto.SaleResponseDTO;
import com.tiago.gestock.service.SaleService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sales")
public class SaleController {
    
    @Autowired
    private SaleService service;
    
    @GetMapping
    public ResponseEntity<List<SaleResponseDTO>> findAll(){
        return ResponseEntity.ok(this.service.findAll());
    }
}
