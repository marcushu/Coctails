import { FunctionComponent } from "react";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Box, Typography } from "@mui/material";

interface NullCoctailProps {
  searchString: string
}

const NullCoctail: FunctionComponent<NullCoctailProps> = ({ searchString }) => {
  return (
    <Box textAlign='center' py={5}>
      <SentimentVeryDissatisfiedIcon fontSize="large" sx={{ color: '#ff5959', verticalAlign: 'bottom' }} />
      <Typography variant="h5" color="#ff5959" display='inline'>&nbsp;
        Nothing found with {searchString}
      </Typography>
    </Box>
  );
}

export default NullCoctail;