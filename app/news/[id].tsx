import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { NewNewsDataType } from "@/types";
import { Colors } from "@/constants/Colors";
import Moment from "moment";

type Props = {};

const NewsPage = (props: Props) => {
  const [newsList, setNewsList] = useState<NewNewsDataType[]>([]);
  const [isLoading, SetIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();


  useEffect(()=>{
    fetchNews()
  },[])
  const fetchNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
      const response = await axios.get(URL);
      if (response && response.data) {
        // console.log(response.data);
        
        setNewsList(response.data.results);
        SetIsLoading(false);
      }
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
    }
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                setLiked(!liked);
              }}
            >
              <Ionicons
                name={liked ? "heart" : "heart-outline"}
                size={25}
                color={liked ? "red" : "black"}
              />
            </TouchableOpacity>
          ),
          title:""
        }}
      />
      {isLoading?<ActivityIndicator size={"large"} color={Colors.tint}/>:(
         <ScrollView contentContainerStyle={styles.container}>
         <Text style={styles.title}>{newsList[0].title}</Text>
         <View style={styles.newsInfo}>
         <Text style={styles.infoText}>{Moment(newsList[0].pubDate).format('MMMM DD hh:mm a')}</Text>
         <Text style={styles.infoText}>{newsList[0].source_name}</Text>
         </View>
         

         <Image source={{uri:newsList[0].image_url}} style={styles.img}/>
         {newsList[0].content.length!==0?( <Text style={styles.contentStyle}>{newsList[0].description}</Text>): (<Text style={styles.contentStyle}>{newsList[0].content}</Text>)}
       </ScrollView>
      )}
     
    </>
  );
};

export default NewsPage;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Colors.white,
    marginHorizontal:20,
    paddingBottom:30,
  },
  img:{
    width:"100%",
    height:300,
    borderRadius:8,
    marginBottom:20
  },
  newsInfo:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginLeft:10,
    marginBottom:5,
    marginTop:10

  },
  infoText:{
    fontSize:14,
    color:Colors.darkGrey
  },
  title:{
    fontSize:18,
    fontWeight:"700",
    color:Colors.tint,
  },
  contentStyle:{
    fontSize:14,
    lineHeight:20,
    color:Colors.darkGrey,
    textAlign:"justify",

  }
});
