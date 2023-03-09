import { Input } from '@mantine/core';
import SearchIcon from '@mui/icons-material/Search';
function Search() {
    return (
        <Input
        icon={<SearchIcon/>}
        placeholder="Look for posts"
      />
    );
}

export default Search;