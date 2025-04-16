import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated';
import { router } from 'expo-router';
import { UserType } from '@/types/userType';

type Props = {}

const Login = (props: Props) => {
    // const [name, setName] = useState('');
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState<UserType[]>([])


useEffect(()=>{
  fetchData()
},[userData])
  const fetchData =async()=>{
    const URL = "http://192.168.6.16:27017/users";
    
    const response = await fetch(URL)
      const data = await response.json();
      response.ok && (
        setUserData(data)
        // router.push('/(tabs)')
        // console.log("Data from server: ",data)
      )
  }


  const handleLogin = ()=>{
    if(!email || !password){
      Alert.alert("Please fill all the fields")
      return;
    }

       userData&&userData.some((user)=>{
      if(user.email===email && user.password===password){
        Alert.alert("Login successfull")
        router.push('/(tabs)')
      }else{
        Alert.alert("Invalid credentials")
      }
    })
  }
   
  return (
    <View style={styles.container}>
      <Animated.Text entering={FadeInDown.duration(800)} style={styles.title}>Login</Animated.Text>

      <Animated.View entering={FadeInDown.duration(800)} style={styles.inputContainer}>
        <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(800)} style={styles.inputContainer}>
        <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(800)}>
        <Button title="Login" onPress={handleLogin} />
      </Animated.View>

      <TouchableOpacity onPress={() => router.push('/signup')} style={styles.linkContainer}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' },
  inputContainer: { marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 },
  linkContainer: { marginTop: 20, alignItems: 'center' },
  link: { color: 'blue' },
})