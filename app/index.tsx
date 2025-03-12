import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInDown, FadeInLeft, FadeInRight, FlipInEasyX } from "react-native-reanimated";
import {StatusBar} from "expo-status-bar";

const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light"/>
      <ImageBackground
        source={require("@/assets/images/Boarding_screen.jpg")}
        resizeMode="cover"
        
        style={{ flex: 1,
          justifyContent:"center",
          
         }}
      >
        <View style={styles.screenWrapper}>
          <Animated.Text 
          entering={FadeInRight.delay(500).duration(500)}
          style={styles.textcontent}>Stay tuned !</Animated.Text>
          <Animated.Text 
          entering={FadeInLeft.delay(800).duration(500)}
          style={styles.description}>for Breaking news and more updates directly to your feed. </Animated.Text>
          <Animated.View entering={FadeInDown.delay(1300).duration(500)}>
          <TouchableOpacity 
          style={styles.startBtn}
          onPress={() => router.replace("/(tabs)")}>
            <Text style={styles.btnText}>Get Started </Text>
          </TouchableOpacity>
          </Animated.View>
          
        </View>
      </ImageBackground>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  screenWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom:50,
    paddingHorizontal: 30,
    gap:10,
    backgroundColor: "rgba(28, 28, 28, 0.5)",
  },
  textcontent:{
    color: Colors.white,
    fontSize: 25,
    fontWeight:"bold",
    textAlign:"center",
    letterSpacing:1.4,
    lineHeight:35,
  },
  description:{
    color: Colors.white,
    fontSize: 15,
    fontWeight:"500",
    textAlign:"center",
    letterSpacing:1.2,
    lineHeight:20,
    
  },
  startBtn:{
    backgroundColor:Colors.tint,
    paddingVertical:16,
    marginVertical:20,
    alignItems:"center",
    borderRadius:10,
  },
  btnText:{
    
    color:Colors.white,
    fontSize:17,
    fontWeight:"bold",
  }
});
