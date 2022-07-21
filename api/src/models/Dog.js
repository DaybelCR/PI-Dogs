const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
     type:DataTypes.UUID,
     primaryKey:true,
     allowNull:false,
     defaultValue:DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false,
      validate:{
        isAlpha: true,
      }
    },
    height:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    weight:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    life_span:{
      type:DataTypes.STRING,
      allowNull:false,
      set(value) {
        this.setDataValue('life_span', value +' years');
      }
    },
    image:{
      type:DataTypes.TEXT,
      allowNull:false,
    },
    created:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true,
    }
  },{
    timestamps:false,
  });
};
