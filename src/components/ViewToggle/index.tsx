import { ViewType } from "../../types";
import clsx from "clsx";
import css from './ViewToggle.module.css';

type ViewToggleProps = {
    selected: ViewType;
    onChange: (v: ViewType) => void;
};

export const ViewToggle = ({ selected, onChange }: ViewToggleProps) => {
    return (
        <div className={css.container}>
            <div onClick={() => onChange(ViewType.Data)} className={clsx(css.option, {
                [css.current]: selected === ViewType.Data,
            })}>Datasøk</div>
            <div onClick={() => onChange(ViewType.Map)} className={clsx(css.option, {
                [css.current]: selected === ViewType.Map,
            })}>Kartvisning</div>
        </div>
    );
}