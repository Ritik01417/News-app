import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import FontAwesome from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useAppContext } from './context/AppContext'; // Ensure this is correctly typed


type Props = {}
                                                                                                                                                                                                                
const Page = (props: Props) => {
  const { imageUri, setImageUri } = useAppContext(); // Ensure useAppContext is properly typed and provides these properties
  
  const [modalVisible, setModalVisible]=useState(false)
   
 
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri({ uri: result.assets[0].uri });
    }
  };


  return (
    <View style={styles.container} >
      <View style={styles.profile}>
      <TouchableOpacity onPress={()=>setModalVisible(true)}>
        <Image source={imageUri}
        style={{height:100,width:100,borderRadius:50,marginTop:80}} />
        <Text style={styles.userName}>Ritik kamwal</Text>
      </TouchableOpacity>
      
      </View>
 {/* change profile photo  */}
      <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={()=>setModalVisible(false)}
       >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity ><Text style={styles.detailSectionText}>View photo</Text></TouchableOpacity>
            <TouchableOpacity onPress={pickImage}><Text style={styles.detailSectionText}>Change photo</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}><Text style={styles.detailSectionText}>Close</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Content section  */}
      <View style={styles.detailSection}>
        <TouchableOpacity style={styles.touchaleOpacity}>
        <FontAwesome5 name="user-alt" size={24} color={Colors.tint} />
          <Text style={styles.detailSectionText}>Profile</Text>
          <MaterialIcons name="arrow-right" size={34} color={Colors.tint} />
        </TouchableOpacity>
          
        <TouchableOpacity style={styles.touchaleOpacity}>
        <MaterialIcons name="notifications" size={24} color={Colors.tint} />
        <Text style={styles.detailSectionText}>Notification</Text>
        <MaterialIcons name="arrow-right" size={34} color={Colors.tint} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchaleOpacity}>
        <Entypo name="share" size={24} color={Colors.tint} />
        <Text style={styles.detailSectionText}>Share with Friends</Text>
        <MaterialIcons name="arrow-right" size={34} color={Colors.tint} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchaleOpacity}>
        <Ionicons name="settings" size={24} color={Colors.tint} />
          <Text style={styles.detailSectionText}>Settings</Text>
        <MaterialIcons name="arrow-right" size={34} color={Colors.tint} />
        </TouchableOpacity>
      </View>

      {/* Log out button  */}
      <View style={styles.logButtonSection}>
        <TouchableOpacity style={styles.logOut}>
          <View></View>
          <Text style={styles.logOutText}>Log out</Text>
        <FontAwesome name="arrow-right-from-bracket" size={24} color="white" /></TouchableOpacity>
        

        </View>
      
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  profile:{
    alignItems: "center",
  },
  userName:{
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color:Colors.tint
  },
  detailSection:{
    margin:20,
    paddingBottom: 20,
    gap: 20,
    borderRadius:10
  },
  touchaleOpacity:{
    flexDirection: "row",
    backgroundColor:Colors.white,
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailSectionText:{
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color:Colors.black
  },
  logOut:{
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    color:Colors.white,
    backgroundColor:Colors.tint,
    flexDirection: "row",
    justifyContent:"space-between"  
  },
  logButtonSection:{
    bottom: 0,
    margin: 20,
    position: "absolute",
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",  
  },
  logOutText:{
    fontSize: 20,
    fontWeight: "bold",
    color:Colors.white,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 80,
    borderRadius: 10,
    alignItems: 'center',
    gap: 20,    
  },
})