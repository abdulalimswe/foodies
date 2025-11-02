package swe.utin.foodiesapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import swe.utin.foodiesapi.Entity.UserEntity;

import java.util.Optional;

public interface UserRepository extends MongoRepository<UserEntity, String> {
    Optional<UserEntity> findByEmail(String email);

}
