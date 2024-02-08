import React from "react";
import { useAuth } from "../AuthContext";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import {useNavigation} from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <AppBar
      position="static"
      color="default"
      elevation={3}
      style={{ borderRadius: 3 }}
    >
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Box style={{ display: "flex", gap: "1em" }}>
          <Typography variant="h6" color="inherit" noWrap>
            blog app
          </Typography>

          <Button
            href="/"
            variant="contained"
            style={{ textDecoration: "none" }}
          >
            blogs
          </Button>

          <Button
            href="/users"
            variant="outlined"
            style={{ textDecoration: "none" }}
          >
            users
          </Button>
        </Box>
        <Box style={{ display: "flex", gap: "1em" }}>
          <Typography
            variant="body1"
            color="inherit"
            style={{ flexGrow: 1, float: "right", marginTop: ".4em" }}
          >
            {user.name} logged in
          </Typography>
          <Button variant="contained" color="error" onClick={logout}>
            logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
