package com.example.ecommerce;

import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EcommerceApplication {
    public static void main(String[] args) {
        SpringApplication.run(EcommerceApplication.class, args);
    }

    @Bean
    CommandLineRunner seedProducts(ProductRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(new Product("Wireless Headphones",
                        "Comfortable wireless headphones with clear sound.",
                        "Electronics", 1499.00, 20,
                        "https://images.unsplash.com/photo-150"));
                repository.save(new Product("Everyday Backpack",
                        "Lightweight backpack for college and travel.",
                        "Accessories", 899.00, 15,
                        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"));
                repository.save(new Product("Classic Wrist Watch",
                        "Minimal design for everyday use.",
                        "Fashion", 1199.00, 12,
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30"));
                repository.save(new Product("Running Shoes",
                        "Comfortable shoes for daily activity.",
                        "Footwear", 1899.00, 10,
                        "https://images.unsplash.com/photo-1542291026-7eec264c27ff"));
            }
        };
    }
}
