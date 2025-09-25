import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ObjectifEpargne = sequelize.define('ObjectifEpargne', {
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
  nom_objectif: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  montant_cible: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  montant_actuel: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0.00
  },
  deadline: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  tableName: 'objectifs_epargne',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default ObjectifEpargne;
