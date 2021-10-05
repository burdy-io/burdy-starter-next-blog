import Hooks from 'burdy/src/shared/features/hooks';
import asyncMiddleware from 'burdy/src/server/middleware/async.middleware';
import next from 'next';
import express from 'express';
import path from 'path';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const nextPublic = path.join(process.cwd(), 'public');

Hooks.addAction('server/init', async (app) => {
  await nextApp.prepare();

  app.use(express.static(nextPublic));

  app.get('*', asyncMiddleware((req, res) => {
    return nextApp.render(req, res, req.path, req.query as any);
  }));
});
