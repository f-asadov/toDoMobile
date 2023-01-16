import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import LoadingScreen from './components/loading'
import TodoList from './components/todoList';

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const DisplayLogo = () => setIsLoading(prev => !prev);

  React.useEffect(() => {
    setTimeout(DisplayLogo, 3000);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <LoadingScreen/> : <TodoList/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1
  }
    
});
export default App;
