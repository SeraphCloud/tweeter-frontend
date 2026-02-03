import { useState, useEffect, useCallback, useMemo, useRef, type FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostCard } from '../../components/Post/PostCard';
import { FollowButton } from '../../components/FollowButton/FollowButton';
import { Loader } from '../../components/ui/Loader';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { USE_MOCKS } from '../../utils/env';
import { getErrorMessage } from '../../utils/errorHandling';
import type { Profile } from '../../mocks/mockProfiles';
import {
  useGetProfileQuery,
  useGetMyProfileQuery,
  useGetFollowersQuery,
  useGetFollowingQuery,
  useFollowProfileMutation,
  useUnfollowProfileMutation,
  useUpdateMyProfileMutation,
} from '../../features/profiles/profilesApi';
import { useGetFeedQuery } from '../../features/posts/postsApi';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { mockDelay } from '../../mocks';
import { updateProfile, followProfile, unfollowProfile } from '../../features/mocks/mocksSlice';
import {
  Container,
  Header,
  BackButton,
  HeaderInfo,
  HeaderName,
  HeaderPosts,
  ProfileHeader,
  AvatarSection,
  AvatarWrapper,
  AvatarImage,
  ProfileInfo,
  DisplayName,
  Username,
  Stats,
  StatItem,
  StatValue,
  StatLabel,
  Tabs,
  Tab,
  PostsContainer,
  LoadingContainer,
  ErrorMessage,
  NotFoundMessage,
  EmptyState,
  EditContainer,
  EditHeader,
  EditTitle,
  EditCard,
  AvatarEditSection,
  AvatarWrapperEditable,
  AvatarOverlay,
  HiddenFileInput,
  ChangeAvatarText,
  Form,
  FormGroup,
  Label,
  SuccessMessage,
  FileInfo,
  BackIcon,
  CameraIcon,
} from './styles';

// Mock current user ID (simulating logged in user)
const MOCK_CURRENT_USER_ID = 1;

