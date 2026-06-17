import st from "#client/component/feature/sandbox/style/popview.module.scss"
import { ELSandBox_Popup } from "#src/client/component/feature/sandbox/local/popup"
import type { EFSandBox_EmploymentShare } from "#src/client/component/feature/sandbox/type/share"
import * as math from "@ecoeq/math"
import * as fas_pop from "@fortawesome/free-solid-svg-icons/faUser"
import * as faw from "@fortawesome/react-fontawesome"
import cl from "classnames"
import * as r from "react"

const clname_new_stylekind = function(style_kind: math.Employment): string | undefined {
    switch (style_kind) {
        case math.Employment.Unemployed:
            return st._style_unemployed
        case math.Employment.Research:
            return st._style_research
        case math.Employment.Maintenance:
            return st._style_maintenance
        case math.Employment.Service:
            return st._style_serv
        case math.Employment.Food:
            return st._style_food
        case math.Employment.Management:
            return st._style_management
        case math.Employment.Military:
            return st._style_military
    }
}

type EL__IconSection_Props = {
    readonly occupation: number
    readonly style_kind: math.Employment

    readonly emphasis: math.Employment | null
    readonly emphasis_set: (style_kind: math.Employment | null) => void
}

const EL_IconSection: r.FC<EL__IconSection_Props> = props => {
    return <div
        className={cl(
            st.icon__section,
            clname_new_stylekind(props.style_kind),
            props.style_kind === props.emphasis ? st._emphasis : null,
        )}

        style={{
            [`--efsandbox__occupation` as any]: props.occupation,
        }}

        onMouseMove={() => {
            props.emphasis_set(props.style_kind)
        }}

        onMouseEnter={() => {
            props.emphasis_set(props.style_kind)
        }}
    >
        <faw.FontAwesomeIcon icon={fas_pop.faUser} />
    </div>
}

type EL__Icon_Props = {
    readonly style_list: readonly EFSandBox_EmploymentShare[]

    readonly emphasis: math.Employment | null
    readonly emphasis_set: (style_kind: math.Employment | null) => void
}

const EL_Icon: r.FC<EL__Icon_Props> = props => {
    const el_sections = r.useMemo(() => {
        const el_list = new Array<r.ReactNode>()

        let freespace = 1

        for (let i = props.style_list.length - 1; i >= 0; --i) {
            const section = props.style_list[i]!

            if (section.share > 0.01) {
                el_list.push(<EL_IconSection
                    key={section.kind}

                    occupation={freespace}
                    style_kind={section.kind}

                    emphasis={props.emphasis}
                    emphasis_set={props.emphasis_set}
                />)
            }

            freespace -= section.share
        }

        return el_list
    }, [props.style_list, props.emphasis, props.emphasis_set])

    return <div
        className={st.icon}

        onMouseLeave={() => {
            props.emphasis_set(null)
        }}

        onMouseMove={ev => {
            if (props.style_list.length) {
                if (ev.target === ev.currentTarget && ev.target instanceof HTMLElement) {
                    const rect = ev.target.getBoundingClientRect()

                    const x = ev.pageX - rect.x

                    if (x / rect.width > 0.5) {
                        for (let i = props.style_list.length - 1; i >= 1; --i) {
                            const section = props.style_list[i]!

                            if (section.share > 0.01) {
                                props.emphasis_set(section.kind)

                                return
                            }
                        }

                        props.emphasis_set(props.style_list[0]!.kind)
                    } else {
                        for (let i = 0; i < props.style_list.length - 1; ++i) {
                            const section = props.style_list[i]!

                            if (section.share > 0.01) {
                                props.emphasis_set(section.kind)

                                return
                            }
                        }

                        props.emphasis_set(props.style_list.at(-1)!.kind)
                    }
                }
            }
        }}
    >
        {el_sections}
    </div>
}

