import { findAllTodo, findTodo } from "../repository/todo.repository";

export const getTodos = async () => {
    return await findAllTodo();
};

export const getTodo = async (id: number) => {
    const todo = await findTodo(id);

    if (!todo) {
        throw new Error('Todo not found');
    }

    return todo;
};
