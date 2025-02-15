import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {}

const Header = (props: Props) => {
  return (
    <View style={styles.container}>
        <View style={styles.info}>
        <Image
      style={styles.profileImg} 
      source={require("@/assets/images/profile.jpg")} 
      />
      <View style={{gap:5}}>
        <Text style={styles.greet}>Hi, User</Text>
        <Text style={styles.name}>User Name</Text>
      </View>

        </View>
      
      
      <TouchableOpacity>
      <Ionicons name="notifications-outline" 
      size={24} color={Colors.black} 
      />
      </TouchableOpacity>
        
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    profileImg:{
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    info:{
        flexDirection: "row",
        alignItems:"center",
        gap:10,
    },
    greet:{
        fontSize: 12,
        color: Colors.darkGrey,
    },
    name:{
        fontSize: 15,
        color: Colors.black,
        fontWeight: "bold",
    }
})