import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Typography, Grid, Button, Box } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { cardFormFields } from "./cardFormFields";
import { fieldValidation } from "../../validation/fieldValidation";
import FieldComponent from "../Field";
import cardFields from "../../utils/cardFields";

const CardForm = ({ onClose, edit, card }) => {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [fieldToFocus, setFieldToFocus] = useState(0);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (edit) {
      setFormData(cardFields(card));
    }
  }, [edit, card]);

  useEffect(() => {
    let validateForm = () => {
      for (const field of cardFormFields) {
        if (
          field.required &&
          (!formData[field.name] || formError[field.name])
        ) {
          return false;
        }
      }
      return true;
    };
    setFormValid(validateForm());
  }, [formData, formError]);

  const handleFocus = (event) => {
    setFieldToFocus(
      cardFormFields.findIndex((field) => field.name === event.target.name)
    );
  };

  const handleChange = (event) => {
    const { name, value, id } = event.target;
    const { joi, label } = cardFormFields.find((field) => field.id === id);
    setFormError({
      ...formError,
      [name]: fieldValidation(joi, value, label),
    });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({});
    setFieldToFocus(0);
    setFormError({});
    setFormValid(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formValid) {
      toast.info("Please fill in all required fields correctly");
      return;
    }
    try {
      if (edit) {
        let newCard = (
          await axios.put(`/cards/${card._id}`, cardFields(formData))
        ).data;
        onClose(newCard);
        toast.success(`${formData.title} card edited`);
      } else {
        onClose((await axios.post("/cards", formData)).data);
        toast.success(`${formData.title} card added`);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {cardFormFields.map((field, index) => (
          <Grid item xs={12} sm={field.sm} key={`${new Date()}-${field.id}`}>
            <FieldComponent
              onFocus={handleFocus}
              autoFocus={index === fieldToFocus}
              state={formData[field.name] || ""}
              setState={handleChange}
              field={field}
            />
            <Typography color={"red"} fontSize={"8pt"}>
              {formError[field.name] || ""}
            </Typography>
          </Grid>
        ))}
        <Grid item xs={12} sm={6}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!formValid}
            sx={{ mt: 2, mb: { xs: 0, md: 2 } }}
          >
            {edit ? "Save changes" : "Save Card"}
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mb: 1, mt: { xs: 0, md: 2 } }}
            onClick={resetForm}
          >
            <RestartAltIcon /> Reset Form
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardForm;
