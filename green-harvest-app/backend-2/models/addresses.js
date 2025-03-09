module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define("Address", {
        AddressId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "AddressId"
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "UserID",
            references: {
                model: "Users",
                key: "UserId"
            },
            onDelete: "CASCADE"
        },
        HouseNo: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "HouseNo"
        },
        Street: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "Street"
        },
        Barangay: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "Barangay"
        },
        City: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "City"
        },
        Province: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "Province"
        },
        ZipCode: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ZipCode"
        },
        ContactNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ContactNumber"
        },
        AddressType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['Home', 'Work']]
            },
            field: "AddressType"
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
        tableName: "Addresses",
        timestamps: true,
        schema: "GreenHarvest"
    });

    return Address;
};