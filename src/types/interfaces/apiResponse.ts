export interface ApiResponse<T> {
    message: string;
    sucess: boolean;
    total?: number,
    page?: number,
    limit?: number,
    data: T;
}