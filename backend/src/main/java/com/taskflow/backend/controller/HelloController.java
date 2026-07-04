package com.taskflow.backend.controller;

import org.aspectj.internal.lang.annotation.ajcDeclareAnnotation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController 
public class HelloController {
    
    @GetMapping("/")
    public String home() {
        return "Welcome to TaskFlow Backend!";
    }
}
