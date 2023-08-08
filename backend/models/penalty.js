import db from "../database/index.js";

export const Penalty = db.sequelize.define("penalty",{
    penaltyId : {
        type : db.Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    employeeId : {
        type : db.Sequelize.INTEGER,
        allowNull : false
    },
    halfSalary : {
        type : db.Sequelize.INTEGER,
        allowNull : false,
        defaultValue : 0
    },
    noSalary : {
        type : db.Sequelize.INTEGER,
        allowNull : false,
        defaultValue : 0
    }
},{
    tableName : `penalty`,
    timestamps : false
})