// Was useful on earlier concepts, at current state, I dont really see the usage for it
//
// import st from "#client/component/feature/sandbox/style/graph.module.scss"
// import { ecodef_new } from "#src/client/util/ecodef/new"
// import { gv } from "@ecoeq/gstate"
// import * as math from "@ecoeq/math"
// import * as r from "react"
//
// type EcoCache = {
//     readonly eco: math.EcoDef
//     readonly wf_eco: math.WFEco
//
//     readonly production_food: number
//     readonly production_serv: number
// }
//
// type Line = {
//     readonly color_main: string
//     readonly color_dash: string
//     readonly point_list: number[]
// }
//
// const ecocache_new = function(
//     point: gv.GVSession_Node_Point, cacher_eco: WeakMap<gv.GVSession_Node_State, EcoCache>
// ): EcoCache {
//     let cache = cacher_eco.get(point.state)
//
//     if (!cache) {
//         const eco = ecodef_new(point.state)
//         const wf_eco = math.wf_new_eco(eco)
//
//         cache = {
//             eco,
//             wf_eco,
//
//             production_food: (wf_eco.empl.food_industry + wf_eco.head.food_industry) * math.output_new_food(eco),
//             production_serv: (wf_eco.empl.serv_industry + wf_eco.head.serv_industry) * math.output_new_serv(eco),
//         }
//
//         cacher_eco.set(point.state, cache)
//     }
//
//     return cache
// }
//
// type PaintData = {
//     readonly width: number
//     readonly width_offset: number
//     readonly height: number
//     readonly height_offset: number
// }
//
// type GraphData = {
//     readonly min: number
//     readonly max: number
//     readonly range: number
//     readonly line_list: readonly Line[]
// }
//
// const path_new = function(paint_data: PaintData, graph_data: GraphData, point_list: readonly number[]): string {
//     if (point_list.length === 0) {
//         return `0,${paint_data.height / 2}`
//     }
//
//     return point_list.map((point, index) => {
//         const x = (
//             + paint_data.width_offset
//             + index / (point_list.length - 1) * paint_data.width
//         )
//
//         const y = (
//             + paint_data.height_offset
//             + paint_data.height * (
//                 1 - (point) / graph_data.max
//             )
//         )
//
//         return `${x},${y}`
//     }).join(" ")
// }
//
// const graph_padding = {
//     top: 20,
//     right: 20,
//     bottom: 40,
//     left: 60,
// }
//
// export type ELSandBox__Graph_Props = {
//     readonly width: number
//     readonly height: number
//     readonly session_node: gv.GVSession_Node
// }
//
// export const ELSandBox_Graph: r.FC<ELSandBox__Graph_Props> = props => {
//     const cacher_eco = r.useMemo(() => new WeakMap<gv.GVSession_Node_State, EcoCache>(), [])
//
//     const paint_data: PaintData = r.useMemo(() => {
//         return {
//             width: props.width - graph_padding.left - graph_padding.right,
//             width_offset: graph_padding.left,
//             height: props.height - graph_padding.top - graph_padding.bottom,
//             height_offset: graph_padding.top,
//         }
//     }, [props.width, props.height])
//
//     const graph_data: GraphData = r.useMemo(() => {
//         let min = Number.POSITIVE_INFINITY
//         let max = Number.NEGATIVE_INFINITY
//
//         const line_list = [
//             {
//                 point_list: new Array<number>(),
//                 color_main: "rgb(115, 178, 95)",
//                 color_dash: props.session_node.bgc,
//             } satisfies Line,
//             {
//                 point_list: new Array<number>(),
//                 color_main: "rgb(168, 137, 210)",
//                 color_dash: props.session_node.bgc,
//             } satisfies Line,
//         ] as const
//
//         for (const point of props.session_node.graph) {
//             const ecocache = ecocache_new(point, cacher_eco)
//
//             line_list[0].point_list.push(ecocache.production_food)
//             line_list[1].point_list.push(ecocache.production_serv)
//
//             max = Math.max(max, ecocache.production_food, ecocache.production_serv)
//             min = Math.min(min, ecocache.production_food, ecocache.production_serv)
//         }
//
//         return {
//             min,
//             max,
//             line_list,
//             range: Math.max(1, max - min),
//         } as const
//     }, [props.session_node])
//
//     const axis_x_marks = r.useMemo(() => {
//         const line = graph_data.line_list[0]
//
//         if (!line) {
//             return []
//         }
//
//         const marks = new Array<number>()
//         const step = Math.ceil(0.1 * line.point_list.length)
//
//         for (let i = 0; i < line.point_list.length; i += step) {
//             marks.push(i)
//         }
//
//         if ((line.point_list.length - 1) % step !== 0) {
//             marks.push(line.point_list.length - 1)
//         }
//
//         return marks
//     }, [graph_data])
//
//     const axis_y_marks = r.useMemo(() => {
//         return Array.from({ length: 9, }, (_, i) => {
//             if (graph_data.max < 1e-8) {
//                 return (i + 1) / 10
//             }
//
//             return graph_data.max / 2 + (0.5 + ((i + 1) - 9) / 9) * graph_data.max
//         })
//     }, [graph_data])
//
//     if (props.session_node.graph.length < 2) {
//         return <div className={st.root}>
//             <svg className={st.graph} viewBox={`0 0 ${props.width} ${props.height}`} />
//         </div>
//     }
//
//     return <div className={st.root}>
//         <svg className={st.graph} viewBox={`0 0 ${props.width} ${props.height}`}>
//             {axis_y_marks.map((point) => {
//                 const y = (
//                     + paint_data.height_offset
//                     + paint_data.height * (
//                         1 - point / graph_data.max
//                     )
//                 )
//
//                 return (
//                     <g key={point}>
//                         <line
//                             x1={graph_padding.left}
//                             x2={props.width - graph_padding.right}
//                             y1={y}
//                             y2={y}
//                             stroke="#cccccc"
//                         />
//
//                         <text
//                             x={graph_padding.left - 5}
//                             y={y}
//                             alignmentBaseline="central"
//                             textAnchor="end"
//                             fontSize={8}
//                             fill="#666666"
//                         >
//                             {math.float_new_round(point, Math.max(0, 2 - Math.trunc(Math.log10(point))))}
//                         </text>
//                     </g>
//                 );
//             })}
//
//             {axis_x_marks.map((index) => {
//                 const size = graph_data.line_list[0]!.point_list.length
//
//                 const x = (
//                     + paint_data.width_offset
//                     + index / (size - 1) * paint_data.width
//                 )
//
//                 return (
//                     <g key={index}>
//                         <line
//                             x1={x}
//                             x2={x}
//                             y1={graph_padding.top}
//                             y2={props.height - graph_padding.bottom}
//                             stroke="#cccccc"
//                         />
//
//                         <text
//                             x={x}
//                             y={props.height - 25}
//                             textAnchor="middle"
//                             fontSize={8}
//                             fill="#666666"
//                         >
//                             {props.session_node.graph_offset + index}
//                         </text>
//                     </g>
//                 );
//             })}
//
//             <line
//                 x1={graph_padding.left}
//                 x2={graph_padding.left}
//                 y1={graph_padding.top}
//                 y2={props.height - graph_padding.bottom}
//                 stroke="#9ca3af"
//                 strokeWidth={2}
//             />
//
//             <line
//                 x1={graph_padding.left}
//                 x2={props.width - graph_padding.right}
//                 y1={props.height - graph_padding.bottom}
//                 y2={props.height - graph_padding.bottom}
//                 stroke="#9ca3af"
//                 strokeWidth={2}
//             />
//
//             {graph_data.line_list.map((line, index) => {
//                 const line_path = path_new(paint_data, graph_data, line.point_list)
//
//                 return <g key={`${props.session_node.id}::${index}`}>
//                     <polyline
//                         fill={`none`}
//                         points={line_path}
//                         stroke={line.color_main}
//                         strokeWidth={2}
//                         strokeDasharray={`16 4`}
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                     />
//
//                     <polyline
//                         fill={`none`}
//                         points={line_path}
//                         stroke={line.color_dash}
//                         strokeWidth={2}
//                         strokeDashoffset={`-16`}
//                         strokeDasharray={`4 16`}
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                     />
//                 </g>
//             })}
//         </svg>
//     </div>
// }
//
// export default ELSandBox_Graph
