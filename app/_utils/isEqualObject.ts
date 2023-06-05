import equal from "fast-deep-equal/es6/react";

export const isEqualObject = (a: object, b: object) => {
  return equal(a, b);
};
