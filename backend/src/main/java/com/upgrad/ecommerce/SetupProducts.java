package com.upgrad.ecommerce;

import com.upgrad.ecommerce.dto.ProductDTO;
import com.upgrad.ecommerce.services.ProductService;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SetupProducts implements ApplicationListener<ApplicationReadyEvent> {
    
    private final ProductService productService;

    public SetupProducts(ProductService productService) {
        this.productService = productService;
    }

    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        try {
            // Check if products already exist
            List<ProductDTO> existingProducts = productService.findAll();
            if (!existingProducts.isEmpty()) {
                System.out.println("Products already exist, skipping product creation");
                return;
            }

            // Add sample products
            addSampleProducts();
            System.out.println("Sample products created successfully");
        } catch (Exception e) {
            System.out.println("Error creating sample products: " + e.getMessage());
        }
    }

    private void addSampleProducts() {
        // Electronics
        createProduct("iPhone 13", "Electronics", 999.99, 
            "Latest iPhone with advanced features", "Apple", 50, 
            "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/mba_15_m3_2024_hero.png");
        
        createProduct("Samsung Galaxy S21", "Electronics", 899.99, 
            "Premium Android smartphone", "Samsung", 30, 
            "https://via.placeholder.com/300x200?text=Galaxy+S21");
        
        createProduct("MacBook Pro", "Electronics", 1499.99, 
            "Professional laptop for developers", "Apple", 25, 
            "https://via.placeholder.com/300x200?text=MacBook+Pro");

        // Clothing
        createProduct("Nike Air Max", "Clothing", 129.99, 
            "Comfortable running shoes", "Nike", 100, 
            "https://via.placeholder.com/300x200?text=Nike+Air+Max");
        
        createProduct("Adidas T-Shirt", "Clothing", 29.99, 
            "Comfortable cotton t-shirt", "Adidas", 200, 
            "https://via.placeholder.com/300x200?text=Adidas+T-Shirt");

        // Books
        createProduct("The Great Gatsby", "Books", 12.99, 
            "Classic American novel", "Scribner", 75, 
            "https://via.placeholder.com/300x200?text=Great+Gatsby");
        
        createProduct("To Kill a Mockingbird", "Books", 11.99, 
            "Harper Lee's masterpiece", "Grand Central", 60, 
            "https://via.placeholder.com/300x200?text=Mockingbird");

        // Home & Garden
        createProduct("Coffee Maker", "Home & Garden", 89.99, 
            "Automatic coffee brewing machine", "Keurig", 40, 
            "https://via.placeholder.com/300x200?text=Coffee+Maker");
        
        createProduct("Garden Hose", "Home & Garden", 24.99, 
            "50ft heavy-duty garden hose", "Flexzilla", 80, 
            "https://via.placeholder.com/300x200?text=Garden+Hose");
    }

    private void createProduct(String name, String category, Double price, 
                             String description, String manufacturer, 
                             Integer availableItems, String imageUrl) {
        try {
            ProductDTO product = new ProductDTO();
            product.setName(name);
            product.setCategory(category);
            product.setPrice(price);
            product.setDescription(description);
            product.setManufacturer(manufacturer);
            product.setAvailableItems(availableItems);
            product.setImageUrl(imageUrl);
            
            productService.create(product);
            System.out.println("Created product: " + name);
        } catch (Exception e) {
            System.out.println("Failed to create product " + name + ": " + e.getMessage());
        }
    }
} 