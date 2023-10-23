
import { firebaseConfig } from '../Secrets';
import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from "./Reducer";

import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addItem = (newText) => {
  return async (dispatch) => {
    const docRef = await addDoc(collection(db, 'todos'), {text: newText});
    const id = docRef.id;
    dispatch({
      type: ADD_ITEM,
      payload: {
        text: newText, 
        key: id
      }
    });
  }
}

const updateItem = (item, newText) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_ITEM,
      payload: {
        key: item.key,
        text: newText, 
      }
    });
  }
}

const deleteItem = (item) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_ITEM,
      payload: {
        key: item.key
      }
    })
  };
}

export {
  addItem, updateItem, deleteItem
}