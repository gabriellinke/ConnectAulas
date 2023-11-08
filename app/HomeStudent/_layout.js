import { Tabs, Stack } from "expo-router";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Colors from '../../src/styles/colors'

export default () => {
  return (
    <>
      <Stack.Screen options={{headerShown: false}}/>
      <Tabs screenOptions={{
        tabBarShowLabel: true, 
        tabBarActiveTintColor: Colors.PURPLE}}
      >
      <Tabs.Screen
        name="Teachers/index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "book" : "book-outline"} size={24} color={color} />
          ),
          tabBarLabel: "professores",
        }}
      />
      <Tabs.Screen
        name="Favorites/index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name={focused ? "heart" : "heart-o"} size={24} color={color} />
          ),
          tabBarLabel: "favoritos",
        }}
      />
      <Tabs.Screen
        name="Communities/index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? "account-group" : "account-group-outline"} size={24} color={color} />
          ),
          tabBarLabel: "comunidades",
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="styles"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
    </Tabs>
  </>
  );
};