export type ELSandBox__PopView_Props = {
    readonly eco: math.EcoDef
    readonly wf_eco: math.WFEco
}

export const ELSandBox_PopView: r.FC<ELSandBox__PopView_Props> = props => {
    const wf_head = props.eco.cst.pop_head
    const wf_unemployed = props.wf_eco.unemployed
    const wf_military = props.wf_eco.military
    const wf_res = props.wf_eco.head.research + props.wf_eco.empl.research
    const wf_maint_serv = props.wf_eco.head.serv_maintenance + props.wf_eco.empl.serv_maintenance + props.wf_eco.infra_serv
    const wf_maint_food = props.wf_eco.head.food_maintenance + props.wf_eco.empl.food_maintenance + props.wf_eco.infra_food
    const wf_maint = wf_maint_serv + wf_maint_food
    const wf_serv = props.wf_eco.head.serv_industry + props.wf_eco.empl.serv_industry
    const wf_food = props.wf_eco.head.food_industry + props.wf_eco.empl.food_industry
    const wf = wf_food + wf_serv + wf_maint + wf_res + wf_unemployed + wf_head + wf_military

    const [emphasis_hover, emphasis_hover_set] = r.useState<null | math.Employment>(null)
    const [emphasis_popup, emphasis_popup_set] = r.useState<null | math.Employment>(null)

    const part_list = r.useMemo((): readonly EFSandBox_EmploymentShare[] => {
        return [
            {
                kind: math.Employment.Unemployed,
                share: wf_unemployed / wf,
            },
            {
                kind: math.Employment.Military,
                share: wf_military / wf,
            },
            {
                kind: math.Employment.Research,
                share: wf_res / wf,
            },
            {
                kind: math.Employment.Maintenance,
                share: wf_maint / wf,
            },
            {
                kind: math.Employment.Food,
                share: wf_food / wf,
            },
            {
                kind: math.Employment.Service,
                share: wf_serv / wf,
            },
            {
                kind: math.Employment.Management,
                share: wf_head / wf,
            },
        ]
    }, [
        wf_unemployed,
        wf_military,
        wf_res,
        wf_maint,
        wf_serv,
        wf_food,
        wf_head,
        wf,
    ])

    const el_icons = r.useMemo(() => {
        const el_list = new Array<r.ReactNode>()

        let part_index = 0
        let part_offset = 0

        // 10 icons will be drawn
        for (let i = 0; i < 10; ++i) {
            const style_list: EFSandBox_EmploymentShare[] = []

            let space = 0.1

            for (; part_index < part_list.length;) {
                const part = part_list[part_index]!
                const part_share_real = part.share - part_offset

                if (space > part_share_real) {
                    style_list.push({
                        kind: part.kind,
                        share: part_share_real / 0.1,
                    })

                    space -= part_share_real

                    part_index += 1
                    part_offset = 0

                    continue
                } else if (space === part.share) {
                    style_list.push({
                        kind: part.kind,
                        share: part_share_real / 0.1,
                    })

                    part_index += 1
                    part_offset = 0

                    break
                } else {
                    style_list.push({
                        kind: part.kind,
                        share: space / 0.1,
                    })

                    part_offset += space

                    break
                }
            }

            el_list.push(<EL_Icon
                key={`icon:${i}`}
                style_list={style_list}

                emphasis_set={emphasis_hover_set}
                emphasis={emphasis_hover ?? emphasis_popup}
            />)
        }

        return el_list
    }, [
        part_list,
        emphasis_hover,
        emphasis_hover_set,
        emphasis_popup,
    ])

    return <div className={st.root}>
        <div className={st.list}>
            {el_icons}

            <ELSandBox_Popup
                eco={props.eco}
                wf_eco={props.wf_eco}
                section_list={part_list}

                emphasis_set={emphasis_popup_set}
                emphasis={emphasis_hover ?? emphasis_popup}
            />
        </div>
    </div>
}

export default ELSandBox_PopView
