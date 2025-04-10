module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        UserId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "UserId"
        },
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "FirstName"
        },
        MiddleName: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "MiddleName"
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "LastName"
        },
        EmailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: "EmailAddress"
        },
        PasswordHash: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "PasswordHash"
        },
        ContactNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ContactNumber"
        },
        Role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['Admin', 'Customer', 'StoreOwner']]
            },
            field: "Role"
        },
        CreatedAt: {
            type: DataTypes.DATE,
            field: "CreatedAt",
            allowNull: false,
            defaultValue: sequelize.literal("GETDATE()")
        },
        UpdatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "UpdatedAt",
            onUpdate: sequelize.literal("GETDATE()")
        },
    }, {
        tableName: "Users",
        timestamps: false,
        schema: "GreenHarvest"
    });

    // Define relationships
    User.associate = (models) => {
        User.hasMany(models.Products, { foreignKey: "CreatedBy", as: "Products" });
        User.hasMany(models.Products, { foreignKey: "UpdatedBy", as: "UpdatedProducts" });
        User.belongsTo(models.Stores, { foreignKey: "StoreId", as: "Store" });
        User.hasMany(models.Orders, { foreignKey: "CreatedBy", as: "Orders" });
        User.hasMany(models.Orders, { foreignKey: "UpdatedBy", as: "UpdatedOrders" });
        User.hasMany(models.Addresses, { foreignKey: "UserId", as: "Addresses" });
        User.hasMany(models.OrderItems, { foreignKey: "UserId", as: "OrderItems" });
        User.hasMany(models.Users, { foreignKey: "CreatedBy", as: "CreatedUsers" });
        User.hasMany(models.Users, { foreignKey: "UpdatedBy", as: "UpdatedUsers" });
        User.belongsTo(models.Users, { foreignKey: "CreatedBy", as: "Creator" });
    };



    return User;
};