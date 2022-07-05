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
    },
    height:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    weigth:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    life_span:{
      type:DataTypes.STRING,
      allowNull:false
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
