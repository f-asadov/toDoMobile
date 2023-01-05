import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React from 'react';

const initialData = [
  {id: 1, selected: true, text: 'Сделать тестовое'},
  {id: 2, selected: false, text: 'Сдать тестовое'},
  {id: 3, selected: false, text: 'Начать зарабатывать'},
];

const TodoList = () => {

    

  return (
    <View style={listStyle.listContainer}>
      <Image source={require('../images/azalia.png')} />
      <FlatList
        data={initialData}
        renderItem={({item}) => (
          <TodoItem text={item.text} selected={item.selected} />
        )}
      />
    </View>
  );
};



const TodoItem = props => {
    const [data,setData] = React.useState(initialData)

    const onCheckChange = (event) =>{
        console.log(event)
    }



  return (
    <View style={itemStyle.itemContainer}>
      <CheckBox
        style={itemStyle.CheckBoxStyle}
        tintColors={{true: '#222F3E', false: '#222F3E'}}
        value={props.selected}
        onChange={onCheckChange}
      />
      <Text style={itemStyle.itemText}>{props.text}</Text>
    </View>
  );
};

const itemStyle = StyleSheet.create({
  itemContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,.1)',
    borderWidth: 2,
    borderRadius: 8,
    height: 50,
    paddingLeft: 10,
  },
  itemText: {
    color: '#222F3E',
    fontSize: 24,
    fontFamily: 'Roboto-Thin',
    marginLeft: 10,
  },
  CheckBoxStyle: {
    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
  },
});

const listStyle = StyleSheet.create({
  listContainer: {
    marginTop: 140,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 50,
  },
});

export default TodoList;
