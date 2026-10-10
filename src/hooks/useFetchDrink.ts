import { useEffect, useState } from "react";
import { DrinkType } from "../types";

const APIurl = process.env.REACT_APP_COCTAIL_API

const useFetchDrink = (id: number) => {
  const [drinkInfo, setDrink] = useState<DrinkType>();
  const [fetchError, setFetchError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    const fetchCoctailInfo = async () => {
      setLoading(true);

      try {
        const result = await fetch(`${APIurl}lookup.php?i=${id}`);
        const data = await result.json();

        setDrink(data.drinks[0]);
      } catch (error) {
        console.log(error);
        setFetchError("Error getting your drink");
      } finally {
        setLoading(false);
      }
    }

    fetchCoctailInfo();
  });

  return { drinkInfo, fetchError, loading}

}

export default useFetchDrink;