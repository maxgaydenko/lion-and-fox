import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';

const url = process.env.SESSION_SECRET

export default withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
      useMigrations: true,
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
  })
);
