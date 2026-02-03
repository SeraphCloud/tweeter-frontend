import { useState, useEffect, useCallback, useMemo, useRef, type FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostCard } from '../../components/Post/PostCard';
import { FollowButton } from '../../components/FollowButton/FollowButton';
import { Loader } from '../../components/ui/Loader';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { getErrorMessage } from '../../utils/errorHandling';
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

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Determine if this is "my profile" edit mode (route /me) or public profile (route /profile/:id)
  const isMyProfileMode = id === undefined;
  const profileId = Number(id || 0);

  const [activeTab, setActiveTab] = useState<'posts' | 'followers' | 'following'>('posts');

  // Edit form state (only used in /me mode)
  const [displayName, setDisplayName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Password state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  // RTK Query hooks
  const {
    data: apiProfile,
    isLoading: apiProfileLoading,
    error: apiProfileError,
  } = useGetProfileQuery(profileId, {
    skip: !profileId,
  });

  const {
    data: apiMyProfile,
    isLoading: apiMyProfileLoading,
  } = useGetMyProfileQuery(undefined, {
    skip: !isMyProfileMode,
  });

  const { data: apiPosts } = useGetFeedQuery(undefined);

  const { data: apiFollowers } = useGetFollowersQuery(profileId, {
    skip: !profileId,
  });

  const { data: apiFollowing } = useGetFollowingQuery(profileId, {
    skip: !profileId,
  });

  const [followProfileApi] = useFollowProfileMutation();
  const [unfollowProfileApi] = useUnfollowProfileMutation();
  const [updateProfileApi, { isLoading: apiSaving }] = useUpdateMyProfileMutation();

  // Initialize display name from API profile when loading completes
  useEffect(() => {
    if (!apiMyProfileLoading && apiMyProfile) {
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

      // Password validation (if any field was filled)
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
    },
    [displayName, selectedFile, previewUrl, updateProfileApi, currentPass, newPass, confirmPass]
  );

  // Determine if current user is following this profile
  const isFollowing = useMemo(() => {
    // In API mode, this would come from profile data
    return apiProfile?.following_ids.includes(1) ?? false;
  }, [apiProfile]);

  const isOwnProfile = false; // Will be determined by actual user data

  const handleFollowToggle = useCallback(async () => {
    if (!profileId || isOwnProfile) return;

    try {
      if (isFollowing) {
        await unfollowProfileApi(profileId).unwrap();
      } else {
        await followProfileApi(profileId).unwrap();
      }
    } catch (error) {
      console.error('Failed to toggle follow:', error);
    }
  }, [profileId, isFollowing, isOwnProfile, followProfileApi, unfollowProfileApi]);

  const handleBack = () => {
    navigate(-1);
  };

  // Calculate followers/following counts
  const followersCount = useMemo(() => {
    return apiFollowers?.length ?? 0;
  }, [apiFollowers]);

  const followingCount = useMemo(() => {
    return apiFollowing?.length ?? 0;
  }, [apiFollowing]);

  // Determine which data to use
  const profile = isMyProfileMode ? apiMyProfile : apiProfile ?? null;
  const posts = apiPosts?.filter((p) => p.author === profileId) ?? [];
  const isLoading = isMyProfileMode ? apiMyProfileLoading : apiProfileLoading;
  const error = isMyProfileMode ? null : apiProfileError;
  const isSaving = apiSaving;

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

            {/* PASSWORD FIELDS */}
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
                fullWidth
              />
            </FormGroup>

            <Button type="submit" fullWidth disabled={isSaving}>
              {isSaving ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </Form>
        </EditCard>
      </EditContainer>
    );
  }

  // RENDER: Public Profile View
  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>
          <Loader size="lg" />
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>
          Erro ao carregar o perfil.{' '}
          <button onClick={() => window.location.reload()}>Tentar novamente</button>
        </ErrorMessage>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container>
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
            <Avatar src={profile.avatar} name={profile.display_name} size="xl" />
          </AvatarWrapper>
          {!isOwnProfile && (
            <FollowButton
              isFollowing={isFollowing}
              isLoading={false}
              onToggle={handleFollowToggle}
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
        <Tab
          $active={activeTab === 'posts'}
          onClick={() => setActiveTab('posts')}
        >
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
            <EmptyState>
              {isOwnProfile ? 'Nenhum post ainda. Seja o primeiro a publicar!' : 'Nenhum post ainda.'}
            </EmptyState>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </PostsContainer>
      )}

      {activeTab === 'followers' && (
        <div>
          {/* Followers list */}
          {apiFollowers?.length === 0 ? (
            <EmptyState>Nenhum seguidor ainda.</EmptyState>
          ) : (
            apiFollowers?.map((follower, index) => (
              <div key={index}>{follower.username}</div>
            ))
          )}
        </div>
      )}

      {activeTab === 'following' && (
        <div>
          {/* Following list */}
          {apiFollowing?.length === 0 ? (
            <EmptyState>Nenhum seguindo ainda.</EmptyState>
          ) : (
            apiFollowing?.map((following, index) => (
              <div key={index}>{following.username}</div>
            ))
          )}
        </div>
      )}
    </Container>
  );
}
