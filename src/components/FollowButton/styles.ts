import styled from 'styled-components';
import { Button } from '../ui/Button';

export const StyledButton = styled(Button)<{ isFollowing: boolean }>`
  min-width: 100px;
`;
