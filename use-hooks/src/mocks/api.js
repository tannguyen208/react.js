const tokenFake =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export const ApiFaker = {
  signIn() {
    return Promise.resolve({
      token: tokenFake,
      username: 'tan.na',
    });
  },

  signOut() {
    return Promise.resolve();
  },

  async fetchUser() {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return {
        username: 'tan.na',
        fullName: 'Anh Tan, Nguyen',
      };
    } catch (e) {
      return 'Not found!';
    }
  },
};
