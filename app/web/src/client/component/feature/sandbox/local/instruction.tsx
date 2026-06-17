import st from "#client/component/feature/sandbox/style/instruction.module.scss"
import cl from "classnames"
import * as r from "react"

const E_Kind = [
    "Food",
    "Serv",
    "Empl",
    "Head",
    "Res",
    "Mil",
    "Company"
] as const

type E_Props = {
    readonly children?: r.ReactNode
}

const E: Record<typeof E_Kind[number], r.FC<E_Props>> = {} as any

for (const kind of E_Kind) {
    E[kind] = (props) => {
        return <span className={cl(st.emph, st[`_${kind.toLowerCase()}`])}>
            {props.children}
        </span>
    }
}

export type ELSandBox__Instruction_Props = {
}

export const ELSandBox_Instruction: r.FC<ELSandBox__Instruction_Props> = props => {
    return <main className={st.root}>
        <p>
            Website provides a simulation of <b>Employment Distribution</b> under different levels of <b>Monetary Redistribution</b>.
            It is important to note, that it is not based on real Economic Science
        </p>

        <p>
        </p>

        <h3>
            Assumptions Made:
        </h3>

        <ul>
            <li>
                <b>Population</b>, that is divided into <E.Empl>Workers</E.Empl> and <E.Head>Management</E.Head>
            </li>

            <li>
                Each <b>Pop</b> consumes up to 1 <E.Food>Food</E.Food> and 15 <E.Serv>Services</E.Serv><br />
            </li>

            <li>
                Each <E.Empl>Worker</E.Empl> can either work on:&nbsp;
                <E.Food>Food</E.Food>, <E.Serv>Services</E.Serv>, <E.Res>Research</E.Res> or <E.Mil>Military</E.Mil>
            </li>

            <li>
                <E.Mil>Military</E.Mil> does not do anything and symbolises <b>Supporting Unproductive Jobs</b>
            </li>

            <li>
                The Fruits of <b>Production</b> are distributed based on the level of <E.Company>Monopoly</E.Company>
            </li>

            <li>
                <E.Res>Research</E.Res> increases productivity of <E.Empl>Workers</E.Empl>,
                but it also decays and therefore requires continuous <E.Res>Investments</E.Res>
            </li>

            <li>
                Pops will be more willing to <E.Res>Invest</E.Res> into <E.Company>Monopolised Economy</E.Company>,
                as profit margins are bigger
            </li>

            <li>
                Management is more willing to <E.Res>Invest</E.Res> generally.
                <br /> Workers are expected to spend all money on <b>Consumption</b> initially,
                but start <E.Res>Investing</E.Res> as they approach a Middle Class
                <br /> Fulfilled <b>Pops</b> do not <E.Res>Invest</E.Res> - they just enjoy life
            </li>
        </ul>

        <p>
            Overall Simulation surprisingly provides some interesting Effects even from very little Assumptions. Inculding but not limited to:

            <ul>
                <li>
                    Decreasing <E.Company>Monopoly</E.Company> might discourage population from <E.Res>Investing</E.Res> and lead to even lower standart of living
                </li>

                <li>
                    <E.Company>OverMonopolising</E.Company> will extract money from
                    &nbsp;<E.Empl>Workers</E.Empl> and plummet their <E.Res>Investments</E.Res> (as they now struggle to afford <E.Food>Essentials</E.Food>)
                    <br /><E.Head>Management</E.Head> therefore would need to carry the burden of
                    &nbsp;<E.Res>Investments</E.Res> themselves, which will lower their <b>Standart of Living</b>
                    <br />Ironically the only way for <E.Head>Management</E.Head> to reach maximum <b>SOL</b> is to allow workers to have <b>Money</b>,
                    so they are the ones taking the <E.Res>Research</E.Res> burden
                </li>

                <li>
                    Levels of <E.Company>Monopoly</E.Company> perform differently based on the level of <E.Mil>Militarisation</E.Mil>
                </li>

                <li>
                    Equilibrium of the System depends on with which Level of <E.Res>Research</E.Res> you are entering it
                    <br />You might want to lift your <E.Empl>Workers</E.Empl> to Middle Class first, so they have money to <E.Res>Invest</E.Res>,
                    and only later - up the level of <E.Company>Monopoly</E.Company> to incentivise doing it
                </li>
            </ul>
        </p>
    </main>
}

export default ELSandBox_Instruction
