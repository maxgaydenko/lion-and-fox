import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';
import express from 'express';

export default withAuth(
  config({
    server: {
      cors: true,
      extendExpressApp: (app, createContext) => {
        app.use('/upload_files', express.static('./upload_files'));
        app.get('/api/users', async (req, res) => {
          const context = await createContext(req, res);
          const users = await context.query.User.findMany();
          res.json(users);
        });
      },
    },
    files: {
      upload: 'local',
      local: {
        storagePath: './upload_files/',
        baseUrl: '/upload_files',
      },
    },
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
