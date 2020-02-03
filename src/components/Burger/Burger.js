import React from 'react';
import Ingredient from '../Burger/Ingredient/Ingredient';

import styles from './Burger.module.css';

function Burger({ ingredients }) {
    let transformedIngredients = Object.keys(ingredients)
        .map(igKey => {
            return [...Array(ingredients[igKey])]
                .map((_, index) => {
                    return <Ingredient key={igKey + index} type={igKey} />
                });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>;
    }

    return (
        <div className={styles.burger}>
            <Ingredient type="bread-top" />
            {transformedIngredients}
            <Ingredient type="bread-bottom" />
        </div>
    );
}

export default Burger;