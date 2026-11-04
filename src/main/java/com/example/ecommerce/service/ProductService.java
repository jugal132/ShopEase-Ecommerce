package com.example.ecommerce.service;

import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> getProducts(String search) {
        if (search == null || search.isBlank()) {
            return repository.findAll();
        }
        return repository.findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(
                search.trim(), search.trim());
    }

    public Product getProduct(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found: " + id));
    }

    public Product createProduct(Product product) {
        product.setId(null);
        return repository.save(product);
    }
}
