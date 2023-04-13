import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detail from '../screen/Detail';
import Home from '../screen/Home';

const Stack = createNativeStackNavigator();

export default function MainStack(){
    return  <Stack.Navigator initialRouteName='Home'>
    <Stack.Screen name="Home" component={Home} options={{headerShown:false,}} />
    <Stack.Screen name="Detail" component={Detail} options={{headerShown:false,}}/>
  </Stack.Navigator>
}