// Helper to get profile by id from Redux state
function getProfileById(id: number, profiles: Profile[]): Profile | undefined {
  return profiles.find((p) => p.id === id);
}

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Determine if this is "my profile" edit mode (route /me) or public profile (route /profile/:id)
  const isMyProfileMode = id === undefined;
  const profileId = isMyProfileMode ? MOCK_CURRENT_USER_ID : Number(id);

  // Redux state for mock mode
  const mockProfiles = useAppSelector((state) => state.mocks.profiles);
  const mockPosts = useAppSelector((state) => state.mocks.posts);

  // State for mock mode
  const [mockLoading, setMockLoading] = useState(USE_MOCKS);
  const [mockFollowLoading, setMockFollowLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'followers' | 'following'>('posts');

  // Edit form state (only used in /me mode)
  const [displayName, setDisplayName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [mockSaving, setMockSaving] = useState(false);
  
  // Password state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  // RTK Query hooks (used when USE_MOCKS=false)
  const {
    data: apiProfile,
    isLoading: apiProfileLoading,
    error: apiProfileError,
  } = useGetProfileQuery(profileId, {
    skip: USE_MOCKS || !profileId,
  });

  const {
    data: apiMyProfile,
    isLoading: apiMyProfileLoading,
  } = useGetMyProfileQuery(undefined, {
    skip: USE_MOCKS || !isMyProfileMode,
  });

  const { data: apiPosts } = useGetFeedQuery(undefined, {
    skip: USE_MOCKS,
  });

  const { data: apiFollowers } = useGetFollowersQuery(profileId, {
    skip: USE_MOCKS || !profileId,
  });

  const { data: apiFollowing } = useGetFollowingQuery(profileId, {
    skip: USE_MOCKS || !profileId,
  });

  const [followProfileApi] = useFollowProfileMutation();
  const [unfollowProfileApi] = useUnfollowProfileMutation();
  const [updateProfileApi, { isLoading: apiSaving }] = useUpdateMyProfileMutation();

  // Load mock data on mount
  useEffect(() => {
    if (!USE_MOCKS) return;

    let cancelled = false;

    const loadData = async () => {
      await mockDelay();
      if (!cancelled) {
        const profile = getProfileById(profileId, mockProfiles);
        setDisplayName(profile?.display_name ?? '');
        setMockLoading(false);
      }
    };

    void loadData();

    return () => {
      cancelled = true;
    };
  }, [profileId, mockProfiles]);

  // Initialize display name from API profile when loading completes
  useEffect(() => {
    if (!USE_MOCKS && !apiMyProfileLoading && apiMyProfile) {
      // Use requestAnimationFrame to avoid cascading renders warning
      requestAnimationFrame(() => {
        setDisplayName(apiMyProfile.display_name);
      });
    }
  }, [apiMyProfileLoading, apiMyProfile]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          setFormError('Por favor, selecione uma imagem válida.');
          return;
        }
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          setFormError('A imagem deve ter no máximo 5MB.');
          return;
        }
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setFormError(null);
        setSuccessMessage(null);
      }
    },
    []
  );

  const handleAvatarClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setSuccessMessage(null);
      setFormError(null);

      // Validation
      if (!displayName.trim()) {
        setFormError('O nome de exibição é obrigatório.');
        return;
      }

      if (displayName.length > 50) {
        setFormError('O nome de exibição deve ter no máximo 50 caracteres.');
        return;
      }

      // Password validation (se algum campo foi preenchido)
      if (currentPass || newPass || confirmPass) {
        if (!currentPass) {
          setFormError('A senha atual é obrigatória.');
          return;
        }
        if (!newPass) {
          setFormError('A nova senha é obrigatória.');
          return;
        }
        if (!confirmPass) {
          setFormError('Confirmar a nova senha é obrigatória.');
          return;
        }
        if (newPass.length < 8) {
          setFormError('A nova senha deve ter no mínimo 8 caracteres.');
          return;
        }
        if (newPass !== confirmPass) {
          setFormError('As senhas não conferem.');
          return;
        }
      }

      if (USE_MOCKS) {
        setMockSaving(true);
        await mockDelay();

        const currentUser = getProfileById(MOCK_CURRENT_USER_ID, mockProfiles);
        if (!currentUser) {
          setFormError('Usuário não encontrado.');
          setMockSaving(false);
          return;
        }

        // Simulate avatar upload
        let avatarUrl = currentUser.avatar;
        if (selectedFile && previewUrl) {
          // In a real scenario, this would be a URL from server
          avatarUrl = previewUrl;
        }

        dispatch(
          updateProfile({
            ...currentUser,
            display_name: displayName.trim(),
            avatar: avatarUrl,
          })
        );
setMockSaving(false);
setSuccessMessage('Perfil atualizado com sucesso!');
setSelectedFile(null);
setPreviewUrl(null);
setCurrentPass('');
setNewPass('');
setConfirmPass('');
} else {
try {
  const formData: {
    display_name?: string;
    avatar?: File;
    current_password?: string;
    new_password?: string;
  } = {
    display_name: displayName.trim(),
  };

  if (selectedFile) {
    formData.avatar = selectedFile;
  }

  if (currentPass && newPass) {
    formData.current_password = currentPass;
    formData.new_password = newPass;
  }

  await updateProfileApi(formData).unwrap();
  setSuccessMessage('Perfil atualizado com sucesso!');
  setSelectedFile(null);
  setPreviewUrl(null);
  setCurrentPass('');
  setNewPass('');
  setConfirmPass('');
} catch (err) {
  const error = err as { data?: unknown; message?: string };
  setFormError(getErrorMessage(error));
}
}
},
[displayName, selectedFile, previewUrl, updateProfileApi, mockProfiles, dispatch, currentPass, setCurrentPass, newPass, setNewPass, confirmPass, setConfirmPass]
);

  // Determine if current user is following this profile
  const isFollowing = useMemo(() => {
    if (USE_MOCKS) {
      const currentUser = getProfileById(MOCK_CURRENT_USER_ID, mockProfiles);
      return currentUser?.following_ids.includes(profileId) ?? false;
    }
    // In API mode, this would come from profile data
    return apiProfile?.following_ids.includes(MOCK_CURRENT_USER_ID) ?? false;
  }, [apiProfile, profileId, mockProfiles]);

  const isOwnProfile = profileId === MOCK_CURRENT_USER_ID;

  const handleFollowToggle = useCallback(async () => {
    if (!profileId || isOwnProfile) return;

    if (USE_MOCKS) {
      setMockFollowLoading(true);
      await mockDelay();

      if (isFollowing) {
        dispatch(unfollowProfile({ userId: MOCK_CURRENT_USER_ID, targetId: profileId }));
      } else {
        dispatch(followProfile({ userId: MOCK_CURRENT_USER_ID, targetId: profileId }));
      }

      setMockFollowLoading(false);
    } else {
      try {
        if (isFollowing) {
          await unfollowProfileApi(profileId).unwrap();
        } else {
          await followProfileApi(profileId).unwrap();
        }
      } catch (error) {
        console.error('Failed to toggle follow:', error);
      }
    }
  }, [profileId, isFollowing, isOwnProfile, followProfileApi, unfollowProfileApi, dispatch]);

  const handleBack = () => {
    navigate(-1);
  };

  // Calculate followers/following counts
  const followersCount = useMemo(() => {
    if (USE_MOCKS) {
      return mockProfiles.filter((p) => p.following_ids.includes(profileId)).length;
    }
    return apiFollowers?.length ?? 0;
  }, [apiFollowers, profileId, mockProfiles]);

  const followingCount = useMemo(() => {
    if (USE_MOCKS) {
      const profile = getProfileById(profileId, mockProfiles);
      return profile?.following_ids.length ?? 0;
    }
    return apiFollowing?.length ?? 0;
  }, [apiFollowing, profileId, mockProfiles]);

  // Determine which data to use
  const mockProfile = USE_MOCKS ? getProfileById(profileId, mockProfiles) ?? null : null;
  const profile = USE_MOCKS ? mockProfile : (isMyProfileMode ? apiMyProfile : apiProfile) ?? null;
  const mockProfilePosts = USE_MOCKS ? mockPosts.filter((p) => p.author === profileId) : [];
  const posts = USE_MOCKS ? mockProfilePosts : apiPosts?.filter((p) => p.author === profileId) ?? [];
  const isLoading = USE_MOCKS
    ? mockLoading
    : isMyProfileMode
      ? apiMyProfileLoading
      : apiProfileLoading;
  const error = USE_MOCKS ? null : (isMyProfileMode ? null : apiProfileError);
  const isSaving = USE_MOCKS ? mockSaving : apiSaving;

  // Avatar URL to display in edit mode
  const avatarUrl = previewUrl || profile?.avatar;

  // RENDER: My Profile Edit Mode (/me)
  if (isMyProfileMode) {
    if (isLoading) {
      return (
        <EditContainer>
          <EditHeader>
            <BackButton onClick={handleBack}>
              <BackIcon />
            </BackButton>
            <EditTitle>Editar perfil</EditTitle>
          </EditHeader>
          <LoadingContainer>
            <Loader size="lg" />
          </LoadingContainer>
        </EditContainer>
      );
    }

    if (!profile) {
      return (
        <EditContainer>
          <EditHeader>
            <BackButton onClick={handleBack}>
              <BackIcon />
            </BackButton>
            <EditTitle>Editar perfil</EditTitle>
          </EditHeader>
          <ErrorMessage>Perfil não encontrado.</ErrorMessage>
        </EditContainer>
      );
    }

    return (
      <EditContainer>
        <EditHeader>
          <BackButton onClick={handleBack}>
            <BackIcon />
          </BackButton>
          <EditTitle>Editar perfil</EditTitle>
        </EditHeader>

        <EditCard>
          <AvatarEditSection>
            <AvatarWrapperEditable onClick={handleAvatarClick}>
              <Avatar src={avatarUrl} name={displayName} size="xl" />
              <AvatarOverlay>
                <CameraIcon />
              </AvatarOverlay>
            </AvatarWrapperEditable>
            <HiddenFileInput
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <ChangeAvatarText onClick={handleAvatarClick}>
              Alterar foto de perfil
            </ChangeAvatarText>
            {selectedFile && (
              <FileInfo>Arquivo selecionado: {selectedFile.name}</FileInfo>
            )}
          </AvatarEditSection>

          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          {formError && <ErrorMessage>{formError}</ErrorMessage>}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="displayName">Nome de exibição</Label>
              <Input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  setSuccessMessage(null);
                  setFormError(null);
                }}
                placeholder="Seu nome"
                maxLength={50}
                fullWidth
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="username">Nome de usuário</Label>
              <Input
                id="username"
                type="text"
                value={profile.username}
                disabled
                fullWidth
              />
            </FormGroup>

            {/* NOVOS CAMPOS PARA SENHA */}
            <FormGroup>
              <Label htmlFor="currentPass">Senha atual</Label>
              <Input
                id="currentPass"
                type="password"
                value={currentPass}
                onChange={(e) => {
                  setCurrentPass(e.target.value);
                  setSuccessMessage(null);
                  setFormError(null);
                }}
                placeholder="Digite sua senha atual"
                fullWidth
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="newPass">Nova senha</Label>
              <Input
                id="newPass"
                type="password"
                value={newPass}
                onChange={(e) => {
                  setNewPass(e.target.value);
                  setSuccessMessage(null);
                  setFormError(null);
                }}
                placeholder="Digite sua nova senha"
                minLength={8}
                fullWidth
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPass">Confirmar nova senha</Label>
              <Input
                id="confirmPass"
                type="password"
                value={confirmPass}
                onChange={(e) => {
                  setConfirmPass(e.target.value);
                  setSuccessMessage(null);
                  setFormError(null);
                }}
                placeholder="Confirme sua nova senha"
                minLength={8}
                fullWidth
              />
            </FormGroup>

            <Button
              type="submit"
              fullWidth
              isLoading={isSaving}
              disabled={isSaving}
            >
              Salvar alterações
            </Button>
          </Form>
        </EditCard>
      </EditContainer>
    );
  }

  // RENDER: Public Profile Mode (/profile/:id)
  if (isLoading) {
    return (
      <Container>
        <Header>
          <BackButton onClick={handleBack}>
            <BackIcon />
          </BackButton>
        </Header>
        <LoadingContainer>
          <Loader size="lg" />
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <BackButton onClick={handleBack}>
            <BackIcon />
          </BackButton>
        </Header>
        <ErrorMessage>
          Erro ao carregar o perfil.{' '}
          <button onClick={() => window.location.reload()}>
            Tentar novamente
          </button>
        </ErrorMessage>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container>
        <Header>
          <BackButton onClick={handleBack}>
            <BackIcon />
          </BackButton>
        </Header>
        <NotFoundMessage>Perfil não encontrado.</NotFoundMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>
          <BackIcon />
        </BackButton>
        <HeaderInfo>
          <HeaderName>{profile.display_name}</HeaderName>
          <HeaderPosts>{posts.length} posts</HeaderPosts>
        </HeaderInfo>
      </Header>

      <ProfileHeader>
        <AvatarSection>
          <AvatarWrapper>
            <AvatarImage>
              <Avatar src={profile.avatar} name={profile.display_name} size="xl" />
            </AvatarImage>
          </AvatarWrapper>
          {!isOwnProfile && (
            <FollowButton
              isFollowing={isFollowing}
              onToggle={() => void handleFollowToggle()}
              isLoading={mockFollowLoading}
            />
          )}
        </AvatarSection>

        <ProfileInfo>
          <DisplayName>{profile.display_name}</DisplayName>
          <Username>@{profile.username}</Username>
        </ProfileInfo>

        <Stats>
          <StatItem>
            <StatValue>{followingCount}</StatValue>
            <StatLabel>Seguindo</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{followersCount}</StatValue>
            <StatLabel>Seguidores</StatLabel>
          </StatItem>
        </Stats>
      </ProfileHeader>

      <Tabs>
        <Tab $active={activeTab === 'posts'} onClick={() => setActiveTab('posts')}>
          Posts
        </Tab>
        <Tab
          $active={activeTab === 'followers'}
          onClick={() => setActiveTab('followers')}
        >
          Seguidores
        </Tab>
        <Tab
          $active={activeTab === 'following'}
          onClick={() => setActiveTab('following')}
        >
          Seguindo
        </Tab>
      </Tabs>

      {activeTab === 'posts' && (
        <PostsContainer>
          {posts.length === 0 ? (
            <EmptyState>Este usuário ainda não publicou nada.</EmptyState>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLikeToggle={() => {}}
              />
            ))
          )}
        </PostsContainer>
      )}

      {activeTab === 'followers' && (
        <PostsContainer>
          <EmptyState>Lista de seguidores em breve.</EmptyState>
        </PostsContainer>
      )}

      {activeTab === 'following' && (
        <PostsContainer>
          <EmptyState>Lista de quem segue em breve.</EmptyState>
        </PostsContainer>
      )}
    </Container>
  );
}
