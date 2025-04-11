import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useContext, useState } from 'react'

export const myContext = createContext(require("@/assets/images/profile.jpg"))

type Props = {
    children: React.ReactNode
}

export const AppProvider = ({children}: Props) => {
    const [imageUri, setImageUri]=useState<{ uri: string } | null>(null);
  return (
    <myContext.Provider value={{imageUri, setImageUri}}>
        {children}
    </myContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(myContext)
  }

const styles = StyleSheet.create({})