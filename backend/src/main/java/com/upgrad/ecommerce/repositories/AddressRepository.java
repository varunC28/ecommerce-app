package com.upgrad.ecommerce.repositories;

import com.upgrad.ecommerce.models.Address;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AddressRepository extends MongoRepository<Address, String> {

    boolean existsByContactNumberIgnoreCase(String contactNumber);
    List<Address> findAllByUser_Id(String userId);
}
