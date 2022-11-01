import { initializeApp, getApps } from 'firebase/app';

import { 
  getFirestore, collection, getDocs,
  doc, getDoc, addDoc, updateDoc, deleteDoc 
} from 'firebase/firestore';
  
import { firebaseConfig } from '../Secrets';
import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, LOAD_ITEMS } from './Reducer';

let app, db = undefined;
const COLLNAME = 'listItems';

if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
}
db = getFirestore(app);  

const addItemAndDispatch = async (action, dispatch) => {
  const { payload } = action;
  const { text } = payload;  
  const coll = collection(db, COLLNAME);
  const newDocRef = await addDoc(coll, {
    text: text,
  });
  const newPayload = {
    ...payload,
    key: newDocRef.id
  }
  const newAction = {
    ...action,
    payload: newPayload
  } 
  dispatch(newAction);
}

const deleteItemAndDispatch = async (action, dispatch) => {
  const { payload } = action;
  const { key } = payload;
  const docToDelete = doc(collection(db, COLLNAME), key);
  await deleteDoc(docToDelete);
  dispatch(action);
}

const updateItemAndDispatch = async (action, dispatch) => {
  const { payload } = action;
  const { key, text } = payload;
  const docToUpdate = doc(collection(db, COLLNAME), key);
  await updateDoc(docToUpdate, {text: text});
  dispatch(action);
}

const loadItemsAndDispatch = async (action, dispatch) => {
  const querySnap = await getDocs(collection(db, COLLNAME));
  let newItems = [];
  querySnap.forEach(docSnap => {
    let newItem = docSnap.data();
    newItem.key = docSnap.id;
    newItems.push(newItem);
  });
  let newAction = {
    ...action,
    payload: { newItems }
  };
  dispatch(newAction);
}

const saveAndDispatch = async(action, dispatch) => {
  const {type, payload} = action;
  switch (type) {
    case ADD_ITEM:
      addItemAndDispatch(action, dispatch);
      return;
    case DELETE_ITEM: 
      deleteItemAndDispatch(action, dispatch);
      return;
    case UPDATE_ITEM:
      updateItemAndDispatch(action, dispatch);
      return;
    case LOAD_ITEMS:
      loadItemsAndDispatch(action, dispatch);
      return;
    default:
      return;
  }
}

export { saveAndDispatch };