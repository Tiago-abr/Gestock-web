package com.tiago.gestock.controller;

import com.tiago.gestock.model.dto.LoginRequestDTO;
import com.tiago.gestock.model.dto.UserRequestDTO;
import com.tiago.gestock.model.dto.UserResponseDTO;
import com.tiago.gestock.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO request){
        try{
            UserResponseDTO response = this.userService.login(request);
            return ResponseEntity.ok(response);
        }catch(RuntimeException exception){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(exception.getMessage());
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRequestDTO request){
        try{
            UserResponseDTO response = this.userService.register(request);
            return ResponseEntity.ok(response);
        }catch(RuntimeException exception){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno ao processar o cadastro.");
        }
    }
}
