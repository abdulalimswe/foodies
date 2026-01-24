import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        // Get transaction details from URL parameters
        const transactionId = searchParams.get('tran_id');
        const amount = searchParams.get('amount');
        const status = searchParams.get('status');

        if (transactionId) {
            setOrderDetails({
                transactionId,
                amount,
                status
            });

            // Clear cart after successful payment
            localStorage.removeItem('cart');
        }
    }, [searchParams]);

    return (
        <div className="container payment-success-container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card payment-success-card shadow">
                        <div className="card-body text-center py-5">
                            <div className="success-icon mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-check-circle-fill text-success" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>
                            </div>

                            <h1 className="text-success mb-3">Payment Successful!</h1>
                            <p className="lead mb-4">Thank you for your order. Your payment has been processed successfully.</p>

                            {orderDetails && (
                                <div className="order-details mb-4">
                                    <div className="alert alert-success" role="alert">
                                        <h5 className="alert-heading">Order Details</h5>
                                        <hr />
                                        <p className="mb-1"><strong>Transaction ID:</strong> {orderDetails.transactionId}</p>
                                        {orderDetails.amount && (
                                            <p className="mb-1"><strong>Amount Paid:</strong> ৳{orderDetails.amount}</p>
                                        )}
                                        <p className="mb-0"><strong>Status:</strong> <span className="badge bg-success">Paid</span></p>
                                    </div>
                                </div>
                            )}

                            <div className="payment-actions">
                                <Link to="/" className="btn btn-primary btn-lg me-2">
                                    <i className="bi bi-house-door me-2"></i>
                                    Back to Home
                                </Link>
                                <Link to="/orders" className="btn btn-outline-primary btn-lg">
                                    <i className="bi bi-receipt me-2"></i>
                                    View Orders
                                </Link>
                            </div>

                            <div className="mt-4">
                                <p className="text-muted">
                                    <small>You will receive a confirmation email shortly with your order details.</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
