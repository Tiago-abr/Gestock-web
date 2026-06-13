package com.tiago.gestock.controller;

import com.tiago.gestock.model.dto.SaleRequestDTO;
import com.tiago.gestock.model.dto.SaleResponseDTO;
import com.tiago.gestock.service.SaleService;
import java.net.URI;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/sales")
public class SaleController {
    
    @Autowired
    private SaleService service;
    
    @GetMapping
    public ResponseEntity<List<SaleResponseDTO>> findAll(){
        return ResponseEntity.ok(this.service.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<SaleResponseDTO> findById(@PathVariable Long id){
        return ResponseEntity.ok(this.service.findById(id));
    }
    
    @PostMapping()
    public ResponseEntity<SaleResponseDTO> create(@RequestBody SaleRequestDTO request){
        SaleResponseDTO response = this.service.create(request);
        
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(response.id()).toUri();
        
        return ResponseEntity.created(uri).body(response);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<SaleResponseDTO> update(@PathVariable Long id, @RequestBody SaleRequestDTO request){
        return ResponseEntity.ok(this.service.update(id, request));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        this.service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
