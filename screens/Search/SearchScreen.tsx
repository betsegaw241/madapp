import React, { useState } from "react";
import { FlatList, TouchableOpacity, Text } from "react-native";
import Search from "./Search";
import HomeComponent from "../Home/component/Home";

const SearchScreen = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results:any) => {
    // Update the state with the search results
    setSearchResults(results);
    // Do something else with the search results if needed
  };

  return (
    <>
      <Search onSearch={handleSearchResults} />
      {/* Render the search results in a FlatList */}
      <HomeComponent data={searchResults} />
    </>
  );
};

export default SearchScreen;
