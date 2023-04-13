import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { ActivityIndicator, Button, Card } from "react-native-paper";

const GET_PRODUCT = gql`
query Query($findProductId: ID!) {
  findProduct(id: $findProductId) {
    description
    id
    UserMongoId
    category {
      name
    }
    images {
      imgUrl
    }
    mainImg
    name
    price
    user {
      username
      phoneNumber
    }
  }
}

  # query Query($findProductId: ID!) {
  #   findProduct(id: $findProductId) {
  #     UserMongoId
  #     category {
  #       name
  #     }
  #     description
  #     id
  #     images {
  #       imgUrl
  #       productId
  #       id
  #     }
  #     mainImg
  #     name
  #     price
  #     slug
  #     user {
  #       email
  #       username
  #       phoneNumber
  #     }
  #   }
  # }
`;

export default function Detail({ route }) {
  const navigation = useNavigation();
  const { productId } = route.params;
  const { loading, data, error } = useQuery(GET_PRODUCT, {
    variables: {
      findProductId: productId,
    },
  });
  console.log(data);
  if (loading) return <ActivityIndicator size={"large"} />;
  if (error) return <Text>Error</Text>

  return (
   
    <View style={[styles.container]}>
      {/* image */}
      <View style={{ flex: 5, flexDirection: "row" }}>
        <View style={{ flex: 5 }}>
          <Card.Cover style={{width:"100%",height:"100%"}} source={{ uri: data.findProduct.mainImg }} />
        </View>
        <View style={{ flex: 2 }}>
          <ScrollView >
            {
              data?.findProduct?.images?.map((image,index)=>{
                return (
                  <View key={index} >
                    <Card.Cover style={{margin:5, width:'100%', height:'100%'}} source={{ uri: image?.imgUrl }} />
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
      </View>
      {/* detail */}
      <View style={[styles.textTitle, { flex: 1, backgroundColor: "#fff8e8" }]}>
          <Text style={{ fontWeight: "bold", fontSize:30, margin:2, color:'#bb4430'}} variant="titleLarge">{data?.findProduct?.name}</Text>
          <Text style={{color:'#d52941', fontSize:18}} variant="bodyMedium">{data?.findProduct?.category?.name}</Text>
      </View>
      <View style={{ flex: 3, margin: 5 , backgroundColor:'#FFBF9B', padding:10}}>
            <Text style={{color:"#EA5455", fontSize:19, marginBottom:6,fontWeight: "bold"}} >Detail product:</Text>
            <ScrollView>
              <Text style={{color:"#002B5B", fontSize:17 ,fontStyle:'italic'}} >{data.findProduct.description}</Text>
              {/* descripsi tambahan biar panjang */}
              <Text style={{color:"#002B5B", fontSize:17 ,fontStyle:'italic'}} > iPhone 14 Pro Max memiliki layar Super Retina XDR menyeluruh 6,7 inci1. Bagian belakangnya terbuat dari kaca matte premium dan terdapat lapisan baja tahan karat dengan tepian rata di sekeliling rangka. Tombol samping berada di sisi kanan perangkat. Terdapat tiga kamera di bagian belakang: Ultra Lebar, Utama, dan Telefoto. Terdapat Pemindai LiDAR di bagian belakang. Terdapat kilat True Tone LED di bagian belakang. Di Amerika Serikat, tidak ada baki SIM. Di negara atau wilayah lain, baki SIM berada di sisi kiri yang menampung kartu nano-SIM “fourth form factor” (4FF).</Text>
            </ScrollView>
      </View>

      <View style={{ flex: 1, flexDirection:'row-reverse'}}>
        <Text style={{fontSize:15}} > author by: {data?.findProduct?.user?.username} ({data?.findProduct?.user?.phoneNumber})</Text>
      </View>

      <Button title="back" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FCFFE7",
    flex: 1,
    padding: 20,
    flexDirection: "column",
  },
  textTitle:{
    alignItems: "center",justifyContent: "center"
  }
});
