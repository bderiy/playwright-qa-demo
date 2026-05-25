export const users = {
  standard: {
    username: process.env.USER_NAME ?? 'standard_user',
    password: process.env.USER_PASSWORD ?? 'secret_sauce'
  },
  lockedOut: {
    username: 'locked_out_user',
    password: process.env.USER_PASSWORD ?? 'secret_sauce'
  }
};
