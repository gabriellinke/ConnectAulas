import { Tabs } from "expo-router";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Colors from '../../src/styles/colors'

export default () => {
  return (
    <Tabs screenOptions={{
        tabBarShowLabel: true, 
        headerShown: false,
        tabBarActiveTintColor: Colors.PURPLE,
      }}
    >
      <Tabs.Screen
        name="teachers"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "book" : "book-outline"} size={24} color={color} />
          ),
          tabBarLabel: "professores",
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name={focused ? "heart" : "heart-o"} size={24} color={color} />
          ),
          tabBarLabel: "favoritos",
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? "account-group" : "account-group-outline"} size={24} color={color} />
          ),
          tabBarLabel: "comunidades",
        }}
      />
    </Tabs>
  );
  // return <Tabs/>
};
