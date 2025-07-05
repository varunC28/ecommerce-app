package com.upgrad.ecommerce.controllers;

import com.upgrad.ecommerce.dto.ProductDTO;
import com.upgrad.ecommerce.security.jwt.AuthTokenFilter;
import com.upgrad.ecommerce.services.ProductService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/products", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProductResource {
    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    private final ProductService productService;

    public ProductResource(final ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    @GetMapping("/categories")
    public ResponseEntity<Set<String>> getProductCategories() {
        List<ProductDTO> products = productService.findAll();
        Set<String> categories = new HashSet<>();
        for (ProductDTO prod : products) {
            categories.add(prod.getCategory());
        }
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable final String id) {
        return ResponseEntity.ok(productService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ProductDTO> createProduct(@RequestBody @Valid final ProductDTO productDTO) {
        String productId = productService.create(productDTO);
        return new ResponseEntity<>(productService.get(productId), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable final String id,
                                                    @RequestBody @Valid final ProductDTO productDTO) {
        productService.update(id, productDTO);
        return new ResponseEntity<>(productService.get(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable final String id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
