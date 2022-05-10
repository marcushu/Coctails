import { Box, Pagination } from "@mui/material";
import { FunctionComponent, useEffect, useRef, useState } from "react";
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
  const [page, setPage] = useState(1);
  const RESULTSPERPAGE = 10;


  useEffect(() => {
    if (listRef.current)
      listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

    setPage(1);
  }, [coctails]);


  const changeThePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);

    if (listRef.current)
      listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const coctailSlice = coctails.slice((page - 1) * RESULTSPERPAGE, page * RESULTSPERPAGE);
  const pageCount = Math.ceil(coctails.length / RESULTSPERPAGE);


  return (
    <Box pb={5}>
      <Box
        maxWidth='700px'
        margin='auto'
        pt={1}
        ref={listRef}>
        {coctails.length === 1
          ? <CoctailRecipe id={coctails[0].idDrink} hideMe={null} />
          : coctailSlice.map(drink => <DrindThumbnail key={drink.idDrink} drink={drink} />)}
      </Box>
      {coctails.length > RESULTSPERPAGE &&
        <Box py={5} width='fit-content' margin='auto'>
          <Pagination
            color="secondary"
            variant="outlined"
            count={pageCount}
            shape='rounded'
            page={page}
            onChange={changeThePage}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#cbcbcb"
              }
            }} />
        </Box>}
    </Box>
  );
}

export default SearchResults;