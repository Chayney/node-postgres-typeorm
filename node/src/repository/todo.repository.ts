// データベースへの保存のみ
import { Todo } from "../domain/entity/todo.entity";
import { AppDataSource } from "../config/appDataSource";
import { FindManyOptions } from "typeorm";

// optionsは「検索条件」や「取得件数」を指定するオブジェクト
// DBへのアクセスは非同期処理となる
export const findAllTodo = async (options?: FindManyOptions<Todo>) => {
    // getInstanceはDB接続済みのインスタンス
    const db = AppDataSource.getInstance();
    // typeormのgetRepositoryはsaveやfindなどCRUD操作をまとめたクラス
    const todoRepository = db.getRepository(Todo);

    try {
        return await todoRepository.find(options);
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to find todo: ${error}`);
    }
};

export const findTodo = async (id: number) => {
    const db = AppDataSource.getInstance();
    const todoRepository = db.getRepository(Todo);

    try {
        return await todoRepository.findOne({
            where: {
                id
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to find todo: ${error}`);
    }
};
