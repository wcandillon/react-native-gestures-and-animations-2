import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Routes } from "./src/Routes";
import Examples from "./src/Examples";
import PanGesture from "./src/PanGesture";
import Transitions from "./src/Transitions";
import CircularSlider from "./src/CircularSlider";
import Graph from "./src/Graph";
import Worklets from "./src/Worklets";
import DragToSort from "./src/DragToSort";
import DynamicSpring from "./src/DynamicSpring";
import Animations from "./src/Animations";
import Accordion from "./src/Accordion";
import Swipping from "./src/Swipping";
import { LoadAssets } from "./src/components";

const Stack = createStackNavigator<Routes>();
const AppNavigator = () => (
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
    <Stack.Screen
      name="Swipping"
      component={Swipping}
      options={{
        title: "Swipping",
      }}
    />
  </Stack.Navigator>
);

const App = () => (
  <LoadAssets>
    <AppNavigator />
  </LoadAssets>
);

export default App;
