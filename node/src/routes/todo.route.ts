import { Router } from "express";
import { getTodoHandler, getTodosHandler, validateTodoId } from "../controller/todo.controller";

export const todoRouter = Router();

todoRouter.get('/todos', getTodosHandler);
todoRouter.get('/todos/:id', validateTodoId, getTodoHandler);