import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Routes } from "./Routes";
import Examples from "./Examples";
import PanGesture from "./PanGesture";
import Transitions from "./Transitions";
import CircularSlider from "./CircularSlider";
import Graph from "./Graph";
import Worklets from "./Worklets";
import DragToSort from "./DragToSort";
import DynamicSpring from "./DynamicSpring";
import Animations from "./Animations";
import Accordion from "./Accordion";

const Stack = createStackNavigator<Routes>();
const AppNavigator = () => (
  <>
    <Stack.Navigator>
      <Stack.Screen
        name="Examples"
        component={Examples}
        options={{
          title: "Learn Reanimated 2",
        }}
      />
      <Stack.Screen
        name="Worklets"
        component={Worklets}
        options={{
          title: "Worklets",
        }}
      />
      <Stack.Screen
        name="Animations"
        component={Animations}
        options={{
          title: "Animations",
        }}
      />
      <Stack.Screen
        name="PanGesture"
        component={PanGesture}
        options={{
          title: "PanGesture",
        }}
      />
      <Stack.Screen
        name="Transitions"
        component={Transitions}
        options={{
          title: "Transitions",
        }}
      />
      <Stack.Screen
        name="CircularSlider"
        component={CircularSlider}
        options={{
          title: "Circular Slider",
        }}
      />
      <Stack.Screen
        name="Graph"
        component={Graph}
        options={{
          title: "Graph",
        }}
      />
      <Stack.Screen
        name="DynamicSpring"
        component={DynamicSpring}
        options={{
          title: "Dynamic Spring",
        }}
      />
      <Stack.Screen
        name="DragToSort"
        component={DragToSort}
        options={{
          title: "Drag to Sort",
        }}
      />
      <Stack.Screen
        name="Accordion"
        component={Accordion}
        options={{
          title: "Accordion",
        }}
      />
    </Stack.Navigator>
  </>
);

const App = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);

export default App;
