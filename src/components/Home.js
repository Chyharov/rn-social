import React from "react";
import { StyleSheet, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const MainTab = createBottomTabNavigator();

import ProfileScreen from "../screens/mainScreen/ProfileScreen";
import PostsScreen from "../screens/mainScreen/PostsScreen";
import CreatePostsScreen from "../screens/mainScreen/CreatePostsScreen";

import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function useHome({ navigation }) {
  return (
    <MainTab.Navigator tabBarOptions={{ showLabel: false }}>
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name="grid-outline"
              style={{ marginLeft: 70 }}
              size={24}
              color="rgba(33, 33, 33, 0.8)"
            />
          ),
          title: "Публикации",
          headerTitleAlign: "center",
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            color: "#212121",
          },
          headerRight: () => (
            <MaterialIcons
              name="logout"
              size={24}
              color="#BDBDBD"
              style={{ marginRight: 10 }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            />
          ),
        }}
      />

      <MainTab.Screen
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused, size, color }) => (
            <View style={styles.iconCreatePostsScreen}>
              <Ionicons name="add" size={24} color="#fff" />
            </View>
          ),
          headerShown: false,
        }}
        name="Create"
        component={CreatePostsScreen}
      />

      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather
              name="user"
              style={{ marginRight: 70 }}
              size={24}
              color="rgba(33, 33, 33, 0.8)"
            />
          ),
          headerShown: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconCreatePostsScreen: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
  },
});
