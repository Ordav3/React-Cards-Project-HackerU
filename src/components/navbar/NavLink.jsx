import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

const NavLinkComponent = ({ url, label }) => {
  const theme = useTheme();

  return (
    <NavLink style={{ textDecoration: "none" }} key={url} to={url}>
      {() => (
        <Typography
          variant="button"
          sx={{
            display: "block",
            paddingX: "0.3rem",
            textTransform: "none",
            textDecoration: "none",
            backgroundColor: theme.palette.primary.main,
            mb: { xs: -1, md: 0 },
          }}
          color={"white"}
        >
          {label}
        </Typography>
      )}
    </NavLink>
  );
};

export default NavLinkComponent;
