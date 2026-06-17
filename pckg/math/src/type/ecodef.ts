export enum Employment {
    Unemployed = "unemployed",
    Research = "research",
    Maintenance = "maintenance",
    Food = "food",
    Service = "service",
    Military = "military",
    Management = "management",
}

export type EcoDef_Productivity = {
    /** how much products each production job creates */
    readonly baseoutput: number
    /** ratio, how much maintainence jobs does each production job creates */
    readonly baseinput: number
    /** current research progress */
    readonly research: number
}

export type EcoDef_Balance = {
    /** ratio 0-1 */
    readonly mil: number
    /** ratio 0-1 */
    readonly loyalty: number
    /** ratio 0-1 */
    readonly monopoly: number
}

export type EcoDef_Constants = {
    readonly money: number
    readonly research_decay: number
    readonly research_divisor: number
    readonly research_prodmul: number
    readonly research_inframul: number

    readonly need_food: number
    readonly need_serv: number

    readonly pop_head: number
    readonly pop_empl: number

    readonly greedgraph_empl_start_value: number
    readonly greedgraph_empl_mid_ratio: number
    readonly greedgraph_empl_mid_value: number
    readonly greedgraph_head_start_value: number
    readonly greedgraph_head_mid_ratio: number
    readonly greedgraph_head_mid_value: number
}

export type EcoDef = {
    readonly cst: EcoDef_Constants
    readonly balance: EcoDef_Balance
    readonly prod_serv: EcoDef_Productivity
    readonly prod_food: EcoDef_Productivity
}
