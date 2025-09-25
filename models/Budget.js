import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Budget = sequelize.define('Budget', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  categorie_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    }
  },
  montant: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  periode: {
    type: DataTypes.STRING(7),
    allowNull: false
  }
}, {
  tableName: 'budgets',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Budget;
