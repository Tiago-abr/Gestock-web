package com.tiago.gestock.util;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordEncoder {
    
    public static String encode(String rawPassword){
        return BCrypt.hashpw(rawPassword, BCrypt.gensalt());
    }
    
    public static boolean matches(String rawPassword, String encodedPassword){
        try{
            return BCrypt.checkpw(rawPassword, encodedPassword);
        }catch(IllegalArgumentException exception){
            return false;
        }
    }
}
