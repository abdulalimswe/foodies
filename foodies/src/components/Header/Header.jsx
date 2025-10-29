import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div>
            <div className="p-5 mb-4 bg-light rounded-3 mt-1">
                <div className="container-fluid py-5 text-center">
                    <h1 className="display-5 fw-bold">Order your favorite food here</h1>
                    <p className="col-md-8 fs-4 mx-auto">Discover delicious recipes, cooking tips, and culinary inspiration
                        all in one place. Let's make your kitchen the heart of your home!</p>
                    <Link to="/explorefood" className="btn btn-primary">Explore</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;