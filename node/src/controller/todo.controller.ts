import { RequestHandler } from "express";
import { check, validationResult } from "express-validator";
import { getTodo, getTodos } from "../service/todo.service";

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
