import { Box, Button, TextField, Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";

interface SearchFormProps {
  callback: (tearm: string, byName: boolean) => void
}

const SearchForm: FunctionComponent<SearchFormProps> = ({ callback }) => {
  const [searchByNameTxt, setSearchByNameTxt] = useState("");
  const [ingredientTxt, setingredientTxt] = useState("");

  const callSearch = () => {
    if (!searchByNameTxt && !ingredientTxt) {
      alert("Fill in a name or an ingredeint")
    } else if (searchByNameTxt && ingredientTxt) {
      alert('Fill in EITHER a coctail name OR an ingredient')
    } else {
      callback(searchByNameTxt! + ingredientTxt, !!searchByNameTxt)
    }
  }

  return (
    <Box
      margin='auto'
      display='flex'
      flexDirection={['column', 'row']}
      alignItems='center'
      justifyContent='space-between'
      maxWidth='640px'>
      <TextField
        variant="standard"
        id="coctailName"
        placeholder="coctail name"
        size="small"
        fullWidth={true}
        value={searchByNameTxt}
        onMouseDown={() => setingredientTxt("")}
        onChange={e => setSearchByNameTxt(e.target.value)}
        sx={{
          input: { color: 'white' }, maxWidth: ['1000', '210px'],
          borderBottom: '1px solid white'
        }}
        data-testid="coctailname" />
      <Typography color='white' fontWeight='bold' pt={[3, 'unset']}> ~ or ~ </Typography>
      <TextField
        variant="standard"
        id="ingredient"
        placeholder="an ingredient"
        size="small"
        fullWidth={true}
        value={ingredientTxt}
        onMouseDown={() => setSearchByNameTxt("")}
        onChange={e => setingredientTxt(e.target.value)}
        sx={{
          input: { color: 'white' }, maxWidth: ['1000px', '210px'],
          borderBottom: '1px solid white'
        }}
        data-testid="coctailingredient" />
      <Button
        onClick={callSearch}
        fullWidth={true}
        variant='contained'
        sx={{
          height: '40px', backgroundColor: '#b69c71',
          color: 'black', maxWidth: ['1000px', '80px'], marginTop: ['20px', '0px']
        }}>
        find
      </Button>
    </Box>
  );
}

export default SearchForm;