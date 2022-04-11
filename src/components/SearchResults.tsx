import { Box } from "@mui/material";
import { FunctionComponent, useEffect, useRef } from "react";
import { DrinkType, SearchResult } from "../types";
import CoctailRecipe from "./CoctailRecipe";
import DrindThumbnail from "./DrinkThumbnail";

interface SearchResultsProps {
  coctails: SearchResult[] | DrinkType[]
}

/**
 * The result of a search: either a list, or a single drink.
 * @param coctails a list of coctails 
 */
const SearchResults: FunctionComponent<SearchResultsProps> = ({ coctails }) => {
  const listRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if(listRef.current)
    listRef.current.scrollIntoView({behavior: "smooth", block: "start"});
  }, [coctails]);
  
  return (
    <Box maxWidth='700px' margin='auto' pt={3} ref={listRef}>
      {coctails.length === 1 
      ? <CoctailRecipe id={coctails[0].idDrink} hideMe={null}/>
      : coctails.map(drink => <DrindThumbnail key={drink.idDrink} drink={drink} />)} 
    </Box>
  );
}

export default SearchResults;