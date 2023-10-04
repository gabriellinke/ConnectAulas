import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
export default () => {
  return (
    <Tabs screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen
        name="feed"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
          title: "Feed",
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="envelope" size={24} color={color} />
          ),
          title: "Inbox",
        }}
      />
    </Tabs>
  );
  // return <Tabs/>
};
