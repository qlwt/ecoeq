import * as r from "react"

export type EPPseudoButton_Props = {
    readonly disabled?: boolean
    readonly className?: string
    readonly children?: r.ReactNode
    readonly style?: r.CSSProperties

    readonly event_press?: VoidFunction
}

export const EPPseudoButton: r.FC<EPPseudoButton_Props> = props => {
    return <div
        role={`button`}
        style={props.style}
        className={props.className}
        aria-disabled={props.disabled}
        tabIndex={props.disabled ? -1 : 0}

        onClick={() => {
            if (!props.disabled) {
                props.event_press?.()
            }
        }}

        onKeyDown={ev => {
            if (!props.disabled) {
                if (ev.altKey || ev.ctrlKey || ev.metaKey || ev.shiftKey) {
                    return
                }

                switch (ev.key.toLowerCase()) {
                    case "enter":
                    case " ": {
                        props.event_press?.()

                        break
                    }
                }
            }
        }}
    >
        {props.children}
    </div>
}

export default EPPseudoButton
