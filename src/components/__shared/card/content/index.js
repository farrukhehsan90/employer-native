import React from "react";
import { View, Text, ScrollView,Dimensions } from "react-native";

// Sub Component for Employee Card
const Content = ({ styles, item }) => {
  return (
    <View style={styles.contentContainer}>
      <ScrollView contentContainerStyle={styles.contentScroller}>
        <View style={{width:'100%',minHeight:Dimensions.get("window").height/5,justifyContent:'space-around',flexWrap:'wrap'}}>
          <Text style={{fontSize:20}}>Details</Text>
        <Text style={{color:"#FF8362"}}>Address : <Text style={{color:"#000",fontSize:15,fontWeight:'700'}}>
        {item.address}
        </Text> 
        </Text>
        <Text style={{color:"#FF8362"}}>Email : <Text style={{color:"#000",fontSize:15,fontWeight:'700'}}>
        {item.email}
        </Text> 
        </Text>
        <Text style={{color:"#FF8362"}}>Phone : <Text style={{color:"#000",fontSize:15,fontWeight:'700'}}>
        {item.phone}
        </Text> 
        </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Content;
