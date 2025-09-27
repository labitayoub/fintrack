import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import sequelize from './db.js';

const SessionStore = SequelizeStore(session.Store);

const store = new SessionStore({
  db: sequelize,
  tableName: 'sessions',
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 * 60 * 1000,
});

store.sync();

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    secure: false,
  }
};

export default sessionConfig;