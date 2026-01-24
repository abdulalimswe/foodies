import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './PaymentFailure.css';

const PaymentFailure = () => {
    const [searchParams] = useSearchParams();
    const [failureDetails, setFailureDetails] = useState(null);

    useEffect(() => {
        // Get failure details from URL parameters
        const transactionId = searchParams.get('tran_id');
        const error = searchParams.get('error');
        const status = searchParams.get('status');

        setFailureDetails({
            transactionId,
            error: error || 'Payment processing failed',
            status
        });
    }, [searchParams]);

    return (
        <div className="container payment-failure-container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card payment-failure-card shadow">
                        <div className="card-body text-center py-5">
                            <div className="failure-icon mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-x-circle-fill text-danger" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                </svg>
                            </div>

                            <h1 className="text-danger mb-3">Payment Failed</h1>
                            <p className="lead mb-4">Unfortunately, your payment could not be processed.</p>

                            {failureDetails && (
                                <div className="failure-details mb-4">
                                    <div className="alert alert-danger" role="alert">
                                        <h5 className="alert-heading">Error Details</h5>
                                        <hr />
                                        {failureDetails.transactionId && (
                                            <p className="mb-1"><strong>Transaction ID:</strong> {failureDetails.transactionId}</p>
                                        )}
                                        <p className="mb-1"><strong>Error:</strong> {failureDetails.error}</p>
                                        <p className="mb-0"><strong>Status:</strong> <span className="badge bg-danger">Failed</span></p>
                                    </div>
                                </div>
                            )}

                            <div className="common-reasons mb-4">
                                <h5>Common Reasons for Payment Failure:</h5>
                                <ul className="list-unstyled text-start" style={{maxWidth: '500px', margin: '0 auto'}}>
                                    <li className="mb-2">
                                        <i className="bi bi-dash-circle text-danger me-2"></i>
                                        Insufficient balance in your account
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-dash-circle text-danger me-2"></i>
                                        Incorrect payment details
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-dash-circle text-danger me-2"></i>
                                        Network connectivity issues
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-dash-circle text-danger me-2"></i>
                                        Payment gateway timeout
                                    </li>
                                </ul>
                            </div>

                            <div className="payment-actions">
                                <Link to="/order" className="btn btn-primary btn-lg me-2">
                                    <i className="bi bi-arrow-clockwise me-2"></i>
                                    Try Again
                                </Link>
                                <Link to="/" className="btn btn-outline-secondary btn-lg">
                                    <i className="bi bi-house-door me-2"></i>
                                    Back to Home
                                </Link>
                            </div>

                            <div className="mt-4">
                                <p className="text-muted">
                                    <small>Need help? Contact our support team at support@foodies.com</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailure;
