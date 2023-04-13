import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, FlatList } from "react-native";
import { ActivityIndicator, Button, Card } from 'react-native-paper';
import CardProduct from "../components/CardProduct";
// yang d komen query d local

const GET_PRODUCT = gql`
# query Query {
#   findProducts {
#     name
#     price
#     id
#     mainImg
#     category {
#       name
#     }
#   }
# }
query FindProducts {
  findProducts {
    UserMongoId
    description
    id
    mainImg
    name
    price
    images {
      imgUrl
    }
    category {
      name
    }
    slug
  }
}
`

export default function Home() {
//category di hardcode soalnya d server tidak di handel get category
  const categories = ['HP','Laptop','Monitor',"Tablet","Mouse","Keyboard","Headset"]

  const {loading,data,error} = useQuery(GET_PRODUCT)
  

  if(loading) return <ActivityIndicator size={'large'}/>
  if(error) return <Text>Error</Text>

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "column",
        },
      ]}
    >
      {/* header */}
      <View style={{ flex: 1 }}>
        <View style={[{ flex: 1 }, styles.head]}>
          <Text style={styles.fontHead}>Welcome To Electronik Store</Text>
        </View>
      </View>
      {/* iklan */}
      <View style={{ flex: 3 }}>
        <Card>
          <Card.Cover
            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAboRIt9oL3IYRlFNmv3XGsOWnB-7xDqMNUg&usqp=CAU" }}
            style={{ width: "100%", height: "100%" }}
            resizeMode={'contain'}
          />
        </Card>
      </View>

      {/* list category */}
      <View style={{ flex: 1}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        {
          categories?.map((category,index)=>{
            return <View key={index} style={styles.listCategory}>
              <Button
                style={styles.buttonCategory}
                mode="contained"
                onPress={() => console.log("Pressed")}
              >
                <Text style={{ color: "black" }}>{category}</Text>
              </Button>
            </View>

          })
        }
        </ScrollView>
      </View>
      {/* list product */}
      <View style={{ flex: 7, margin:2 }}>
        <FlatList
          data={data?.findProducts}
          renderItem={({item})=><CardProduct product={item}/>}
          keyExtractor={item=> item.id}
          numColumns={2}
        />
           
      </View>

      </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FCFFE7",
    flex: 1,
    padding: 20,
  },
  head: {
    alignItems: "center",
    justifyContent: "center",
  },
  fontHead: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2B3467",
  },
  listCategory: {
    padding:5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonCategory: {
    backgroundColor: "#E8D5C4",
    fontSize: 10,
  },
});
