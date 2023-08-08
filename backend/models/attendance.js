import db from "../database/index.js";

export const Attend = db.sequelize.define("attendance",{
    attendanceId : {
        type : db.Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    employeeId : {
        type : db.Sequelize.INTEGER,
        allowNull : false
    },
    clock : {
        type : db.Sequelize.DATE,
        allowNull : false
    },
    action : {
        type : db.Sequelize.STRING,
        allowNull : false
    }
},{
    tableName : "attendance",
    timestamps : false
})