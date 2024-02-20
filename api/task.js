import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  UpdateCommand,
  PutCommand,
  ScanCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

const client = new DynamoDBClient({ region: "us-west-1" });
const docClient = new DynamoDBDocumentClient.from(client);

export const fetchTasks = async () => {
  const command = new ScanCommand({
    TableName: "Tasks",
    ProjectionExpression: "id, #name, completed",
    ExpressionAttributeNames: { "#name": "name" },
  });
  const response = await docClient.send(command);
  return response;
};

export const createTasks = async ({ name, completed }) => {
  const uuid = new crypto.randomUUID();
  const command = new PutCommand({
    TableName: "Tasks",
    Item: {
      id: uuid,
      name,
      completed,
    },
  });
  const response = await docClient.send(command);
  return response;
};

export const updateTasks = async ({ id, name, completed }) => {
  const command = new UpdateCommand({
    TableName: "Tasks",
    Key: {
      id,
    },
    ExpressionAttributeNames: { "#name": "name" },
    UpdateExpression: "set #name = :n, completed = :c",
    ExpressionAttributeValues: {
      ":n": name,
      ":c": completed,
    },
    ReturnValues: "ALL_NEW",
  });
  const response = await docClient.send(command);
  return response;
};

export const deleteTasks = async ({ id }) => {
  const command = new DeleteCommand({
    TableName: "Tasks",
    Key: {
      id,
    },
  });
  const response = await docClient.send(command);
  return response;
};
