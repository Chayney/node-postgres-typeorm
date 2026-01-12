import { MigrationDataSource } from "../../config/migrationDataSource";
import { Todo } from "../../domain/entity/todo.entity";

export const TodoData = async () => {
    const dataSource = await MigrationDataSource.initialize();
    const todoRepository = dataSource.getRepository(Todo);

    // サンプルデータ
    const todos = [
        { title: 'Todo1', content: 'First todo.' },
        { title: 'Todo2', content: 'Second todo.' },
        { title: 'Todo3', content: 'Third todo.' },
    ];

    // データを挿入
    for (const todo of todos) {
        const todoEntity = todoRepository.create(todo);
        await todoRepository.save(todoEntity);
    }

    console.log('Seed complete: ', await todoRepository.find());

    await dataSource.destroy();
}

// seeding実行
TodoData().catch(console.error);