import { output_new_food } from "#src/output/new/food"
import { output_new_serv } from "#src/output/new/serv"
import { research_max_new } from "#src/research/max/new"
import type { EcoDef } from "#src/type/ecodef"

// greed is always 1 in the end
const greed_new = function(ratio: number, start_value: number, mid_ratio: number, mid_value: number): number {
    if (ratio <= mid_ratio) {
        return start_value + (ratio / mid_ratio) * (mid_value - start_value)
    }

    return mid_value + (ratio - mid_ratio) / (1 - mid_ratio) * (1 - mid_value)
}

type WFFood = {
    readonly industry: number
    readonly maintenance: number
    readonly unemployed: number
}

type WF_NewFood_Params = {
    // demand for food of the community
    readonly demand: number
    // workforce available to community
    readonly wf: number
}

const wfalloc_new_food = function(eco: EcoDef, params: WF_NewFood_Params): WFFood {
    // first - try to fulfill the basic good demand
    const cover_prod = params.demand / output_new_food(eco)
    const cover_maint = cover_prod * eco.prod_food.baseinput
    const cover = cover_prod + cover_maint

    // can not fulfill demand for basic goods
    // produce as much as possible
    if (cover >= params.wf) {
        // minimum from total cover and maximum available workforce
        const available_goodprod = params.wf / (1 + eco.prod_food.baseinput)
        const available_goodmaint = available_goodprod * eco.prod_food.baseinput

        return {
            unemployed: 0,
            industry: available_goodprod,
            maintenance: available_goodmaint,
        }
    }

    // demand is completely fulfilled
    return {
        industry: cover_prod,
        maintenance: cover_maint,
        unemployed: params.wf - cover,
    }
}

type WFServ = {
    readonly research: number
    readonly industry: number
    readonly maintenance: number
    readonly unemployed: number
}

type WF_NewServ_Params = {
    // accumulated research workforce from prev communities
    readonly wfacc_research: number

    // characteristrics of the community
    // how willing are they to invest over consumption
    readonly greedgraph_mid_value: number
    readonly greedgraph_mid_ratio: number
    readonly greedgraph_start_value: number

    // total workforce available to community
    readonly wf: number
    // demand of community
    readonly demand: number
}

const wf_new_serv = function(eco: EcoDef, params: WF_NewServ_Params): WFServ {
    // how much will be produced if all was distributed to produce services
    const cover_servprod = params.demand / output_new_serv(eco)
    const cover_servmaint = cover_servprod * eco.prod_serv.baseinput
    const cover_serv = cover_servprod + cover_servmaint

    const available_servprod = params.wf / (1 + eco.prod_serv.baseinput)

    // if demand for services can be completely fulfilled
    // do it and leave people as unemployed
    if (cover_serv <= params.wf) {
        return {
            research: 0,
            industry: cover_servprod,
            maintenance: cover_servmaint,
            unemployed: params.wf - cover_serv,
        }
    }

    // demand for services will not be fulfilled
    // available workforce will be redistributed to services and research

    // if potential consumption is small - people will invest their money to research
    // if they can already almost fulfill their needs - they wont invest as much
    const ratio = available_servprod / cover_servprod
    const greed = greed_new(ratio, params.greedgraph_start_value, params.greedgraph_mid_ratio, params.greedgraph_mid_value)

    const wf_res = Math.max(0, Math.min(params.wf * (1 - greed), research_max_new(eco) - params.wfacc_research))
    const wf_serv = params.wf - wf_res

    // remaining workforce after research redistribution is transfered to services production
    const distr_servprod = wf_serv / (1 + eco.prod_serv.baseinput)
    const distr_servmaint = distr_servprod * eco.prod_serv.baseinput

    return {
        unemployed: 0,
        research: wf_res,
        industry: distr_servprod,
        maintenance: distr_servmaint,
    }
}

export type WFCommunity = {
    readonly unemployed: number
    readonly research: number
    readonly serv_industry: number
    readonly serv_maintenance: number

    readonly food_industry: number
    readonly food_maintenance: number
}

export type WF_NewCommunity_Params = {
    readonly wf: number
    readonly wfacc_research: number

    readonly demand_serv: number
    readonly demand_food: number

    readonly greedgraph_mid_value: number
    readonly greedgraph_mid_ratio: number
    readonly greedgraph_start_value: number
}

// distribute the workforce
export const wf_new_community = function(def: EcoDef, params: WF_NewCommunity_Params): WFCommunity {
    const wdistr_food = wfalloc_new_food(def, {
        demand: params.demand_food,
        wf: params.wf,
    })

    const wdistr_serv = wf_new_serv(def, {
        wfacc_research: params.wfacc_research,

        demand: params.demand_serv,
        wf: wdistr_food.unemployed,

        greedgraph_mid_ratio: params.greedgraph_mid_ratio,
        greedgraph_mid_value: params.greedgraph_mid_value,
        greedgraph_start_value: params.greedgraph_start_value,
    })

    return {
        research: wdistr_serv.research,
        unemployed: wdistr_serv.unemployed,

        food_industry: wdistr_food.industry,
        food_maintenance: wdistr_food.maintenance,

        serv_industry: wdistr_serv.industry,
        serv_maintenance: wdistr_serv.maintenance,
    }
}
