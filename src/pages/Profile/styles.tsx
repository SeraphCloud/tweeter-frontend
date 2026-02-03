import type React from 'react';
import styled from 'styled-components';
import { Card } from '../../components/ui/Card';

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.space[4]};
  z-index: 10;
  backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.space[2]};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radii.full};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundHover};
  }

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
`;

export const HeaderPosts = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ProfileHeader = styled.div`
  padding: ${({ theme }) => theme.space[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const AvatarSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

export const AvatarWrapper = styled.div`
  margin-top: -${({ theme }) => theme.space[8]};
`;

export const AvatarImage = styled.div`
  border: 4px solid ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.full};
  overflow: hidden;
`;

export const ProfileInfo = styled.div`
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

export const DisplayName = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.space[1]} 0;
`;

export const Username = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Stats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[6]};
  margin-top: ${({ theme }) => theme.space[4]};
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[1]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text};
`;

export const StatValue = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const StatLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Tab = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.space[4]};
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ $active, theme }) =>
    $active ? theme.fontWeights.bold : theme.fontWeights.medium};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.textSecondary};
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.backgroundHover};
  }

  ${({ $active, theme }) =>
    $active &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background-color: ${theme.colors.primary};
      border-radius: ${theme.radii.full};
    }
  `}
`;

export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.space[8]};
`;

export const ErrorMessage = styled.div`
  padding: ${({ theme }) => theme.space[4]};
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
`;

export const NotFoundMessage = styled.div`
  padding: ${({ theme }) => theme.space[8]};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const EmptyState = styled.div`
  padding: ${({ theme }) => theme.space[8]};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Edit Profile Styles
export const EditContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.space[4]};
`;

export const EditHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

export const EditTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const EditCard = styled(Card)`
  max-width: 600px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space[6]};
`;

export const AvatarEditSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

export const AvatarWrapperEditable = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.space[3]};
  cursor: pointer;
`;

export const AvatarOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: ${({ theme }) => theme.radii.full};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  svg {
    width: 32px;
    height: 32px;
    color: white;
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const ChangeAvatarText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const SuccessMessage = styled.div`
  padding: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.successLight};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

export const FileInfo = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.space[1]};
`;

// Icons
export const BackIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export const CameraIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);
