import { greed_new_empl } from "#src/greed/new/empl";
import { greed_new_head } from "#src/greed/new/head";
import { research_infra_new_food } from "#src/research/infra/new/food";
import { research_infra_new_serv } from "#src/research/infra/new/serv";
import { salary_new_empl } from "#src/salary/new/empl";
import { salary_new_head } from "#src/salary/new/head";
import type { EcoDef } from "#src/type/ecodef";
import { wf_new_community, type WFCommunity } from "#src/wf/new/community";

export type WFEco = {
    readonly head: Omit<WFCommunity, "unemployed">
    readonly empl: Omit<WFCommunity, "unemployed">

    readonly military: number
    readonly unemployed: number
    readonly infra_food: number
    readonly infra_serv: number
}

export const wf_new_eco = function(eco: EcoDef): WFEco {
    const salary_empl = salary_new_empl(eco)
    const salary_head = salary_new_head(eco, salary_empl)

    const money_head = salary_head * eco.cst.pop_head
    const money_empl = salary_empl * eco.cst.pop_empl
    const money = money_head + money_empl

    const wf_infra_food = research_infra_new_food(eco)
    const wf_infra_serv = research_infra_new_serv(eco)
    const wf_military = eco.balance.mil * (eco.cst.pop_empl - wf_infra_food - wf_infra_serv)
    const wf_private = eco.cst.pop_empl - wf_infra_food - wf_infra_serv - wf_military

    const claim_cap = money_head / money * wf_private
    const claim_worker = wf_private - claim_cap

    const wf_community_head = wf_new_community(eco, {
        wf: claim_cap,
        wfacc_research: 0,

        greedgraph_mid_ratio: eco.cst.greedgraph_head_mid_ratio,
        greedgraph_mid_value: greed_new_head(eco, eco.cst.greedgraph_head_mid_value),
        greedgraph_start_value: greed_new_head(eco, eco.cst.greedgraph_head_start_value),

        demand_serv: eco.cst.pop_head * eco.cst.need_serv,
        demand_food: eco.cst.pop_head * eco.cst.need_food,
    })

    const wf_deflation = wf_community_head.unemployed * (1 - eco.balance.monopoly / (1 - eco.balance.loyalty))

    const wf_community_empl = wf_new_community(eco, {
        wf: claim_worker + wf_deflation,
        wfacc_research: wf_community_head.research,

        greedgraph_mid_ratio: eco.cst.greedgraph_empl_mid_ratio,
        greedgraph_mid_value: greed_new_empl(eco, eco.cst.greedgraph_empl_mid_value),
        greedgraph_start_value: greed_new_empl(eco, eco.cst.greedgraph_empl_start_value),

        demand_serv: eco.cst.pop_empl * eco.cst.need_serv,
        demand_food: eco.cst.pop_empl * eco.cst.need_food,
    })

    return {
        military: wf_military,
        head: wf_community_head,
        empl: wf_community_empl,

        infra_food: wf_infra_food,
        infra_serv: wf_infra_serv,
        unemployed: wf_community_head.unemployed - wf_deflation + wf_community_empl.unemployed,
    }
}
