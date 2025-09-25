import sequelize from '../config/db.js';
import User from './User.js';
import Category from './Category.js';
import Transaction from './Transaction.js';
import Budget from './Budget.js';
import ObjectifEpargne from './ObjectifEpargne.js';

User.hasMany(Category, {
  foreignKey: 'user_id',
  as: 'categories'
});

User.hasMany(Transaction, {
  foreignKey: 'user_id',
  as: 'transactions'
});

User.hasMany(Budget, {
  foreignKey: 'user_id',
  as: 'budgets'
});

User.hasMany(ObjectifEpargne, {
  foreignKey: 'user_id',
  as: 'objectifs_epargne'
});

Category.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Category.hasMany(Transaction, {
  foreignKey: 'categorie_id',
  as: 'transactions'
});

Category.hasMany(Budget, {
  foreignKey: 'categorie_id',
  as: 'budgets'
});

Transaction.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Transaction.belongsTo(Category, {
  foreignKey: 'categorie_id',
  as: 'category'
});

Budget.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Budget.belongsTo(Category, {
  foreignKey: 'categorie_id',
  as: 'category'
});

ObjectifEpargne.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});


export default {
  sequelize,
  User,
  Category,
  Transaction,
  Budget,
  ObjectifEpargne
};
