module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define("CartItem", {
        CartItemId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "CartItemId"
        },
        ProductId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "ProductId",
            references: {
                model: "Products",
                key: "ProductId"
            },
            onDelete: "CASCADE"
        },
        Quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "Quantity"
        },
        Status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Pending",
            field: "Status"
        },
        CreatedAt: {
            type: DataTypes.DATE,
            field: "CreatedAt",
            allowNull: false,
            defaultValue: sequelize.literal("GETDATE()")
        },
        CreatedBy: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "CreatedBy",
          references: {
            model: 'Users',
            key: 'UserId'
          }
        },
        UpdatedAt: {
            type: DataTypes.DATE,
            field: "UpdatedAt",
            allowNull: true,
            onUpdate: sequelize.literal("GETDATE()")
        },
        UpdatedBy: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: "UpdatedBy",
          references: {
            model: 'Users',
            key: 'UserId'
          }
        }
    }, {
        tableName: "CartItems",
        timestamps: false,
        schema: "GreenHarvest",
    });

    return CartItem;
};