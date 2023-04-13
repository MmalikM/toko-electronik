import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";


export default function Dummy() {
  const navigation = useNavigation()
    return (
      <View style={{ flex: 1, alignItems: "center",justifyContent: "center"}}>
        <Text>Chart Screen</Text>
        <Button title="back" onPress={() => navigation.navigate('Home')}/>
      </View>
    );
  }
  