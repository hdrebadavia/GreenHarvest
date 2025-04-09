module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define("OrderItem", {
        ItemId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "ItemId"
        },
        OrderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "OrderId",
            references: {
                model: "Orders",
                key: "OrderId"
            },
            onDelete: "CASCADE"
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
        tableName: "OrderItems",
        timestamps: true,
        schema: "GreenHarvest",
        createdAt: 'CreatedAt',
        updatedAt: 'UpdatedAt'
    });

    OrderItem.associate = (models) => {
        OrderItem.belongsTo(models.Order, { foreignKey: "OrderId", as: "Order" });
        OrderItem.belongsTo(models.Product, { foreignKey: "ProductId", as: "Product" });
    };

    return OrderItem;
}