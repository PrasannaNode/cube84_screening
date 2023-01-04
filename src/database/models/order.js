"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const orderData = sequelize.define(
    "order",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      products: {
        type: DataTypes.STRING,
        get: function () {
          return JSON.parse(this.getDataValue("products"));
        },
        set: function (val) {
          return this.setDataValue("products", JSON.stringify(val));
        },
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      addressLine1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressLine2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
  orderData.sync();
  return orderData;
};
