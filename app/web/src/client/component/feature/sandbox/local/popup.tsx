import st from "#client/component/feature/sandbox/style/popup.module.scss"
import type { EFSandBox_EmploymentShare } from "#src/client/component/feature/sandbox/type/share"
import { useGhostValue } from "#src/client/util/memo/ghost"
import * as math from "@ecoeq/math"
import * as rfl from "@qyu/reactcmp-flow-control"
import cl from "classnames"
import * as r from "react"

type EL__ContentUnemployed_Props = {
    readonly ecodef: math.EcoDef
    readonly wf_eco: math.WFEco
}

const EL_ContentUnemployed: r.FC<EL__ContentUnemployed_Props> = props => {
    const view_unemployed = math.float_new_round(props.wf_eco.unemployed, 2)

    return <>
        <span>
            {view_unemployed.toFixed(2)} People could not find a Job
        </span>
    </>
}

type EL__ContentMilitary_Props = {
    readonly ecodef: math.EcoDef
    readonly wf_eco: math.WFEco
}

const EL_ContentMilitary: r.FC<EL__ContentMilitary_Props> = props => {
    const view_military = math.float_new_round(props.wf_eco.military, 2)

    return <>
        <span>
            {view_military.toFixed(2)} People are serving their country

            <br />
            <br />

            They don't really do anything here as it is an isolated system
        </span>
    </>
}

type EL__ContentResearch_Props = {
    readonly ecodef: math.EcoDef
    readonly wf_eco: math.WFEco
}

const EL_ContentResearch: r.FC<EL__ContentResearch_Props> = props => {
    const wf_res_head = props.wf_eco.head.research
    const wf_res_empl = props.wf_eco.empl.research
    const wf_res = wf_res_head + wf_res_empl
    const view_res = math.float_new_round(wf_res, 2)

    return <>
        <span>
            {view_res.toFixed(2)} People advance Technology
            <br /><br /> Management funds {wf_res_head.toFixed(2)} and Workers {wf_res_empl.toFixed(2)}
        </span>
    </>
}

type EL__ContentMaintenance_Props = {
    readonly ecodef: math.EcoDef
    readonly wf_eco: math.WFEco
}

const EL_ContentMaintenance: r.FC<EL__ContentMaintenance_Props> = props => {
    const wf_infra_food = props.wf_eco.infra_food
    const wf_maint_food = props.wf_eco.head.food_maintenance + props.wf_eco.empl.food_maintenance
    const wf_input_food = wf_infra_food + wf_maint_food
    const wf_infra_serv = props.wf_eco.infra_serv
    const wf_maint_serv = props.wf_eco.head.serv_maintenance + props.wf_eco.empl.serv_maintenance
    const wf_input_serv = wf_infra_serv + wf_maint_serv

    const view_infra_food = math.float_new_round(wf_infra_food, 2)
    const view_maint_food = math.float_new_round(wf_maint_food, 2)
    const view_input_food = math.float_new_round(wf_input_food, 2)

    const view_infra_serv = math.float_new_round(wf_infra_serv, 2)
    const view_maint_serv = math.float_new_round(wf_maint_serv, 2)
    const view_input_serv = math.float_new_round(wf_input_serv, 2)

    return <>
        <span>
            {view_infra_food.toFixed(2)} fixed
            + {view_maint_food.toFixed(2)} variable
            = {view_input_food.toFixed(2)} total maintenance for Essential Production
        </span>

        <br />
        <br />

        <span>
            {view_infra_serv.toFixed(2)} fixed
            + {view_maint_serv.toFixed(2)} variable
            = {view_input_serv.toFixed(2)} total maintenance for Services
        </span>
    </>
}

type EL__ContentFood_Props = {
    readonly ecodef: math.EcoDef
    readonly wf_eco: math.WFEco
}

const EL_ContentFood: r.FC<EL__ContentFood_Props> = props => {
    const wf_prod_head = props.wf_eco.head.food_industry
    const wf_prod_empl = props.wf_eco.empl.food_industry
    const wf_prod = wf_prod_head + wf_prod_empl

    const view_prod = math.float_new_round(wf_prod, 2)
    const view_headshare = math.float_new_round(wf_prod_head / wf_prod, 2)
    const view_emplshare = math.float_new_round(wf_prod_empl / wf_prod, 2)

    return <>
        <span>
            {view_prod.toFixed(2)} People are employed in Essential Production
        </span>

        <br />
        <br />

        <span>
            They sell {Math.trunc(view_headshare * 100)}% to Managment and {Math.trunc(view_emplshare * 100)}% to Workers
        </span>
    </>
}

type EL__ContentServ_Props = {
    readonly ecodef: math.EcoDef
    readonly wf_eco: math.WFEco
}

const EL_ContentServ: r.FC<EL__ContentServ_Props> = props => {
    const wf_serv_head = props.wf_eco.head.serv_industry
    const wf_serv_empl = props.wf_eco.empl.serv_industry
    const wf_serv = wf_serv_head + wf_serv_empl

    const view_serv = math.float_new_round(wf_serv, 2)
    const view_headshare = math.float_new_round(wf_serv_head / wf_serv, 2)
    const view_emplshare = math.float_new_round(wf_serv_empl / wf_serv, 2)

    return <>
        <span>
            {view_serv.toFixed(2)} People are employed in Serivce Industry
        </span>

        <br />
        <br />

        <span>
            They sell {Math.trunc(view_headshare * 100)}% to Managment and {Math.trunc(view_emplshare * 100)}% to Workers
        </span>
    </>
}

