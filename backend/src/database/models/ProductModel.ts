import { DataTypes, Model } from 'sequelize';
import db from '.';

class ProductModel extends Model {
  declare id: number;
  declare productName: string;
  declare urlImage: string;
  declare price: number;
  declare stock: number;
}

ProductModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    stock: {
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

export default ProductModel;
