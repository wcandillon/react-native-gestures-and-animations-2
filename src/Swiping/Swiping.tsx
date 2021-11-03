import * as React from "react";

import type { ProfileModel } from "./Profile";
import { Profiles } from "./Profiles";

export const profiles: ProfileModel[] = [
  {
    id: "1",
    name: "Caroline",
    age: 24,
    profile: require("./assets/1.jpg"),
  },
  {
    id: "2",
    name: "Jack",
    age: 30,
    profile: require("./assets/2.jpg"),
  },
  {
    id: "3",
    name: "Anet",
    age: 21,
    profile: require("./assets/3.jpg"),
  },
  {
    id: "4",
    name: "John",
    age: 28,
    profile: require("./assets/4.jpg"),
  },
];

export const Swiping = () => {
  return <Profiles {...{ profiles }} />;
};
