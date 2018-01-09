package com.dorsal.repository;

import com.dorsal.domain.Product;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Product entity.
 */
@SuppressWarnings("unused")
public interface ProductRepository extends JpaRepository<Product,Long> {
    @Query("select product from Product product where product.id <= 25 ORDER BY product.id ASC")
    List<Product> findExpertProfileEntries();
}
