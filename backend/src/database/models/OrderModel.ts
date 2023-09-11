import { DataTypes, Model } from 'sequelize';
import db from '.';
import UserModel from './UserModel';

class OrderModel extends Model {
  declare id: number;
  declare userId: string;
  declare sellerId: string;
  declare totalPrice: number;
  declare status: string;
  declare deliveryAddress: string;
  declare deliveryNumber: string;
  declare orderDate: Date;
}

OrderModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pendente',
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliveryNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'orders',
    timestamps: false,
  },
);

OrderModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
UserModel.hasMany(OrderModel, { foreignKey: 'userId', as: 'user' });

OrderModel.belongsTo(UserModel, { foreignKey: 'sellerId', as: 'seller' });
UserModel.hasMany(OrderModel, { foreignKey: 'sellerId', as: 'seller' });

export default OrderModel;
