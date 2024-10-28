import { useEffect, useState } from "react";
import { SearchField } from "../../components/SearchField";
import { DataTable } from '../../components/DataTable';
import css from './Inspector.module.css';

export const Inspector = () => {
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState<number>(50);
    const [offset, setOffset] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const queryParams = new URLSearchParams();
            queryParams.set('limit', limit.toString());
            queryParams.set('offset', offset.toString());

            if (searchQuery) {
                queryParams.set('q', searchQuery);
            }

            const res = await fetch(`/api/entries?${queryParams}`)

            if (res.ok) {
                const resData = await res.json();
                console.log(resData)
                setData(resData);
            }
        }

        fetchData();
    }, [searchQuery, limit, offset]);

    return (
        <div className={css.containerWrapper}>
            <div className={css.searchContainer}>
                <SearchField onChange={(value) => setSearchQuery(value)} />
            </div>
            {data.entries.length > 0 && (
                <>
                    <DataTable initialData={data.entries} />
                </>
            )}
        </div>
    );
}