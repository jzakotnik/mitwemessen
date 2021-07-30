import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";

import Switch from "@material-ui/core/Switch";

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

export default function ProfileForm() {
  const [dayselection, setDayselection] = useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(event);
    const data = dayselection;
    console.log("Saving..");
    console.log(JSON.stringify(data));

    fetch("localhost", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => console.log("Success:", JSON.stringify(response)))
      .catch((error) => console.error("Error:", error));
  };

  const handleInput = (evt) => {
    console.log(evt.target.name + ": " + evt.target.checked);
    setDayselection({ ...dayselection, [evt.target.name]: evt.target.checked });
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
            Mein Lunch Profil
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    name="mon"
                    checked={dayselection.mon}
                    onChange={handleInput}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Montag"
              />
              <FormControlLabel
                control={
                  <Switch
                    name="tue"
                    checked={dayselection.tue}
                    onChange={handleInput}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Dienstag"
              />
              <FormControlLabel
                control={
                  <Switch
                    name="wed"
                    checked={dayselection.wed}
                    onChange={handleInput}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Mittwoch"
              />
              <FormControlLabel
                control={
                  <Switch
                    name="thu"
                    checked={dayselection.thu}
                    onChange={handleInput}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Donnerstag"
              />
              <FormControlLabel
                control={
                  <Switch
                    name="fri"
                    checked={dayselection.fri}
                    onChange={handleInput}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Freitag"
              />
            </FormGroup>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Speichern
            </Button>

            <Impressum sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
