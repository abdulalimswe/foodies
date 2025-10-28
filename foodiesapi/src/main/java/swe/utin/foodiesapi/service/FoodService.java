package swe.utin.foodiesapi.service;

import org.springframework.web.multipart.MultipartFile;
import swe.utin.foodiesapi.io.FoodRequest;
import swe.utin.foodiesapi.io.FoodResponse;

import java.util.List;

public interface FoodService {

    String uploadFile(MultipartFile file);
    FoodResponse addFood(FoodRequest request, MultipartFile file);

    List<FoodResponse> readFoods();

    FoodResponse readFoodById(String id);

    Boolean deleteFile(String filename);
    void deleteFoodById(String id);
}