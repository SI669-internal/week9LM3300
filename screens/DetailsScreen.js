import { useState } from "react";
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Input, Button } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';

import { ADD_ITEM, UPDATE_ITEM } from '../data/Reducer';
import { saveAndDispatch } from '../data/DB';

function DetailsScreen(props) {

  const { navigation, route } = props;
  const { item } = route.params;

  const dispatch = useDispatch();

  const [inputText, setInputText] = useState(item.text);

  const addItem = (newText) => {
    const action = {
      type: ADD_ITEM,
      payload: {
        text: newText, 
      }
    }
    saveAndDispatch(action, dispatch);
  }

  const updateItem = (item, newText) => {
    const action = {
      type: UPDATE_ITEM,
      payload: {
        key: item.key,
        text: newText, 
      }
    };
    saveAndDispatch(action, dispatch);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Edit Item
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder='New Item'
          value={inputText}
          onChangeText={(text)=>setInputText(text)}
          style={styles.inputStyle}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title='Cancel'
          onPress={()=>{
            navigation.navigate('Home');
          }}
        />
        <Button
          title='Save'
          onPress={()=>{
            if (item.key === -1) {
              addItem(inputText);
            } else {
              updateItem(item, inputText);
            }
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingTop: '20%'
  }, 
  header: {
    flex: 0.1,
    justifyContent: 'flex-end',
    paddingBottom: '5%'
  },
  headerText: {
    fontSize: 32
  },
  inputContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%'
  },
  tagContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  tagLabel: {
    margin: 3,
    padding: 3, 
    backgroundColor: 'lightgray',
    borderRadius: 6,
    borderWidth: 0
  },
  buttonContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  }
});

export default DetailsScreen;