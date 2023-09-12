import { DataTypes, Model } from 'sequelize';
import db from '.';
import OrderModel from './OrderModel';
import ProductModel from './ProductModel';

class OrderProductModel extends Model {
  declare orderId: number;
  declare productId: number;
  declare quantity: number;
}

OrderProductModel.init(
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
    modelName: 'orders_products',
    timestamps: false,
  },
);

OrderProductModel.belongsTo(OrderModel, { foreignKey: 'orderId', as: 'order' });
OrderModel.hasMany(OrderProductModel, { foreignKey: 'orderId', as: 'order' });

OrderProductModel.belongsTo(ProductModel, {
  foreignKey: 'productId',
  as: 'product',
});
ProductModel.hasMany(OrderProductModel, { foreignKey: 'productId', as: 'product' });

export default OrderProductModel;
