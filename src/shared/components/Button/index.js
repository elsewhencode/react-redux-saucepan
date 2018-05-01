// @flow
import * as React from 'react';

type Props = {
  onClick: () => mixed,
};

const Button = ({ onClick }: Props): React.Element<any> => (
  <button onClick={onClick}>fetch</button>
);

export default Button;
