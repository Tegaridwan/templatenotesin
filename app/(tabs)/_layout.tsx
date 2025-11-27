import { Ionicons } from '@expo/vector-icons';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { initDB } from '../../services/db';


function CustomDrawerContent(props: DrawerContentComponentProps) {
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{paddingBottom: 20, paddingTop: 25, paddingHorizontal: 25}}>
                <Text className='text-3xl font-bold text-purple-950'>
                    Notesin
                </Text>
            </View>
            <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
        </SafeAreaView>
    )
}


const _layout = () => {
    useEffect(() => {
        initDB()
    }, []);

    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props}/>}
            screenOptions={{
                drawerActiveTintColor: '#4B0082',
                drawerInactiveTintColor: 'black',
                headerShadowVisible: false,
            }}
        >
            <Drawer.Screen
                name="index"
                options={{
                     drawerLabel: 'Catatan',
                     headerTitle: 'Notesin', headerTintColor: '#4B0082' ,headerTitleStyle: { fontWeight: 'bold', fontSize: 24,},
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name='reader-outline' size={size} color={color} />
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable onPress={() => {}}>
                                <Ionicons name='moon-outline' size={29} style={{marginRight:15}}/>
                            </Pressable>
                            <Pressable onPress={() => router.push('/(tabs)/arsip')}>
                                <Ionicons name='person-circle-outline' size={33} style={{marginRight:15}}/>
                            </Pressable>
                        </View>
                    )
                }}
            />
            <Drawer.Screen
                name="arsip"
                options={{
                     drawerLabel: 'Arsip',
                     headerTitle: 'Arsip',
                      drawerIcon: ({ color, size }) => (
                        <Ionicons name='archive-outline' size={size} color={color} />
                    )
                }}
            />
            <Drawer.Screen
                name="sampah"
                options={{
                     drawerLabel: 'Sampah',
                     headerTitle: 'Sampah',
                     drawerIcon: ({ color, size }) => (
                        <Ionicons name='trash-outline' size={size} color={color} />
                    ),
                    headerRight: () => (
                        <Pressable onPress={() => {}}>
                            <Ionicons name='ellipsis-vertical' size={24} style={{marginRight:15}}/>
                        </Pressable>
                    )
                }}
            />
            <Drawer.Screen
                name="setelan"
                options={{
                     drawerLabel: 'Setelan',
                     headerTitle: '',
                     drawerIcon: ({ color, size }) => (
                        <Ionicons name='settings-outline' size={size} color={color} />
                    )
                }}
            />
            <Drawer.Screen
                name='masukan'
                options={{
                    drawerLabel: 'Bantuan & Masukan',
                    headerTitle: '',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name='help-circle-outline' size={size} color={color}/>
                    )
                }}
            />
            {/* <Drawer.Screen
                name="movies/[id]"
                options={{ headerShown: false }}
            /> */}
        </Drawer>
    )
}

export default _layout