package swe.utin.foodiesapi.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import swe.utin.foodiesapi.io.OrderRequest;
import swe.utin.foodiesapi.io.OrderResponse;
import swe.utin.foodiesapi.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/create")
    public OrderResponse createOrderWithPayment(@RequestBody OrderRequest request) throws Exception {
        OrderResponse response = orderService.createOrderWithPayment(request);
        return response;
    }
}
