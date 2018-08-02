// @flow
import * as React from 'react';

import styled from 'styled-components';

const StyledButton = styled.button`
  appearance: none;
  color: red;
  padding: 1.5rem;
  font-size: 1rem;
  line-height: 1rem;
  display: inline-flex;
`;

type Props = {
  onClick: () => mixed,
};

const Button = ({ onClick }: Props): React.Element<any> => (
  <StyledButton type="button" onClick={onClick}>
    fetch new
  </StyledButton>
);

export default Button;
