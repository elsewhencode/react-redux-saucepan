// @flow
import React, { type Element } from 'react';

type Props = {
  onClick: () => mixed,
};

const Button = ({ onClick }: Props): Element<any> => (
  <button onClick={onClick}>fetch</button>
);

export default Button;
