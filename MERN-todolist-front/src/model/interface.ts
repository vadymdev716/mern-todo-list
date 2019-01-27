export interface IFetchedTodo {
    _id: string,
    done: boolean,
    title: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
}

export interface ITodoItem {
    _id: string,
    done: boolean,
    title: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
    [method: string]: any
}