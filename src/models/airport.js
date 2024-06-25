'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City,{
        foreignKey:'CityId',
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      });
    }
  } 
  Airport.init({
    name:{type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },

    code:{
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    address:{ type:DataTypes.STRING,
      unique:true

    },

    cityId:{type:DataTypes.INTEGER,
      allowNull:false
    }
  ,
  createdAt:{
    allowNull:false,
    type:Sequelize.DATE
  } ,updatedAt:{
    allowNull:false,
    type:Sequelize.DATE
  }},
  {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};