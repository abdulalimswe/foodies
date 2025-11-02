import React, {useContext, useState} from "react";
import './PlaceOrder.css';
import {StoreContext} from "../../context/StoreContext.jsx";
import {calculateTotals} from "../../util/cartUtils.js";
const PlaceOrder = () => {
    const {foodList, quantities, setQuantities} = useContext(StoreContext);

    const cartItems = foodList.filter(food => quantities[food.id] > 0);

    const {subtotal, shipping,tax, total} = calculateTotals(
        cartItems,
        quantities
    );


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
                            <li className="list-group-item d-flex justify-content-between lh-condensed">
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
                    <form className="needs-validation" noValidate="">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">First name</label>
                                <input type="text" className="form-control" id="firstName" placeholder=""
                                       required=""/>
                                <div className="invalid-feedback"> Valid first name is required.</div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lastName">Last name</label>
                                <input type="text" className="form-control" id="lastName" placeholder=""
                                       required=""/>
                                <div className="invalid-feedback"> Valid last name is required.</div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className='form-label'>Email</label>
                            <div className="input-group has-validation">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">@</span>
                                </div>
                                <input type="email" className="form-control" id="email" placeholder="Email"
                                       required=""/>
                                <div className="invalid-feedback" style={{"width": "100%"}}> Your email is required.</div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="number" className="form-control" id="phone" placeholder="+8801XXXXXXXXX"
                                   required=""/>
                            <div className="invalid-feedback"> Please enter your shipping address.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address">Address <span className="text-muted"></span></label>
                            <input type="text" className="form-control" id="address" placeholder="Apartment or suite"/>
                        </div>
                        <div className="row">
                            <div className="col-md-5 mb-3">
                                <label htmlFor="country">Country</label>
                                <select className="custom-select d-block w-100" id="country" required="">
                                    <option >Choose...</option>
                                    <option>Bangladesh</option>
                                </select>
                                <div className="invalid-feedback"> Please select a valid country.</div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="state">State</label>
                                <select className="custom-select d-block w-100" id="state" required="">
                                    <option >Choose...</option>
                                    <option>Dhaka</option>
                                </select>
                                <div className="invalid-feedback"> Please provide a valid state.</div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="zip">Zip</label>
                                <input type="text" className="form-control" id="zip" placeholder="" required=""/>
                                <div className="invalid-feedback"> Zip code required.</div>
                            </div>
                        </div>
                        <hr className="mb-4"/>
                        <button className="btn btn-primary btn-sm " type="submit" disabled={cartItems.length === 0}>Continue to checkout</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder;