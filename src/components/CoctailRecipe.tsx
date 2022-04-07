import { Box, Grid, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { DrinkType } from "../types";

const APIurl = process.env.REACT_APP_COCTAIL_API

interface CoctailRecipeProps {
  id: number
  hideMe: React.Dispatch<React.SetStateAction<boolean>>
}

const CoctailRecipe: FunctionComponent<CoctailRecipeProps> = ({ id, hideMe }) => {
  const [drinkInfo, setDrinkInfo] = useState<DrinkType>();

  useEffect(() => {
    const fetchCoctailInfo = async () => {
      try {
        const result = await fetch(`${APIurl}lookup.php?i=${id}`);
        const data = await result.json();

        setDrinkInfo(data.drinks[0]);
      } catch (error) {
        console.log(error);
        alert('Error collecting information about this coctail.');
      }
    }

    fetchCoctailInfo();
  }, [id]);

  const getIngredients = () => {
    const LIMIT = 15;
    let ingList = [];

    for (let i = 0; i < LIMIT; i++) {
      if (drinkInfo !== undefined) {
        if (drinkInfo[('strIngredient' + i) as keyof DrinkType]) {  //FIXME Yuck!
          const quantity = drinkInfo[('strMeasure' + i) as keyof DrinkType];
          const measureAndIngredient = (quantity ? quantity + " " : "") + drinkInfo[('strIngredient' + i) as keyof DrinkType];

          ingList.push(measureAndIngredient);
        }
      }
    };

    return ingList;
  }

  const capitalized = () => {
    if (drinkInfo?.strInstructions)
      return <>
        <Typography sx={{ display: 'inline' }} color='#FFF3DC' fontSize='24px'>
          {(drinkInfo?.strInstructions)?.slice(0, 1)}
        </Typography>
        <Typography sx={{ display: 'inline' }} color='#bdbdbd' fontSize='16px' fontWeight='light'>
          {(drinkInfo?.strInstructions)?.slice(1)}
        </Typography>
      </>
  }

  return (
    <Grid container onClick={() => hideMe(false)} my={5}
      sx={{ ":hover": { cursor: 'pointer' } }}>
      <Grid item xs={12} sm={4} minWidth='180px' minHeight='180px'>
        {drinkInfo?.strDrinkThumb &&
          <img width='100%' src={drinkInfo?.strDrinkThumb} alt="drikimage"
            style={{ borderRadius: '40px 0px 0px' }} />}
      </Grid>
      <Grid item xs={12} sm={8} pl={[0, 2]} position='relative'>
        <Typography color='#938E8E' fontFamily='Bodoni Moda' fontStyle='italic' fontSize='40px'>
          {drinkInfo?.strDrink}
        </Typography>
        <Typography color='white' fontSize='12px' fontWeight='light'>
          {drinkInfo?.strGlass}
        </Typography>
        <Box sx={{ bottom: '5px', position: ['unset', 'absolute'], paddingTop: ['20px', '0px'] }}>
          {getIngredients().map(ing =>
            <Typography key={ing} fontStyle='italic' fontSize='14px' fontWeight='bold' color='#FFF3DC'>
              {ing}
            </Typography>)}
        </Box>
      </Grid>
      <Grid item xs={12} pt={2}>
        {capitalized()}
      </Grid>
    </Grid>
  );
}

export default CoctailRecipe;