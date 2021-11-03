import { createStackNavigator } from "@react-navigation/stack";

import type { Routes } from "./src/Routes";
import { Examples } from "./src/Examples";
import { HeartOfTheMatter } from "./src/HeartOfTheMatter";
import { PanGesture } from "./src/PanGesture";
import { Transitions } from "./src/Transitions";
import { CircularSlider } from "./src/CircularSlider";
import { Graph } from "./src/Graph";
import { Worklets } from "./src/Worklets";
import { DragToSort } from "./src/DragToSort";
import { DynamicSpring } from "./src/DynamicSpring";
import { Animations } from "./src/Animations";
import { Swiping, swipingAssets } from "./src/Swiping";
import { Bezier } from "./src/Bezier";
import { ShapeMorphing } from "./src/ShapeMorphing";
import { Accordion } from "./src/Accordion";
import { LoadAssets } from "./src/components";

const assets = [...swipingAssets];
const Stack = createStackNavigator<Routes>();
const App = () => (
  <LoadAssets assets={assets}>
    <Stack.Navigator>
      <Stack.Screen
        name="Examples"
        component={Examples}
        options={{
          title: "Learn Reanimated 2",
        }}
      />
      <Stack.Screen
        name="TheHeartOfTheMatter"
        component={HeartOfTheMatter}
        options={{
          title: "The Heart of the Matter",
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
        name="Swiping"
        component={Swiping}
        options={{
          title: "Swiping",
        }}
      />
      <Stack.Screen
        name="Bezier"
        component={Bezier}
        options={{
          title: "Bézier",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="ShapeMorphing"
        component={ShapeMorphing}
        options={{
          title: "Shape Morphing",
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
  </LoadAssets>
);

// eslint-disable-next-line import/no-default-export
export default App;
