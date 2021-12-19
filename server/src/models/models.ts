import sequelize from '../../db';
import {
  DataTypes,
  NumberDataType,
  IntegerDataType,
  ModelCtor,
  Model,
  Optional
} from 'sequelize';

export type UserModel = {
  id: number;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
};

export const User = sequelize.define<
  Model<UserModel, Optional<UserModel, 'id'>>
>('user', {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' }
});

export type BasketModel = Model<{
  id?: number;
  userId: number;
  name: string;
}>;

export const Basket = sequelize.define<BasketModel>('basket', {
  userId: { type: DataTypes.INTEGER, unique: true, allowNull: false },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

export const BasketDevice = sequelize.define('basket_device', {
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

export const Device = sequelize.define('device', {
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false }
});

export const Type = sequelize.define('type', {
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

export const Brand = sequelize.define('type', {
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

export const DeviceInfo = sequelize.define('device_info', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false }
});

export const TypeBrand = sequelize.define('type_brand', {
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });
