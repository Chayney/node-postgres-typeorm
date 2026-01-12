import { RequestHandler } from "express";
import { check, validationResult } from "express-validator";
import { createNewTodo, CreateNewTodoParam, deleteExistingTodo, getTodo, getTodos, updateExistingTodo, UpdateExistingTodoParam } from "../service/todo.service";

// ミドルウェアとして使用する配列
export const validateTodoId = [
    check('id').isInt({ min: 1 }).withMessage('id need natural number')
];

export const getTodosHandler: RequestHandler = async (_req, res) => {
    try {
        const todos = await getTodos();
        res.status(200).json({
            success: true,
            data: todos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            errors: ['Internal Server error']
        });
    }
};

export const getTodoHandler: RequestHandler = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg as string);
        res.status(400).json({
            success: false,
            errors: errorMessage
        });

        return;
    }

    try {
        const todo = await getTodo(Number(req.params.id));

        if (!todo) {
            res.status(404).json({
                success: false,
                errors: ['Todo not found']
            });

            return;
        }
        res.status(200).json({
            success: true,
            data: todo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            errors: ['Internal server error']
        });
    }
};

export const validateCreateTodo = [
    check('title')
        .notEmpty()
        .withMessage('title must not be empty')
        .isLength({ max: 30 })
        .withMessage('title must not exceed 30 characters'),
    check('content')
        .notEmpty()
        .withMessage('content must not be empty')
];

export const createNewTodoHandler: RequestHandler = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg as string);
        res.status(400).json({
            success: false,
            errors: errorMessage
        });

        return;
    }

    // service層がこの型にしたがってTodoを作るためリクエストが型に沿っているかをチェックする
    const param: CreateNewTodoParam = {
        title: req.body.title,
        content: req.body.content
    };

    try {
        const todo = await createNewTodo(param);
        res.status(200).json({
            success: true,
            data: todo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            errors: ['Internal server error']
        });
    }
};

export const validateUpdateTodo = [
    check('id')
        .isInt({ min: 1 })
        .withMessage('id need natural number'),
    check('title')
        .notEmpty()
        .withMessage('title must not be empty')
        .isLength({ max: 30 })
        .withMessage('title must not exceed 30 characters'),
    check('content')
        .notEmpty()
        .withMessage('content must not be empty')
];

export const updateTodoHandler: RequestHandler = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg as string);
        res.status(400).json({
            success: false,
            error: errorMessage
        });
        return;
    }
    const param: UpdateExistingTodoParam = {
        id: Number(req.params.id),
        title: req.body.title,
        content: req.body.content
    };

    try {
        const todo = await updateExistingTodo(param);
        res.status(200).json({
            success: true,
            data: todo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            errors: ['Internal server error']
        });
    }
};

export const validateDeleteTodo = [
    check('id')
        .isInt({ min: 1 })
        .withMessage('id need natural number')
];

export const deleteTodoHandler: RequestHandler = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg as string);
        res.status(400).json({
            success: false,
            error: errorMessage
        });
        return;
    }

    try {
        await deleteExistingTodo(Number(req.params.id));
        res.status(201).json({
            success: true,
        });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            errors: ['Internal server error']
        });
    }
};