"use client";
import { Input } from "@/components/ui/input";
import { Search as SearchShadcn } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
export default function Search({
    placeholder = "Search ...",
}: {
    placeholder?: string;
}) {
    const searchParams = useSearchParams(); // gets the current URL search parameters, which allows you to access the query parameter.
    const pathname = usePathname(); // gets the current URL path.
    const { replace, push } = useRouter(); // gets the router's replace method , which allows you to update the URL.

    const handleSearch = useDebouncedCallback((term) => {
        // translates the input into a URL-friendly format.
        const params = new URLSearchParams(searchParams.toString());
        if (term) {
            // sets the query parameter to the user's search term.
            params.set("query", term);
        } else {
            // removes the query parameter if the user clears the search input.
            params.delete("query");
        }
        // updates the URL with the user's search data.
        //  For example, /products?query=cl if the user searches for "Clo".
        replace(`/products?${params.toString()}`);
    }, 300);

    return (
        <div className="relative ml-auto flex-1  md:grow-0">
            <SearchShadcn className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get("query")?.toString()} // Keeping the URL and input in sync
                className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[336px]"
            />
        </div>
    );
}
