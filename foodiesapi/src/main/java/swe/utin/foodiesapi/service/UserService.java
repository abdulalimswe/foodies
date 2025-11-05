package swe.utin.foodiesapi.service;

import swe.utin.foodiesapi.io.UserRequest;
import swe.utin.foodiesapi.io.UserResponse;

public interface UserService {
    UserResponse registerUser(UserRequest userRequest);
    String findByUserId();
}