import React, { useState } from "react";
import { useRouter } from "next/router";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import IconButton from "@material-ui/core/IconButton";

import { v4 as uuidv4 } from "uuid";

function Impressum(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Impressum "}
      <Link color="inherit" href="https://github.com/jzakotnik">
        jzakotnik github
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Admin(props) {
  const [authurl, setAuthurl] = useState({ admin: "Keiner", reader: "Keiner" });

  const handleCreate = (event) => {
    console.log("Create links at " + process.env.NEXT_PUBLIC_API_ENDPOINT);
    console.log("Reader link at " + process.env.NEXT_PUBLIC_PROFILE_ENDPOINT);
    event.preventDefault();
    const authid = { admin: uuidv4(), reader: uuidv4() };
    const dayselection = {
      mon: true,
      tue: true,
      wed: true,
      thu: true,
      fri: true,
    };
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/api/insertData", {
      method: "POST",
      body: JSON.stringify({ authid, dayselection }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("Success:", JSON.stringify(response));
        setAuthurl(authid);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleCopyAdmin = (event) => {
    navigator.clipboard.writeText(
      process.env.NEXT_PUBLIC_PROFILE_ENDPOINT + "/" + authurl.admin
    );
  };

  const handleCopyReader = (event) => {
    navigator.clipboard.writeText(
      process.env.NEXT_PUBLIC_PROFILE_ENDPOINT + "/" + authurl.reader
    );
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <FastfoodIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Link zum Lunchprofil erzeugen
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <FormGroup sx={{ mt: 4 }}>
              <Typography margin="normal">
                <b>Admin Link:</b>{" "}
                <IconButton aria-label="copy" onClick={handleCopyAdmin}>
                  <FileCopyIcon />
                </IconButton>
                <br></br>
                {process.env.NEXT_PUBLIC_PROFILE_ENDPOINT + "/" + authurl.admin}
              </Typography>
              <Typography>
                <b>Leser Link:</b>
                <IconButton aria-label="copy" onClick={handleCopyReader}>
                  <FileCopyIcon />
                </IconButton>{" "}
                <br></br>
                {process.env.NEXT_PUBLIC_PROFILE_ENDPOINT +
                  "/" +
                  authurl.reader}
              </Typography>
            </FormGroup>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleCreate}
              sx={{ mt: 3, mb: 2 }}
            >
              Erzeugen
            </Button>

            <Impressum sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
