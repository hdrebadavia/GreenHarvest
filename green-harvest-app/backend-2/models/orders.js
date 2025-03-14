module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        OrderId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "OrderId"
        },
        CustomerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "UserId",
            references: {
                model: "Users",
                key: "UserId"
            },
            onDelete: "CASCADE"
        },
        OrderDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("GETDATE()"),
            field: "OrderDate"
        },
        TotalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            field: "TotalAmount"
        },
        OrderStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Pending",
            field: "OrderStatus"
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
        tableName: "Orders",
        timestamps: true,
        schema: "GreenHarvest",
        createdAt: 'CreatedAt',
        updatedAt: 'UpdatedAt'
    });

    Order.associate = (models) => {
        Order.hasMany(models.OrderItem, { foreignKey: "OrderId", as: "OrderItems" });
    };

    return Order;
};