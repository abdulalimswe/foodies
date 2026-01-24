import React, {useContext, useState} from "react";
import './PlaceOrder.css';
import {StoreContext} from "../../context/StoreContext.jsx";
import {calculateTotals} from "../../util/cartUtils.js";
import {createOrderWithPayment} from "../../service/orderService.js";
import {useNavigate} from "react-router-dom";

const PlaceOrder = () => {
    const navigate = useNavigate();
    const {foodList, quantities, setQuantities, token} = useContext(StoreContext);

    const cartItems = foodList.filter(food => quantities[food.id] > 0);

    const {subtotal, shipping, tax, total} = calculateTotals(
        cartItems,
        quantities
    );

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        country: 'Bangladesh',
        state: 'Dhaka',
        zip: '',
        paymentGateway: 'SSLCOMMERZ',
        paymentMethod: 'bkash'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle input changes
    const handleInputChange = (e) => {
        const {id, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Prepare order items
            const orderedItems = cartItems.map(item => ({
                foodId: item.id,
                foodName: item.name,
                quantity: quantities[item.id],
                price: item.price
            }));

            // Prepare order request
            const orderRequest = {
                orderedItems: orderedItems,
                userAddress: `${formData.address}, ${formData.state}, ${formData.country}, ${formData.zip}`,
                amount: total,
                phoneNumber: formData.phone,
                email: formData.email,
                customerName: `${formData.firstName} ${formData.lastName}`,
                paymentGateway: formData.paymentGateway,
                paymentMethod: formData.paymentMethod
            };

            // Create order with payment
            const response = await createOrderWithPayment(orderRequest, token);

            // Handle different payment methods
            if (formData.paymentGateway === 'COD') {
                // For COD, redirect to success page
                alert('Order placed successfully! You will pay on delivery.');
                setQuantities({});
                navigate('/');
            } else if (response.paymentUrl) {
                // For online payment, redirect to payment gateway
                window.location.href = response.paymentUrl;
            } else {
                setError('Payment URL not received. Please try again.');
            }
        } catch (err) {
            console.error('Error creating order:', err);
            setError(err.response?.data?.message || 'Failed to create order. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='container mt-5'>
            <div className="row mt-2">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-primary">Your cart</span>
                        <span className="badge rounded-pill bg-primary">{cartItems.length}</span>
                    </h4>
                    <ul className="list-group mb-3 sticky-top">
                        {cartItems.map(item => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 className="my-0">{item.name}</h6>
                                    <small className="text-muted"> Qty: {quantities[item.id]}</small>
                                </div>
                                <span className="text-muted">&#x09F3; {item.price * quantities[item.id]}</span>
                            </li>
                        ))}
                        <li className="list-group-item d-flex justify-content-between bg-light">
                            <div>
                                <span>Shipping</span>
                            </div>
                            <span className="text-body-secondary">&#x09F3; {subtotal === 0 ? 0.0 : shipping.toFixed(2)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between bg-light">
                            <div>
                                <span>Tax (10%)</span>
                            </div>
                            <span className="text-body-secondary">&#x09F3; {tax.toFixed(2)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (BDT)</span>
                            <strong>&#x09F3; {total.toFixed(2)}</strong>
                        </li>
                    </ul>
                </div>
                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">Billing address</h4>

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <form className="needs-validation" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lastName">Last name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className='form-label'>Email</label>
                            <div className="input-group has-validation">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">@</span>
                                </div>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                placeholder="+8801XXXXXXXXX"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                placeholder="Apartment or suite"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="row">
                            <div className="col-md-5 mb-3">
                                <label htmlFor="country">Country</label>
                                <select
                                    className="form-select d-block w-100"
                                    id="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Choose...</option>
                                    <option value="Bangladesh">Bangladesh</option>
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="state">State</label>
                                <select
                                    className="form-select d-block w-100"
                                    id="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Choose...</option>
                                    <option value="Dhaka">Dhaka</option>
                                    <option value="Chittagong">Chittagong</option>
                                    <option value="Sylhet">Sylhet</option>
                                    <option value="Rajshahi">Rajshahi</option>
                                </select>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="zip">Zip</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="zip"
                                    value={formData.zip}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <hr className="mb-4"/>

                        {/* Payment Method Selection */}
                        <h4 className="mb-3">Payment Method</h4>

                        <div className="mb-3">
                            <label htmlFor="paymentGateway" className="form-label">Payment Gateway</label>
                            <select
                                className="form-select"
                                id="paymentGateway"
                                value={formData.paymentGateway}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="SSLCOMMERZ">SSLCommerz (Bangladesh)</option>
                                <option value="COD">Cash on Delivery</option>
                            </select>
                        </div>

                        {formData.paymentGateway === 'SSLCOMMERZ' && (
                            <div className="mb-3">
                                <label className="form-label">Payment Method</label>
                                <div className="row">
                                    <div className="col-md-6 mb-2">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="paymentMethod"
                                                id="bkash"
                                                value="bkash"
                                                checked={formData.paymentMethod === 'bkash'}
                                                onChange={(e) => setFormData(prev => ({...prev, paymentMethod: e.target.value}))}
                                            />
                                            <label className="form-check-label" htmlFor="bkash">
                                                bKash
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="paymentMethod"
                                                id="rocket"
                                                value="rocket"
                                                checked={formData.paymentMethod === 'rocket'}
                                                onChange={(e) => setFormData(prev => ({...prev, paymentMethod: e.target.value}))}
                                            />
                                            <label className="form-check-label" htmlFor="rocket">
                                                Rocket
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="paymentMethod"
                                                id="nagad"
                                                value="nagad"
                                                checked={formData.paymentMethod === 'nagad'}
                                                onChange={(e) => setFormData(prev => ({...prev, paymentMethod: e.target.value}))}
                                            />
                                            <label className="form-check-label" htmlFor="nagad">
                                                Nagad
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="paymentMethod"
                                                id="card"
                                                value="card"
                                                checked={formData.paymentMethod === 'card'}
                                                onChange={(e) => setFormData(prev => ({...prev, paymentMethod: e.target.value}))}
                                            />
                                            <label className="form-check-label" htmlFor="card">
                                                Credit/Debit Card
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {formData.paymentGateway === 'COD' && (
                            <div className="alert alert-info" role="alert">
                                <strong>Cash on Delivery</strong><br/>
                                You will pay in cash when you receive your order.
                            </div>
                        )}

                        <hr className="mb-4"/>
                        <button
                            className="btn btn-primary btn-lg w-100"
                            type="submit"
                            disabled={cartItems.length === 0 || loading}
                        >
                            {loading ? 'Processing...' : `Place Order (${formData.paymentGateway === 'COD' ? 'COD' : 'Pay'} ৳${total.toFixed(2)})`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder;