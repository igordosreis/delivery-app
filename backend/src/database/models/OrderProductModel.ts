import { DataTypes, Model } from 'sequelize';
import db from '.';
import OrderModel from './OrderModel';
import ProductModel from './ProductModel';

class OrderProduct extends Model {
  declare orderId: number;
  declare productId: number;
  declare quantity: number;
}

OrderProduct.init(
  {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'orders',
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'products',
    timestamps: false,
  },
);

OrderProduct.belongsTo(OrderModel, { foreignKey: 'orderId', as: 'order' });
OrderModel.hasMany(OrderModel, { foreignKey: 'orderId', as: 'order' });

OrderProduct.belongsTo(ProductModel, { foreignKey: 'productId', as: 'product' });
ProductModel.hasMany(OrderProduct, { foreignKey: 'productId', as: 'product' });

export default OrderProduct;
