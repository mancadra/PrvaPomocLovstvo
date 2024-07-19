import * as mongodb from "mongodb";
import { Question } from "./question";

export const collections: {
    Questions?: mongodb.Collection<Question>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("QuestionsPrvaPomocLovstvo");
    await applySchemaValidation(db);

    const questionsCollection = db.collection<Question>("Questions");
    collections.Questions = questionsCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "question_text",
                "num_of_correct_answers",
                "answers",
                "categoryId",
                "correct_answers",
            ],
            additionalProperties: false,
            properties: {
                _id: {},
                question_text: {
                    bsonType: "string",
                    description: "'question_text' is required and is a string",
                },
                num_of_correct_answers: {
                    bsonType: "number",
                    description:
                        "'num_of_correct_answers' is required and is a number",
                },
                answers: {
                    bsonType: "string[]",
                    description:
                        "'answers' is required and is an array of strings",
                },
                categoryId: {
                    bsonType: "number",
                    description: "'categoryId' is required and is a number",
                },
                correct_answers: {
                    bsonType: "number[]",
                    description:
                        "'correct_answers' is required and is an array of numbers",
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
    await db
        .command({
            collMod: "Questions",
            validator: jsonSchema,
        })
        .catch(async (error: mongodb.MongoServerError) => {
            if (error.codeName === "NamespaceNotFound") {
                await db.createCollection("Questions", {
                    validator: jsonSchema,
                });
            }
        });
}
