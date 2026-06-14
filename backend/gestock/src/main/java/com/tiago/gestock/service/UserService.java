package com.tiago.gestock.service;

import com.tiago.gestock.mapper.UserMapper;
import com.tiago.gestock.model.User;
import com.tiago.gestock.model.dto.LoginRequestDTO;
import com.tiago.gestock.model.dto.UserRequestDTO;
import com.tiago.gestock.model.dto.UserResponseDTO;
import com.tiago.gestock.model.enums.Roles;
import com.tiago.gestock.repository.UserRepository;
import com.tiago.gestock.util.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    @Autowired
    private UserRepository repository;
    
    @Autowired
    private UserMapper mapper;
    
    public UserResponseDTO login(LoginRequestDTO request){
        User user = this.repository.findByEmail(request.email()).orElseThrow(() -> {
            throw new RuntimeException("E-mail ou senha inválidos.");
        });
        
        if(!PasswordEncoder.matches(request.password(), user.getPasswordHash())){
            throw new RuntimeException("E-mail ou senha inválidos.");
        }
        
        return this.mapper.toResponseDTO(user);
    }
    
    public UserResponseDTO register(UserRequestDTO request){
        User newUser = this.mapper.toEntity(request);
        newUser.setRole(Roles.SELLER); //Padrão
        
        String cipherText = PasswordEncoder.encode(request.password());
        newUser.setPasswordHash(cipherText);
        
        User savedUser = this.repository.save(newUser);
        
        return this.mapper.toResponseDTO(savedUser);
    }
}
