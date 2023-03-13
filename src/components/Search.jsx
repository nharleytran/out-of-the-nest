import { Input } from "@mantine/core";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
function Search(props) {
  const { query, setQuery } = props;

  const handleOnChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Input
      icon={<SearchIcon />}
      placeholder="Look for posts"
      value={query}
      onChange={handleOnChange}
    />
  );
}

export default Search;
