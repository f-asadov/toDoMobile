import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import NewTask from './newTask';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
const Sound = require('react-native-sound');
Sound.setCategory('Playback');

const initialData = [
  {id: 1, selected: false, text: 'Сделать'},
  {id: 2, selected: false, text: 'Сдать'},
  {id: 3, selected: false, text: 'Начать'},
];

const TodoList = () => {
  const [data, setData] = React.useState(initialData);
  const [newTaskVisible, setNewTaskVisible] = React.useState(false);

  const onDataChange = newItem => {
    const newData = data.map(item => (item.id === newItem.id ? newItem : item));
    setData(newData);
  };

  const onAddTask = task => {
    const newTask = {
      id: data.length + 1,
      selected: false,
      text: task,
    };
    setData([...data, newTask]);
  };

  const deleteItem = deletedItemId => {
    const updatedData = data.filter(obj => obj.id !== deletedItemId);
    setData(updatedData);

    let deleteSound = new Sound('delete.mp3', Sound.MAIN_BUNDLE, err => {
      deleteSound.setVolume(0.5);
      if (err) {
        console.log('error');
        return;
      }
      deleteSound.play();
    });
  };

  const onNewTaskFormClose = () => {
    setNewTaskVisible(false);
  };

  return (
    <View style={listStyle.main}>
      {newTaskVisible ? (
        <NewTask
          onNewTaskFormClose={onNewTaskFormClose}
          onAddTask={onAddTask}
        />
      ) : (
        <View style={{width: '100%'}}>
          <View style={listStyle.listContainer}>
            <View style={listStyle.header}>
              <Image
                style={listStyle.logo}
                source={require('../images/nkf.png')}
              />

              <View style={listStyle.addWrapper}>
                <TouchableOpacity>
                  <View
                    onTouchStart={() => setNewTaskVisible(true)}
                    style={listStyle.addButton}>
                    <Image source={require('../images/plus.png')} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <FlatList
              data={data}
              renderItem={({item}) => (
                <TodoItem
                  id={item.id}
                  text={item.text}
                  selected={item.selected}
                  onDataChange={onDataChange}
                  deleteItem={deleteItem}
                />
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const TodoItem = props => {
  const [currentValue, setCurrentValue] = React.useState(props.selected);

  const onCheckChange = event => {
    setCurrentValue(event);
    const newItem = {
      id: props.id,
      text: props.text,
      selected: event,
    };
    props.onDataChange(newItem);
  };

  const deleteItem = () => {
    const deletedItemId = props.id;
    props.deleteItem(deletedItemId);
  };

  const RenderRight = e => {
    return (
      <View style={itemStyle.delete}>
        <Pressable android_disableSound={true} onPress={deleteItem}>
          <Image
            style={{width: 35, height: 35, alignSelf: 'center'}}
            source={require('../images/delete.png')}
          />
        </Pressable>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={RenderRight}>
        <View style={itemStyle.itemContainer}>
          <CheckBox
            style={itemStyle.CheckBoxStyle}
            tintColors={{true: '#222F3E', false: '#222F3E'}}
            value={currentValue}
            onValueChange={onCheckChange}
          />
          <Text
            style={
              props.selected ? itemStyle.itemTextFinished : itemStyle.itemText
            }>
            {props.text}
          </Text>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
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
    minHeight: 50,
    paddingLeft: 10,
  },

  itemText: {
    color: '#222F3E',
    fontSize: 24,
    fontFamily: 'Roboto-Thin',
    marginLeft: 10,
  },
  itemTextFinished: {
    color: '#222F3E',
    fontSize: 24,
    fontFamily: 'Roboto-Thin',
    marginLeft: 10,
    textDecorationLine: 'line-through',
  },
  delete: {
    marginTop: 23,
  },
});

const listStyle = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    height:'20%',
  },
  listContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 'auto',
    height: '100%',
  },
  addWrapper:{
    flex:2
  },
  addButton: {
    backgroundColor: '#222F3E',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 50,
    height: 50, 
  },
  plus: {
    color: 'white',
    fontSize: 40,
  },
  logo: {
    width:50,
    height:'auto',
    marginRight:'auto',
    flex:2,
    borderWidth:3
  },
});

export default TodoList;
