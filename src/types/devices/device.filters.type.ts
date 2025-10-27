export interface DeviceFilters extends Pagination{
    query: string | null,
    isActive: boolean | null,
}

export interface SemaforoFilters extends DeviceFilters {
    pack: number | null,
    subPack: number | null,
}


export interface Pagination {
    page?: number| null,
    limit?: number| null,
}

