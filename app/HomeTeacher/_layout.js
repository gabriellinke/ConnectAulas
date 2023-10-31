import { Tabs } from "expo-router";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
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
        name="quiz"
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="question" size={24} color={color} />
          ),
          title: "quiz",
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
      <Tabs.Screen
        // Name of the route to hide.
        name="styles"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        name="Quiz/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="Communities/index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
  // return <Tabs/>
};
