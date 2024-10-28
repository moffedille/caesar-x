import css from './SearchField.module.css';

type SearchFieldProps = {
    onChange: (value) => void;    
};

export const SearchField = ({ onChange }: SearchFieldProps) => {
    return <input
        type="search"
        placeholder="Skriv inn dine søketekst..."
        className={css.searchField}
        onChange={(event) => onChange(event.target.value)}
    />
};