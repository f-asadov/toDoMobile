import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Animated,
  SafeAreaView,
} from 'react-native';
const Sound = require('react-native-sound');
import React from 'react';
Sound.setCategory('Playback');

const NewTask = props => {
  const [newTask, setNewTask] = React.useState('');
  const [confirmDisabled, setConfirmDisabled] = React.useState(true);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const test = event => {
    setNewTask(event);

    if (event.length === 0) {
      setConfirmDisabled(true);
    } else if (event.length >= 0) {
      setConfirmDisabled(false);
    }
  }

  const confirm = () => {
    props.onAddTask(newTask);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    let succesSound = new Sound('confirm.mp3', Sound.MAIN_BUNDLE, err => {

      setTimeout(() => {
        console.log('aaa')
        props.onNewTaskFormClose(true)
      }, 1000);

      
      if (err) {
        console.log('error');
        return;
      }

      succesSound.play(succes => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }).start();
      });


      
    });

    
    
  }


  const getStyle = () => {
    return confirmDisabled ? styles.disabledButton : styles.activeButton;
  };

  return (
    <View style={styles.main}>
      <View onTouchStart={props.onNewTaskFormClose} style={styles.topContainer}>
        <Image source={require('../images/arrow.png')} style={styles.arrow} />
      </View>

      <View style={styles.inputContainer}>
        <SafeAreaView>
          <Animated.View
            style={[
              styles.fadingContainer,
              {
                opacity: fadeAnim,
              },
            ]}>
            <Image
              source={require('../images/check-mark.png')}
              style={styles.fadingText}
            />
            <Text>{newTask} Added!</Text>
          </Animated.View>
        </SafeAreaView>

        <TextInput style={styles.taskInput} onChangeText={test}></TextInput>
        <TouchableOpacity style={{width:'90%'}} disabled={confirmDisabled} onPress={confirm}>
          <View style={[styles.confirmButton, getStyle()]}>
            <Text style={styles.confirmButtonText}>Добавить</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width:'100%'
  },
  topContainer: {
    height: '10%',
    marginLeft:'5%'
  },
  inputContainer: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskInput: {
    width: '90%',
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'rgba(0,0,0,.2)',
  },
  confirmButton: {
    height: 35,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
  },
  disabledButton: {
    borderColor: 'rgba(0,0,0,.2)',
    backgroundColor: '#222F3E',
    opacity: 0.5,
  },
  activeButton: {
    borderColor: 'rgba(0,0,0,.2)',
    backgroundColor: '#222F3E',
    opacity: 1,
    
  },
  arrow: {
    marginTop: 20,
    height: 30,
    width: 30,
  },
  fadingContainer: {
    alignItems: 'center',
  }
});

export default NewTask;
