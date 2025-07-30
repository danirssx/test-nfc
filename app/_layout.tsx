import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import SessionsScreen from "./sessions";
import AddSessionScreen from "./add-session";

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#8E8E93",
          headerStyle: {
            backgroundColor: "#F8F9FA",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Tab.Screen
          name="Sessions"
          component={SessionsScreen}
          options={{
            title: "NFC Sessions",
            tabBarLabel: "Sessions",
          }}
        />
        {/* <Tab.Screen
          name="AddSession"
          component={AddSessionScreen}
          options={{
            title: 'Add Session',
            tabBarLabel: 'Add',
          }}
        /> */}
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
