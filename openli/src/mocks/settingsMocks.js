export const mockedUserId = 'mockedUserId';

export const authenticatedState = {
  isLoaded: true,
  user: {
    id: mockedUserId,
    name: 'Vlad',
    familyName: 'Mocked',
    email: 'vlad@mocked.com',
    emailVerified: true
  }
};
export const unregisteredUserState = { isLoaded: true, user: undefined };
