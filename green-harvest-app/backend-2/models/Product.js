module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
      ProductID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ProductID"
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "Name"
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "Description"
      },
      Price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "Price"
      },
      Stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "Stock"
      },
      FarmerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "FarmerID"
      }
    }, {
        tableName: "Products",
        timestamps: false // Set to true if using createdAt/updatedAt
    });

    return Product;
};
