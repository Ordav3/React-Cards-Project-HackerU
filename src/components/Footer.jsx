import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Typography, IconButton } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1),
    marginTop: "auto",
  },
  iconButton: {
    color: theme.palette.secondary.contrastText,
    marginRight: theme.spacing(1),
  },
}));

const FooterComp = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <Typography variant="body2" align="center">
          <IconButton
            className={classes.iconButton}
            href="https://wa.me/972542345455"
          >
            <WhatsAppIcon />
          </IconButton>
        </Typography>
        <Typography variant="body2" align="center" fontWeight={600}>
          © {new Date().getFullYear()} All Rights reserved
        </Typography>
      </Container>
    </footer>
  );
};

export default FooterComp;
