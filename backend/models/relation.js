import { Attend } from "./attendance.js";
import { Employee } from "./employee.js";
import { Penalty } from "./penalty.js";

Attend.belongsTo(Employee, {foreignKey : "employeeId"});
Employee.hasMany(Attend, {foreignKey : "employeeId"});
Penalty.belongsTo(Employee, {foreignKey : "employeeId"});
Employee.hasOne(Penalty, {foreignKey : "employeeId"});

export {Attend, Employee, Penalty};