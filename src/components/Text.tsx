import type { ReactNode } from "react";
import React from "react";
import type { TextProps as OriginalTextProps } from "react-native";
import { Text as RNText } from "react-native";

import { StyleGuide } from "./StyleGuide";

export interface TextProps extends OriginalTextProps {
  dark?: boolean;
  type?: keyof typeof StyleGuide["typography"];
  children: ReactNode;
}

export const Text = ({ dark, type, style, children }: TextProps) => {
  const color = dark ? "white" : "black";
  return (
    <RNText style={[StyleGuide.typography[type || "body"], { color }, style]}>
      {children}
    </RNText>
  );
};
