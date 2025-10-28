package swe.utin.foodiesapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import swe.utin.foodiesapi.Entity.FoodEntity;

public interface FoodRepository extends MongoRepository<FoodEntity, String> {
}
