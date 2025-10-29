import React from "react";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay.jsx";

const ExploreFood = () => {
    const [category, setCategory] = React.useState('All');
    const [searchText, setSearchText] = React.useState('');

    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className='input-group mb-3'>
                                <select className='form-select mt-2' style={{'maxWidth':'150px'}} onChange={(e) => setCategory(e.target.value)}>
                                    <option value='All'>All</option>
                                    <option value='Biryani'>Biryani</option>
                                    <option value='Burger'>Burger</option>
                                    <option value='Cake'>Cake</option>
                                    <option value='IceCream'>Ice Cream</option>
                                    <option value='Pizza' >Pizza</option>
                                    <option value='Rolls'>Rolls</option>
                                    <option value='Salad'>Salad</option>
                                </select>
                                <input type='text' className='form-control mt-2' placeholder='Search Food...' aria-label='Search Food' aria-describedby='button-addon2'
                                       onChange={(e) => setSearchText(e.target.value)} value={searchText}/>
                                <button className='btn btn-outline-secondary mt-2' type='submit' >
                                    <i className='bi bi-search'></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <FoodDisplay category={category} searchText={searchText}/>
        </>


    )
}

export default ExploreFood;