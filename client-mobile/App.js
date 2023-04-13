import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import client from './config/apollo';
import MainStack from './navigators/MainStack';
import Tab from './navigators/Tab';


export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer> 
        <Tab/>
      </NavigationContainer>
    </ApolloProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
