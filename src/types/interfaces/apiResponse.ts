export interface ApiResponse<T> {
    message: string;
    sucess: boolean;
    data: T;
}