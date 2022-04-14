import { Box, Container, Typography } from '@mui/material';
import martiniImg from './images/martini.png';
import './App.css';
import { useState } from 'react';
import SearchForm from './components/SearchForm';
import { DrinkType, SearchResult } from './types';
import SearchResults from './components/SearchResults';
import NullCoctail from './components/NullCoctail';

const APIurl = process.env.REACT_APP_COCTAIL_API

function App() {
  const [searchResults, setSearchResults] = useState<SearchResult[] | DrinkType[]>([]);
  const [badSearchTearm, setBadSearchTearm] = useState("");


  const callSearch = async (tearm: string, byName: boolean) => {
    const endPoint = byName ? "search.php?s=" : "filter.php?i=";

    setBadSearchTearm("");
    setSearchResults([]); // clear out any old results

    try {
      const res = await fetch(APIurl + endPoint + tearm);
      const data = await res.json();

      if (!!data.drinks.length) {
        setSearchResults(data.drinks);
      }
    } catch (error) {
      setBadSearchTearm(tearm);
    }
  }

  return (
    <Container
      maxWidth='md'
      sx={{
        backgroundImage: `url(${martiniImg})`, minHeight: '100vh', backgroundRepeat: 'no-repeat',
        backgroundSize: { xs: 'unset', md: 'contain' }, backgroundPosition: 'top', position: 'relative'
      }}>
      <Box width='100%'>
        <Box display='flex' flexDirection='column' height='100vh' justifyContent='space-around'>
          <Box marginLeft={['0px', '80px']} paddingTop={['60px', '20%']}>
            <Typography fontSize='65px' sx={{ color: '#9A9A9A' }} fontWeight='lighter'>
              Have
            </Typography>
            <Typography fontWeight='lighter' fontSize='48px' sx={{ color: '#9A9A9A' }} fontStyle='italic'>
              &nbsp;&nbsp;a
            </Typography>
            <Typography fontSize='120px' fontStyle='italic' sx={{ color: 'white' }} fontFamily='Bodoni Moda'>
              drink
            </Typography>
          </Box>
          <Box>
            <SearchForm callback={callSearch} />
          </Box>
        </Box>
        <Box width='100%' sx={{ marginTop: '50px' }}>
          {badSearchTearm.length
            ? <NullCoctail searchString={badSearchTearm} />
            : <SearchResults coctails={searchResults} />}
        </Box>
      </Box>
    </Container>
  );
}

export default App;
