import { Todo } from "../domain/entity/todo.entity";
import { createTodo, deleteTodo, findAllTodo, findTodo, updateTodo } from "../repository/todo.repository"

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

export type CreateNewTodoParam = {
    title: string;
    content: string;
};

// 新しいTodoを作るためにユーザーが入力する情報を引数に取る
export const createNewTodo = async ({ title, content }: CreateNewTodoParam) => {
    const newTodo = new Todo();
    newTodo.title = title;
    newTodo.content = content;
    // 保存はrepositoryに委託
    return await createTodo(newTodo);
};

export type UpdateExistingTodoParam = {
    id: number;
    title: string;
    content: string;
};

// 例外処理はcontrollerに任せる
export const updateExistingTodo = async ({ id, title, content }: UpdateExistingTodoParam) => {
    const todo = await findTodo(id);

    if (!todo) {
        throw new Error('Todo not found');
    }

    todo.title = title;
    todo.content = content;

    return await updateTodo(todo);
};

export const deleteExistingTodo = async (id: number) => {
    const todo = await findTodo(id);

    if (!todo) {
        throw new Error('Todo not found');
    }

    return await deleteTodo(id);
}