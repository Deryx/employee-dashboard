import { useState, useEffect, ChangeEvent } from 'react';
import {
    usePathname,
    useRouter,
    useSearchParams
} from 'next/navigation';

type SearchInputProps = {
    query: string;
}

const SearchInput = ({ query }: SearchInputProps) => {
    const [value, setValue] = useState<string>("");
    const router = useRouter();
    const searchParams  = useSearchParams();
    const pathname = usePathname();

    useEffect(() => {
        const trimmed = value.trim();
        if (trimmed === query) return;

        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (trimmed) {
                params.set('q', trimmed);
            } else {
                params.delete('q');
            }

            params.set('_page', '1');
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        }, 400);

        return () => clearTimeout(timer);
    }, [value, query, searchParams, pathname, router]);

    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div className="">
            <input
                type="text"
                id="query"
                name="query"
                placeholder="Search Employee..."
                value={query}
                onChange={handleQueryChange}
                className="border-[0.5px] border-gray-300 rounded-[3px] p-[5px] text-[0.4375rem] bg-[#FFFAF2]"
            />
        </div>
    );
};

export default SearchInput;