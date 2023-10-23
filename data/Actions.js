
import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from "./Reducer";

const addItem = (newText) => {
  return {
    type: ADD_ITEM,
    payload: {
      text: newText, 
    }
  }
}

const updateItem = (item, newText) => {
  return {
    type: UPDATE_ITEM,
    payload: {
      key: item.key,
      text: newText, 
    }
  }
}


const deleteItem = (item) => {
  return {
    type: DELETE_ITEM,
    payload: {
      key: item.key
    }
  };
}
export {
  addItem, updateItem, deleteItem
}