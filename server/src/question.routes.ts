import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

export const questionRouter = express.Router();
questionRouter.use(express.json());

questionRouter.get("/", async (_req, res) => {
    try {
        const questions = await collections?.Questions?.find({}).toArray();
        console.log("Number of questions fetched: ", questions?.length);
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send(
            error instanceof Error ? error.message : "Unknown error"
        );
    }
});

questionRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const question = await collections?.Questions?.findOne(query);

        if (question) {
            res.status(200).send(question);
        } else {
            res.status(404).send(`Failed to find an question: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(
            `Failed to find a question: ID ${req?.params?.id}`
        );
    }
});

questionRouter.post("/", async (req, res) => {
    try {
        const question = req.body;
        const result = await collections?.Questions?.insertOne(question);

        if (result?.acknowledged) {
            res.status(201).send(
                `Created a new question: ID ${result.insertedId}.`
            );
        } else {
            res.status(500).send("Failed to create a new question.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(
            error instanceof Error ? error.message : "Unknown error"
        );
    }
});

questionRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const question = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.Questions?.updateOne(query, {
            $set: question,
        });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a question: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find a question: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a question: ID ${id}`);
        }
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

questionRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.Questions?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a question: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a question: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a question: ID ${id}`);
        }
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});