type EL__ContentManagement_Props = {
    readonly ecodef: math.EcoDef
    readonly wf_eco: math.WFEco
}

const EL_ContentManagement: r.FC<EL__ContentManagement_Props> = props => {
    const wf_cap_good_prod = props.wf_eco.head.food_industry
    const wf_cap_good_maint = props.wf_eco.head.food_maintenance
    const wf_cap_good = wf_cap_good_prod + wf_cap_good_maint
    const wf_cap_lux_prod = props.wf_eco.head.serv_industry
    const wf_cap_lux_maint = props.wf_eco.head.serv_maintenance
    const wf_cap_lux = wf_cap_lux_prod + wf_cap_lux_maint
    const wf_cap_res = props.wf_eco.head.research
    const wf_cap = wf_cap_res + wf_cap_good + wf_cap_lux
    const wf_available = props.ecodef.cst.pop_empl - props.wf_eco.infra_food - props.wf_eco.infra_serv

    const view_share = math.float_new_round(wf_cap / wf_available, 2)

    return <>
        <span>
            Management Class uses {Math.trunc(view_share * 100)}% of the Workforce
        </span>
    </>
}

type EL__PopupView_Props = {
    readonly children?: r.ReactNode
    readonly status_open: boolean
    readonly emphasis: math.Employment
    readonly section_list: readonly EFSandBox_EmploymentShare[]

    readonly event_hide?: VoidFunction
    readonly event_hover_in?: VoidFunction
    readonly event_hover_out?: VoidFunction
}

const EL_PopupView: r.FC<EL__PopupView_Props> = props => {
    const left = r.useMemo(() => {
        let left = 0

        for (const section of props.section_list) {
            if (section.kind !== props.emphasis) {
                left += section.share
            } else {
                left += section.share / 2

                break
            }
        }

        return left
    }, [props.section_list, props.emphasis])

    return <div
        className={cl(st.popup, props.status_open && st._open)}

        style={{
            [`--efsandbox__left` as any]: left,
        }}

        onMouseEnter={props.event_hover_in}
        onMouseLeave={props.event_hover_out}

        onTransitionEnd={ev => {
            if (ev.nativeEvent.propertyName === "opacity" && props.status_open === false) {
                props.event_hide?.()
            }
        }}
    >
        {props.children}
    </div>
}

export type ELSandBox__Popup_Props = {
    readonly children?: r.ReactNode

    readonly eco: math.EcoDef
    readonly wf_eco: math.WFEco
    readonly section_list: readonly EFSandBox_EmploymentShare[]

    readonly emphasis: math.Employment | null
    readonly emphasis_set: (emphasis: math.Employment | null) => void
}

export const ELSandBox_Popup: r.FC<ELSandBox__Popup_Props> = props => {
    const [status_hidden, status_hidden_set] = r.useState(props.emphasis !== null)
    const emphasis_ghost = useGhostValue(props.emphasis, e => e !== null)
    const emphasis_real = status_hidden ? props.emphasis : emphasis_ghost

    r.useLayoutEffect(() => {
        status_hidden_set(old_status_hidden => {
            if (emphasis_real !== null) {
                return false
            }

            return old_status_hidden
        })
    }, [emphasis_real, status_hidden_set])

    if (typeof emphasis_real !== "string") {
        return null
    }

    return <EL_PopupView
        emphasis={emphasis_real}
        section_list={props.section_list}
        status_open={props.emphasis !== null}

        event_hover_in={() => {
            props.emphasis_set(emphasis_real)
        }}

        event_hover_out={() => {
            props.emphasis_set(null)
        }}

        event_hide={() => {
            status_hidden_set(true)
        }}
    >
        <rfl.CmpIf value={emphasis_real === math.Employment.Unemployed}>
            {() => <EL_ContentUnemployed wf_eco={props.wf_eco} ecodef={props.eco} />}
        </rfl.CmpIf>

        <rfl.CmpIf value={emphasis_real === math.Employment.Research}>
            {() => <EL_ContentResearch wf_eco={props.wf_eco} ecodef={props.eco} />}
        </rfl.CmpIf>

        <rfl.CmpIf value={emphasis_real === math.Employment.Maintenance}>
            {() => <EL_ContentMaintenance wf_eco={props.wf_eco} ecodef={props.eco} />}
        </rfl.CmpIf>

        <rfl.CmpIf value={emphasis_real === math.Employment.Food}>
            {() => <EL_ContentFood wf_eco={props.wf_eco} ecodef={props.eco} />}
        </rfl.CmpIf>

        <rfl.CmpIf value={emphasis_real === math.Employment.Service}>
            {() => <EL_ContentServ wf_eco={props.wf_eco} ecodef={props.eco} />}
        </rfl.CmpIf>

        <rfl.CmpIf value={emphasis_real === math.Employment.Management}>
            {() => <EL_ContentManagement wf_eco={props.wf_eco} ecodef={props.eco} />}
        </rfl.CmpIf>

        <rfl.CmpIf value={emphasis_real === math.Employment.Military}>
            {() => <EL_ContentMilitary wf_eco={props.wf_eco} ecodef={props.eco} />}
        </rfl.CmpIf>
    </EL_PopupView>
}
