import { Tabs, Stack } from "expo-router";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
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
          name="Quiz/index"
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="question" size={24} color={color} />
            ),
          tabBarLabel: "quiz",
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
  // return <Tabs/>
};
