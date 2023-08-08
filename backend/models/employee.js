import db from "../database/index.js"

export const Employee = db.sequelize.define("employee",{
    employeeId : {
        type : db.Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    username : {
        type : db.Sequelize.STRING,
        allowNull : false
    },
    password : {
        type : db.Sequelize.STRING,
        allowNull : false
    },
    email : {
        type : db.Sequelize.STRING,
        allowNull : false
    },
    isVerified : {
        type : db.Sequelize.STRING,
        allowNull : false,
        defaultValue : "false"
    },
    role : {
        type : db.Sequelize.INTEGER,
        allowNull : false,
        defaultValue : 2
    },
    otp : {
        type : db.Sequelize.STRING
    },
    expiredOtp : {
        type : db.Sequelize.DATE
    }
},{
    tableName : `employee`,
    timestamps : false
})