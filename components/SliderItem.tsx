import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NewNewsDataType } from "@/types";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";

type Props = {
  slider: NewNewsDataType;
  index: number;
  scrolling: SharedValue<number>;
};
const SCREEN_WIDTH= Dimensions.get("window").width;
const SliderItem = ({ slider, index, scrolling }: Props) => {
  
  const animateStyle= useAnimatedStyle(() =>{
    return{
      transform:[{
        translateX:interpolate(
          scrolling.value,
          [(index - 1)*SCREEN_WIDTH,index*SCREEN_WIDTH, (index + 1*SCREEN_WIDTH)],
          [-SCREEN_WIDTH*0.15,0,SCREEN_WIDTH*0.15],
          Extrapolation.CLAMP
        ),
      },
      {
        scale:interpolate(
          scrolling.value,
          [(index - 1)*SCREEN_WIDTH,index*SCREEN_WIDTH, (index + 1*SCREEN_WIDTH)],
          [0.9,1,0.9],
          Extrapolation.CLAMP
        )
      }
    ] 
   }
  })
  return (
    <Animated.View style={[styles.container,animateStyle]}>
      <Image source={{ uri: slider.image_url }} style={styles.image} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.bgWrapper}
      >
        <View style={styles.infoWrapper}>
          <Image 
          source={{uri:slider.source_icon}}
          style={styles.icon} />
          <Text style={styles.sourceName}>{slider.source_name}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {slider.description}
        </Text>
      </LinearGradient>
    </Animated.View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: SCREEN_WIDTH-60 ,
    height: 180,
    borderRadius: 20,
    resizeMode:"cover"
  },
  title: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
    position:"absolute",
    bottom: 20,
    marginLeft:20,
  },
  bgWrapper: {
    position: "absolute",
    width: SCREEN_WIDTH-60 ,
    height: 180,
    borderRadius: 20,
    // right: 0,
    // // left: 30,
    // top: 0,
    // padding: 20,
  },
  infoWrapper: {
    flexDirection: "row",
    position: "absolute",
    top: 80,
    paddingHorizontal: 20,
    alignItems: "center",
    gap:10
  },
  sourceName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
    
  },
  icon: {
    height:30,
     width:30,
     resizeMode: "contain",
     borderRadius:30,
  },
});
