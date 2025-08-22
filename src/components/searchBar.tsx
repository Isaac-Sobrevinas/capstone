interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <input type="text" placeholder="Search ..." className="border py-1 px-2 w-full border-gray-500" onChange={handleSearch} />
    )
}

export default SearchBar;