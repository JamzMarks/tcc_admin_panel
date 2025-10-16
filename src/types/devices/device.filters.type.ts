export interface DeviceFilters {
    query: string | null,
    isActive: boolean | null
}

export interface SemaforoFilters extends DeviceFilters {
    pack: number | null,
    subPack: number | null,
}

