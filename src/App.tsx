import { Box, Container, Typography } from '@mui/material';
import martiniImg from './images/martini.png';
import './App.css';
import { useState } from 'react';
import SearchForm from './components/SearchForm';
import { DrinkType, SearchResult } from './types';
import SearchResults from './components/SearchResults';

const APIurl = process.env.REACT_APP_COCTAIL_API

function App() {
  const [searchResults, setSearchResults] = useState<SearchResult[] | DrinkType[]>([]);

  const callSearch = (tearm: string, byName: boolean) => {
    const endPoint = byName ? "search.php?s=" : "filter.php?i=";

    fetch(APIurl + endPoint + tearm)
      .then(res => res.json())
      .then(data => setSearchResults(data.drinks));
  }

  return (
    <Container
      maxWidth='md'
      sx={{
        backgroundImage: `url(${martiniImg})`, minHeight: '100vh', backgroundRepeat: 'no-repeat',
        backgroundSize: { xs: 'unset', md: 'contain' }, backgroundPosition: 'top', position: 'relative'
      }}>
      <Box position='absolute' top='20%' marginLeft={['20px', '80px']}>
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
      <Box position='absolute' top={['67%', '90%']} width='90%' pb={5}>
        <SearchForm callback={callSearch} />
        {!!searchResults && <SearchResults coctails={searchResults} />}
      </Box>
    </Container>
  );
}

export default App;
