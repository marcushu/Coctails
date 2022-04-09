import { FunctionComponent, useEffect, useRef } from "react";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Box, Typography } from "@mui/material";

interface NullCoctailProps {
  searchString: string
}

const NullCoctail: FunctionComponent<NullCoctailProps> = ({ searchString }) => {
  const thisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(thisRef.current)
      thisRef.current.scrollIntoView({behavior: "smooth", block: "start"});
  }, []);
  
  return (
    <Box textAlign='center' py={5} ref={thisRef}>
      <SentimentVeryDissatisfiedIcon fontSize="large" sx={{ color: '#ff5959', verticalAlign: 'bottom' }} />
      <Typography variant="h5" color="#ff5959" display='inline'>&nbsp;
        Nothing found with {searchString}
      </Typography>
    </Box>
  );
}

export default NullCoctail;