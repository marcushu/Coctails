import { Box, Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { DrinkType, SearchResult } from "../types";
import CoctailRecipe from "./CoctailRecipe";

interface DrindThumbnailProps {
  drink: SearchResult | DrinkType
}

/**
 * This will either display the thumb/list-item for a coctail,
 * or it's complete recipe with a full size image.
 * @param drink 
 */
const DrindThumbnail: FunctionComponent<DrindThumbnailProps> = ({ drink }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      {showDetails
        ? <CoctailRecipe id={drink.idDrink} hideMe={setShowDetails} />
        : <Box display='flex' alignItems='flex-end' pb={4} pt={6}
          borderBottom='solid 1px #d1c5a55e' onClick={() => setShowDetails(true)}
          sx={{ transition: 'transform 0.5s', ":hover": { cursor: 'pointer', transform: 'scale(1.03)' } }}>
          <Box sx={{
            backgroundImage: `url(${drink.strDrinkThumb}/preview)`,
            backgroundSize: 'cover', width: '100px', height: '100px',
            borderRadius: '0px 30px 0px 0px'
          }}>
            <Box height='100%' sx={{ background: 'linear-gradient(89deg, #000000ae, #0000001f, transparent)' }} />
          </Box>
          <Box>
            <Typography color='#B8B8B8' fontSize='20px' fontWeight='light' pl={2}>
              {drink.strDrink}
            </Typography>
          </Box>
        </Box>}
    </>
  );
}

export default DrindThumbnail;