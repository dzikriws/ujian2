import morgan from "morgan";
import chalk from "chalk";
import { Request, Response } from "express";

const formatJSON = (data: any) => {
  if (!data || typeof data !== "object") return "{}";
  return Object.keys(data).length ? JSON.stringify(data, null, 2) : "{}";
};

morgan.token("body", (req: Request) => formatJSON(req.body));
morgan.token("query", (req: Request) => formatJSON(req.query));
morgan.token("params", (req: Request) => formatJSON(req.params));
morgan.token("headers", (req: Request) => formatJSON(req.headers));

const Morgan = morgan((tokens, req: Request, res: Response) => {
  return [
    chalk.blue.bold(tokens.method(req, res)),
    chalk.green(tokens.url(req, res)),
    chalk.yellow(tokens.status(req, res)),
    chalk.magenta(tokens["response-time"](req, res) + " ms"),
    "\nHeaders:",
    chalk.cyan(tokens.headers(req, res)),
    "\nQuery:",
    chalk.cyan(tokens.query(req, res)),
    "\nParams:",
    chalk.cyan(tokens.params(req, res)),
    "\nBody:",
    chalk.cyan(tokens.body(req, res)),
    "\n" + "-".repeat(80),
  ].join(" ");
});

export default Morgan;