import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { FadeInDown, FadeInLeft, FadeInUp } from 'react-native-reanimated';
import { router } from 'expo-router';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

type Props = {}

const Signup = (props: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState<{ email: string }[]>([])



  useEffect(()=>{
    // checkUser();
    fetchData()
  },[userData])

  // Get data from server 

  const fetchData =async()=>{
    const URL = "http://192.168.6.16:27017/users";
    
    const response = await fetch(URL)
      const data = await response.json();
      response.ok && (
        setUserData(data)
        // console.log("Data from server: ",data)
      )
  }


// send data to backend
const handleSignup = async()=>{
  console.log("handle signup", userData)
  if(!name || !email || !password){
    Alert.alert("Please fill all the fields")
    return;
  }
  if(!email.includes('@')){
    Alert.alert("Please enter a valid email")
    return;
  }
  if(password.length<6){
    Alert.alert("Password must be at least 6 characters")
    return;
  }
  if(!name.match(/^[a-zA-Z ]+$/)){
    Alert.alert("Please enter a valid name")
    return;
  }
  if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)){
    Alert.alert("Password must contain at least one uppercase letter, one lowercase letter, and one number")
    return;
  }
  if(!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
    Alert.alert("Please enter a valid email")
    return;
  }


  // check if user already exists
    const userExist = userData&&
    userData.some((item)=>{
      return item.email === email
      
    })

    if(userExist){
      Alert.alert("User already exists")
      return;
    }
    
    try {
      console.log("flow in try block now")
    const response = await fetch('http://192.168.6.16:27017/users',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        name:name,
        email:email,
        password:password

      })
    } )
    const data = await response.json();
   
    response.ok ? ( 
      Alert.alert("Data posted successfully")):  Alert.alert("Request unsuccessful",data.message);;
    
  } catch (error) {
    console.log("Error: ",error)
    
  }

}

  return (
    <View style={styles.container}>
      <Animated.Text entering={FadeInLeft.duration(800)} style={styles.title}>Sign Up</Animated.Text>

      <Animated.View  entering={FadeInDown.duration(800)} style={styles.inputContainer}>
        <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={(text)=>setName(text)} />
      </Animated.View>

      <Animated.View  entering={FadeInDown.duration(800)} style={styles.inputContainer}>
        <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={(text)=>setEmail(text)} keyboardType="email-address" />
      </Animated.View>

      <Animated.View  entering={FadeInDown.duration(800)} style={styles.inputContainer}>
        <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={(text)=>setPassword(text)} secureTextEntry />
      </Animated.View>

      <Animated.View  entering={FadeInDown.duration(800)} >
        <Button title="Sign Up" onPress={()=>{
          handleSignup();
          // checkUser();
          // router.push('/(auth)/login')
        }} />
      </Animated.View>

      <TouchableOpacity onPress={() => router.push('/(auth)/')} style={styles.linkContainer}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold',marginBottom:50, textAlign: 'center' },
  inputContainer: { marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 },
  linkContainer: { marginTop: 20, alignItems: 'center' },
  link: { color: 'blue' },
})