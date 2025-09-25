import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(190),
        allowNull: false,
        unique: true
    },
    mot_de_passe: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    devise: {
        type: DataTypes.STRING(10),
        defaultValue: 'MAD'
    }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default User;
