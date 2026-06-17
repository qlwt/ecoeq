import st from "#client/component/feature/sandbox/style/header.module.scss"
import EPPseudoButton from "#src/client/component/primitive/pseudobtn/element"
import { ecodef_new } from "#src/client/util/ecodef/new"
import { gv } from "@ecoeq/gstate"
import * as math from "@ecoeq/math"
import * as fas_serv from "@fortawesome/free-solid-svg-icons/faGem"
import * as fas_company from "@fortawesome/free-solid-svg-icons/faIndustry"
import * as fas_food from "@fortawesome/free-solid-svg-icons/faSeedling"
import * as fas_trash from "@fortawesome/free-solid-svg-icons/faTrash"
import * as faw from "@fortawesome/react-fontawesome"
import * as asr from "@qyu/atom-state-react"
import * as rfl from "@qyu/reactcmp-flow-control"
import cl from "classnames"
import * as r from "react"
import * as uuid from "uuid"

type EL__NavNode_Props = {
    readonly status_active: boolean
    readonly session_node: gv.GVSession_Node
    readonly event_press?: VoidFunction
}

const EL_NavNode: r.FC<EL__NavNode_Props> = props => {
    const { dispatch } = asr.useStore()

    const ref_inbgc = r.useRef<HTMLInputElement | null>(null)
    const ref_inname = r.useRef<HTMLInputElement | null>(null)

    const eco = r.useMemo(() => {
        return ecodef_new(props.session_node.state)
    }, [props.session_node.state])

    const wf_eco = r.useMemo(() => {
        return math.wf_new_eco(eco)
    }, [eco])

    const wf_food = wf_eco.head.food_industry + wf_eco.empl.food_industry
    const wf_serv = wf_eco.head.serv_industry + wf_eco.empl.serv_industry

    const prod_food = wf_food * math.output_new_food(eco)
    const prod_serv = wf_serv * math.output_new_serv(eco)

    const view_prod_food = Math.round(prod_food)
    const view_prod_serv = Math.round(prod_serv)

    const [status_nameedit, status_nameedit_set] = r.useState(false)

    r.useEffect(() => {
        if (status_nameedit) {
            ref_inname.current?.focus()
        }
    }, [status_nameedit])

    return <EPPseudoButton
        disabled={props.status_active}
        event_press={props.event_press}
        className={cl(st.nav__node, st.nav__eco, props.status_active && st._active)}
    >
        <div className={st.nav__identity}>
            <EPPseudoButton
                className={st.nav__bgc}
                disabled={!props.status_active}

                style={{
                    [`--efsandbox__session_bgc` as any]: props.session_node.bgc,
                }}

                event_press={() => {
                    ref_inbgc.current?.click()
                }}
            >
                <input
                    type="color"
                    ref={ref_inbgc}
                    className={st.input_hidden}
                    value={props.session_node.bgc}

                    onChange={ev => {
                        dispatch(gv.session.act.patch({
                            index: {
                                id: props.session_node.id,
                            },

                            body: {
                                bgc: ev.target.value,
                            },
                        }))
                    }}
                />
            </EPPseudoButton>

            <div className={st.nav__info__top}>
                <EPPseudoButton
                    className={st.nav__name}
                    disabled={!(props.status_active && !status_nameedit)}

                    event_press={() => {
                        status_nameedit_set(true)
                    }}
                >
                    <rfl.CmpIf value={!(status_nameedit && props.status_active)}>
                        <div className={st.nav__name__text}>
                            {props.session_node.name}
                        </div>
                    </rfl.CmpIf>

                    <rfl.CmpIf value={(status_nameedit && props.status_active)}>
                        <input
                            type={`text`}
                            ref={ref_inname}
                            className={st.nav__name__input}
                            value={props.session_node.name}

                            onChange={ev => {
                                dispatch(gv.session.act.patch({
                                    index: {
                                        id: props.session_node.id,
                                    },

                                    body: {
                                        name: ev.target.value,
                                    },
                                }))
                            }}

                            onBlur={() => {
                                status_nameedit_set(false)
                            }}

                            onKeyDown={ev => {
                                if (ev.altKey || ev.ctrlKey || ev.metaKey || ev.shiftKey) {
                                    return
                                }

                                switch (ev.key.toLowerCase()) {
                                    case "enter":
                                    case "escape": {
                                        status_nameedit_set(false)

                                        break
                                    }
                                }
                            }}
                        />
                    </rfl.CmpIf>
                </EPPseudoButton>

                <div className={st.nav__info__acts}>
                    <EPPseudoButton
                        disabled={!props.status_active}
                        className={cl(st.nav__info__act, st._style_delete)}

                        event_press={() => {
                            dispatch(gv.session.act.delete({
                                index_list: [{ id: props.session_node.id, }],
                            }))
                        }}
                    >
                        <faw.FontAwesomeIcon icon={fas_trash.faTrash} />
                    </EPPseudoButton>
                </div>
            </div>

            <div className={st.nav__info}>
                <div className={st.nav__info__field}>
                    <div className={cl(st.nav__info__icon, st._style_monopoly)}>
                        <faw.FontAwesomeIcon icon={fas_company.faIndustry} />
                    </div>

                    <div className={st.nav__info__text}>
                        {props.session_node.state.monopoly}%
                    </div>
                </div>

                <div className={st.nav__info__field}>
                    <div className={cl(st.nav__info__icon, st._style_food)}>
                        <faw.FontAwesomeIcon icon={fas_food.faSeedling} />
                    </div>

                    <div className={st.nav__info__text}>
                        {view_prod_food}
                    </div>
                </div>

                <div className={st.nav__info__field}>
                    <div className={cl(st.nav__info__icon, st._style_serv)}>
                        <faw.FontAwesomeIcon icon={fas_serv.faGem} />
                    </div>

                    <div className={st.nav__info__text}>
                        {view_prod_serv}
                    </div>
                </div>
            </div>
        </div>
    </EPPseudoButton>
}

type EL__NavAct_Props = {
    readonly children?: r.ReactNode

    readonly event_press?: VoidFunction
}

const EL_NavAct: r.FC<EL__NavAct_Props> = props => {
    return <button
        onClick={props.event_press}
        className={cl(st.nav__node, st.nav__act)}
    >
        {props.children}
    </button>
}

export type ELSandBox__Header_Props = {
    readonly session_list: readonly gv.GVSession_Node[]
    readonly session_active: gv.GVSession_Node | null
    readonly session_selection_set: (session_selection: gv.GVSession_Index) => void
}

export const ELSandBox_Header: r.FC<ELSandBox__Header_Props> = props => {
    const { dispatch } = asr.useStore()

    return <header className={st.root}>
        <nav className={st.nav}>
            <EL_NavAct
                event_press={() => {
                    const node_index: gv.GVSession_Index = {
                        id: uuid.v7()
                    }

                    dispatch(gv.session.act.post({ index: node_index, }))
                    props.session_selection_set(node_index)
                }}
            >
                Create New Session
            </EL_NavAct>

            <rfl.CmpLoop data={props.session_list} reverse>
                {session_node => {
                    return <EL_NavNode
                        key={session_node.id}
                        session_node={session_node}
                        status_active={session_node.id === props.session_active?.id}

                        event_press={() => {
                            props.session_selection_set({ id: session_node.id })
                        }}
                    />
                }}
            </rfl.CmpLoop>
        </nav>
    </header>
}

export default ELSandBox_Header
