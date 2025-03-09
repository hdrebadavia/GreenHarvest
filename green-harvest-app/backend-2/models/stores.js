module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define("Store", {
        StoreId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "StoreId"
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "Name"
        },
        Description: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: "Description"
        },
        Location: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "Location"
        },
        CreatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: "CreatedAt"
        },
        CreatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "CreatedBy",
            references: {
                model: "Users",
                key: "UserId"
            }
        },
        UpdatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "UpdatedAt"
        },
        UpdatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "UpdatedBy",
            references: {
                model: "Users",
                key: "UserId"
            }
        }
    }, {
        tableName: "Stores",
        timestamps: true,
        schema: "GreenHarvest"
    });

    return Store;
};