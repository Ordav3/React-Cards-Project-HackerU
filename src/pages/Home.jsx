import { Container, Typography, CircularProgress, Grid } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import useQueryParams from "../hooks/useQueryParams";

const HomePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsState, setCardsState] = useState(null);
  let qparams = useQueryParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/cards/cards");
        filterFunc(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);

  const filterFunc = (data) => {
    if (!originalCardsArr && !data) {
      return;
    }
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }
    if (!originalCardsArr && data) {
      setOriginalCardsArr(data);
      console.log("!originalCardsArr && data");
      setCardsState(
        data.filter(
          (card) =>
            card.title.startsWith(filter) || card.bizNumber.startsWith(filter)
        )
      );
      return;
    }
    if (originalCardsArr) {
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsState(
        newOriginalCardsArr.filter((card) => card.title.startsWith(filter))
      );
    }
  };

  const handleDeleteFromDisplay = (id) => {
    setCardsState(cardsState.filter((card) => card._id !== id));
  };

  return (
    <Fragment>
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <Typography textAlign="center">
          <h1>Welcome To Castle Paint Shop</h1>
        </Typography>
      </Container>
      <Container maxWidth="md" sx={{ my: 2, display: "flex" }}>
        <Grid
          container
          spacing={3}
          justifyContent="flex-start"
          alignItems="stretch"
        >
          {cardsState ? (
            cardsState.map((card) => (
              <Grid
                item
                xs={3}
                key={`bizCrd-${card._id}`}
                sx={{ padding: "0", margin: "0", display: "flex" }}
              >
                <CardComponent
                  cardFromParent={card}
                  onUnMark={() => {}}
                  onDelete={handleDeleteFromDisplay}
                />
              </Grid>
            ))
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default HomePage;
