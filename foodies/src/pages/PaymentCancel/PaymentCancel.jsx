import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './PaymentCancel.css';

const PaymentCancel = () => {
    const [searchParams] = useSearchParams();
    const [cancelDetails, setCancelDetails] = useState(null);

    useEffect(() => {
        // Get cancellation details from URL parameters
        const transactionId = searchParams.get('tran_id');
        const status = searchParams.get('status');

        setCancelDetails({
            transactionId,
            status
        });
    }, [searchParams]);

    return (
        <div className="container payment-cancel-container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card payment-cancel-card shadow">
                        <div className="card-body text-center py-5">
                            <div className="cancel-icon mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-x-octagon-fill text-warning" viewBox="0 0 16 16">
                                    <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                                </svg>
                            </div>

                            <h1 className="text-warning mb-3">Payment Cancelled</h1>
                            <p className="lead mb-4">You have cancelled the payment process.</p>

                            {cancelDetails && cancelDetails.transactionId && (
                                <div className="cancel-details mb-4">
                                    <div className="alert alert-warning" role="alert">
                                        <h5 className="alert-heading">Transaction Details</h5>
                                        <hr />
                                        <p className="mb-1"><strong>Transaction ID:</strong> {cancelDetails.transactionId}</p>
                                        <p className="mb-0"><strong>Status:</strong> <span className="badge bg-warning text-dark">Cancelled</span></p>
                                    </div>
                                </div>
                            )}

                            <div className="info-message mb-4">
                                <div className="alert alert-info" role="alert">
                                    <i className="bi bi-info-circle me-2"></i>
                                    Don't worry! Your order has not been placed and no charges were made to your account.
                                </div>
                            </div>

                            <div className="payment-actions">
                                <Link to="/order" className="btn btn-primary btn-lg me-2">
                                    <i className="bi bi-arrow-clockwise me-2"></i>
                                    Try Again
                                </Link>
                                <Link to="/cart" className="btn btn-outline-primary btn-lg me-2">
                                    <i className="bi bi-cart me-2"></i>
                                    View Cart
                                </Link>
                                <Link to="/" className="btn btn-outline-secondary btn-lg">
                                    <i className="bi bi-house-door me-2"></i>
                                    Back to Home
                                </Link>
                            </div>

                            <div className="mt-4">
                                <p className="text-muted">
                                    <small>Need assistance? Contact us at support@foodies.com</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;

