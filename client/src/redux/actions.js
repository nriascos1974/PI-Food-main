import {
  ADD_RECIPE,
  FILTER_TYPE_DIET,
  FILTER_ORGIN,
  ORDERBY,
  GET_RECIPES,
  GET_DIETS,
  RESET_FILTER,
} from "./type-actions";
import axios from "axios";

export const addRecipe = (recipe) => {
  return async (dispatch) => {
    const response = await axios.post("http://localhost:3001/recipes", recipe);
    return dispatch({
      type: ADD_RECIPE,
      payload: response.data,
    });
  };
};

export const getDiets = () => {
  return async (dispatch) => {
    const response = await axios(`http://localhost:3001/diets`);
    return dispatch({
      type: GET_DIETS,
      payload: response.data,
    });
  };
};

export const getRecipes = () => {
  return async (dispatch) => {
    const response = await axios(`http://localhost:3001/recipes`);
    return dispatch({
      type: GET_RECIPES,
      payload: response.data,
    });
  };
};

export const getRecipesName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios(
        `http://localhost:3001/recipes?name=${name}`
      );
      return dispatch({
        type: GET_RECIPES,
        payload: response.data,
      });
    } catch (error) {
      alert("Recipe not found");
    }
  };
};

export const orderCards = (order) => {
  return {
    type: ORDERBY,
    payload: order,
  };
};

export const filterOrigin = (origin) => {
  return {
    type: FILTER_ORGIN,
    payload: origin,
  };
};

export const filterTypeDiet = (typediet) => {
  return {
    type: FILTER_TYPE_DIET,
    payload: typediet,
  };
};
export const filterReset = () => {
  return {
    type: RESET_FILTER,
  };
};