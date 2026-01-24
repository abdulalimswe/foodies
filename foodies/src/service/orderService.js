import axios from 'axios';

const API_URL = 'http://localhost:8080/api/orders';

/**
 * Create an order with payment gateway integration
 * @param {Object} orderData - Order details including payment information
 * @returns {Promise} Order response with payment URL
 */
export const createOrderWithPayment = async (orderData, token) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        // Add token to header if provided
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios.post(`${API_URL}/create`, orderData, config);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

/**
 * Get order by ID
 * @param {string} orderId - Order ID
 * @param {string} token - JWT token
 * @returns {Promise} Order details
 */
export const getOrderById = async (orderId, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await axios.get(`${API_URL}/${orderId}`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};

/**
 * Get all orders for current user
 * @param {string} token - JWT token
 * @returns {Promise} List of orders
 */
export const getUserOrders = async (token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await axios.get(`${API_URL}/user/orders`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw error;
    }
};
