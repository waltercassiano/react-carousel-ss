import { compose, withState, withHandlers, withProps } from "recompose";

export default compose(
  withProps("item", "setCounter", 0),
);
