import chalk from "chalk";

export function requestLogger (req, res, next){
    console.log(chalk.yellow(req.method)+`:${req.url}`)
    next();
}