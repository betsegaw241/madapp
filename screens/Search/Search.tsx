import React, { useState } from "react";
import { Keyboard } from "react-native";
import { Formik } from "formik";
import { Box } from "../../components/Basic/Box";
import { TextInput } from "../../components/Basic/TextInput";
import PostIcon from "react-native-vector-icons/Fontisto";

interface SearchProps {
  onSearch: (searchResults: any[]) => void;
}

import {
  getDatabase,
  ref,
  query as Q,
  startAt,
  endAt,
  get,
  orderByChild,
} from "firebase/database";

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = async (searchTerm: string) => {

    try {
      const databaseRef = ref(getDatabase(), "events");
      const searchQuery = Q(
        databaseRef,
        orderByChild("title"),
        startAt(searchTerm),
        endAt(searchTerm + "\uf8ff")
      );

      const snapshot = await get(searchQuery);

      const results = snapshot.val();

      if (results) {
        const searchResults = Object.values(results);
        setResults(searchResults);
        onSearch(searchResults);
      } else {
        setResults([]);
        onSearch([]);
      }
    } catch (error) {
      console.error("Error searching from Firebase:", error);
    }
  };

  return (
    <Formik
      initialValues={{ searchTerm: "" }}
      onSubmit={(values) => {
        handleSearch(values.searchTerm);
        Keyboard.dismiss();
      }}
    >
      {(formikProps) => (
        <Box
          backgroundColor={"#fff"}
          margin={2}
          borderRadius={8}
          paddingX={2}
          borderColor={"#b1e8e8"}
          borderWidth={1}
          flexDirection={"row"}
          alignItems={"center"}
          
        >
          <PostIcon size={18} name="search" color={'#c9c9c9'}  />
          <TextInput
            borderRadius={8}
            height={50}
            backgroundColor={"white"}
            margin={1}
            fontSize={16}
            placeholder="Search here"
            marginX={10}
            // borderWidth={1}
            onFocus={() => {
              
            }}
            value={formikProps.values.searchTerm}
            onChangeText={(text) => {
              formikProps.handleChange("searchTerm")(text);
              setQuery(text);
              handleSearch(text);
            }}
            onBlur={formikProps.handleBlur("searchTerm")}
          />
        </Box>
      )}
    </Formik>
  );
};

export default Search;
