export interface DeviceFilters {
    query: string | null,
    status: boolean | null
}

export interface SemaforoFilters extends DeviceFilters {
    pack: number | null,
    subpack: number | null,
}

