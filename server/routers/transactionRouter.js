import express from "express";

const transactionRouter = express.Router();

transactionRouter.get("/", (req, res) => {});
transactionRouter.post("/", (req, res) => {});
transactionRouter.get("/:transactionId", (req, res) => {});
transactionRouter.put("/:transactionId", (req, res) => {});
transactionRouter.delete("/:transactionId", (req, res) => {});
export default transactionRouter;
