import { Stack } from "expo-router"

const Layout = ()=>{
    return (
        <Stack screenOptions={{headerShown:false,
            title:"",
        }}>
            <Stack.Screen name="index" options={{headerShown:false}}/>
            {/* <Stack.Screen name="login" options={{headerShown:false}}/> */}
            <Stack.Screen name="signup" options={{headerShown:false}}/>
        </Stack>
    )
}

export default Layout