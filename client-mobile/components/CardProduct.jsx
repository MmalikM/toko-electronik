import { useNavigation } from "@react-navigation/native";
import { Text, View ,StyleSheet} from "react-native";
import { Button, Card } from 'react-native-paper';

export default function CardProduct({product}){
  const navigation=useNavigation()
    return (
        <Card style={{margin:3, width:"45%" , height:280}}>
          <Card.Cover style={{height:"50%", width:'80%', margin:5}} source={{ uri: product?.mainImg }}/>
          <Card.Content style={{alignItems: "center",justifyContent: "center",}}> 
            <Text style={{ fontWeight: "bold", fontSize:15}} variant="titleLarge">{product?.name}</Text>
            <Text variant="bodyMedium">{product?.category?.name}</Text>
          <Card.Actions>
            <Button  onPress={() => navigation.navigate('Detail',{
              productId:product?.id
            })}><Text style={styles.buttonText}> See Detail</Text></Button>
          </Card.Actions>
          </Card.Content>
        </Card>
    )
}
const styles = StyleSheet.create({
  buttonText:{
    fontSize:11
  },

});
