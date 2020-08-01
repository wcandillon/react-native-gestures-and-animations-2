import Animated, {
  useSharedValue,
  withDecay as withDecayScalar,
  withSpring as withSpringScalar,
} from "react-native-reanimated";

export type VectorValue = Vector<Animated.SharedValue<number>>;

export interface Vector<T = number> {
  x: T;
  y: T;
}

export const useVector = (x1 = 0, y1?: number): VectorValue => {
  const x = useSharedValue(x1);
  const y = useSharedValue(y1 ?? x1);
  return { x, y };
};

const set = (variable: VectorValue, value: Vector) => {
  "worklet";
  variable.x.value = value.x;
  variable.y.value = value.y;
};

const add = (v1: Vector, v2: Vector) => {
  "worklet";
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y,
  };
};

const sub = (v1: Vector, v2: Vector) => {
  "worklet";
  return {
    x: v1.x - v2.x,
    y: v1.y - v2.y,
  };
};

const mul = (v1: Vector, v2: Vector) => {
  "worklet";
  return {
    x: v1.x * v2.x,
    y: v1.y * v2.y,
  };
};

const div = (v1: Vector, v2: Vector) => {
  "worklet";
  return {
    x: v1.x / v2.x,
    y: v1.y / v2.y,
  };
};

const min = (v1: Vector, v2: Vector) => {
  "worklet";
  return {
    x: Math.min(v1.x, v2.x),
    y: Math.min(v1.y, v2.y),
  };
};

const max = (v1: Vector, v2: Vector) => {
  "worklet";
  return {
    x: Math.max(v1.x, v2.x),
    y: Math.max(v1.y, v2.y),
  };
};

const clamp = (v1: Vector, lowerBound: Vector, upperBound: Vector) => {
  "worklet";
  return max(min(v1, upperBound), lowerBound);
};

const value = (vector: VectorValue): Vector => {
  "worklet";
  return {
    x: vector.x.value,
    y: vector.y.value,
  };
};

const withDecay = (
  v: VectorValue,
  velocity: Vector,
  lowerBound: Vector,
  upperBound: Vector
) => {
  "worklet";
  v.x.value = withDecayScalar({
    velocity: velocity.x,
    clamp: [lowerBound.x, upperBound.x],
  });
  v.y.value = withDecayScalar({
    velocity: velocity.y,
    clamp: [lowerBound.y, upperBound.y],
  });
};

const withSpring = (v: VectorValue, target: Vector) => {
  "worklet";
  v.x.value = withSpringScalar(target.x);
  v.y.value = withSpringScalar(target.y);
};

export const vec = {
  value,
  set,
  min,
  max,
  clamp,
  add,
  sub,
  mul,
  div,
  withDecay,
  withSpring,
};
