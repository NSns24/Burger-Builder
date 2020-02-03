import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: null,
    error: null,
    building: false
}

const BASE_PRICE = 4000;

const INGREDIENT_PRICES = {
    salad: 1000,
    bacon: 2000,
    cheese: 1500,
    meat: 2500
}

const addIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
}

const removeIngredient = (state, action) => {
    const count = state.ingredients[action.ingredientName] - 1;

    if (count < 0) {
        return state;
    }

    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
}

const setIngredients = (state, action) => {
    return {
        ...state,
        ingredients: action.ingredients,
        error: null,
        totalPrice: BASE_PRICE,
        building: false
    };
}

const fetchIngredientsFailed = (state, action) => {
    return {
        ...state,
        error: action.error
    };
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
}

export default reducer;