import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import Slider from "@material-ui/core/Slider";

import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import Impressum from "./impressum";
import IconButton from "@material-ui/core/IconButton";
import QRCode from "qrcode.react";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const marks = [
  {
    value: 0,
    label: "Lieber Privates",
  },
  {
    value: 50,
    label: "Ist mir egal",
  },
  {
    value: 100,
    label: "Lieber Arbeit",
  },
];

function valuetext(value) {
  return `${value}%`;
}

const lunchtime = [
  {
    value: 0,
    label: "11:00",
  },
  {
    value: 50,
    label: "13:00",
  },
  {
    value: 100,
    label: "14:00",
  },
];

export default function LunchProfileAdmin(props) {
  const [lunchProfile, setLunchProfile] = useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    lunchtopic: 50,
  });

  const [saving, setSaving] = useState(false);

  const authid = props.authid;
  const readerid = props.readerid;
  const readerLink = process.env.NEXT_PUBLIC_PROFILE_ENDPOINT + "/" + readerid;
  console.log("Reader Link: ", props);

  const handleCopyReader = (event) => {
    navigator.clipboard.writeText(readerLink);
  };

  useEffect(() => {
    setLunchProfile(props.lunchdata);
  }, [props]);

  const handleSubmit = (event) => {
    event.preventDefault();
    //setSaving(true);
    //console.log(event);

    const data = { lunchProfile, authid: { admin: authid } };
    //console.log("Saving..");
    //console.log(JSON.stringify(data));

    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/api/updateData", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        //setSaving(true);
        console.log("Success:", JSON.stringify(response));
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleInput = (evt) => {
    //console.log(evt.target.name + ": " + evt.target.checked);
    setLunchProfile({ ...lunchProfile, [evt.target.name]: evt.target.checked });
  };

  const handleLunchTopic = (e) => {
    setLunchProfile({ ...lunchProfile, lunchtopic: e.target.value });
  };

  function SaveButton(props) {
    return (
      <Button
        type="submit"
        onClick={handleSubmit}
        disabled={saving}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Speichern
      </Button>
    );
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(../lunch1.jpg)",
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
            mt: 6,
            my: 4,
            mx: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {" "}
          <Typography component="h1" variant="h5">
            Mein Lunch Profil
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <FastfoodIcon />
          </Avatar>
          <Box
            component="form"
            noValidate
            sx={{
              mt: 1,
              my: 5,
              mx: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Typography component="subtitle1" variant="subtitle1">
              Typischerweise Zeit am
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    name="mon"
                    checked={lunchProfile.mon}
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
                    checked={lunchProfile.tue}
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
                    checked={lunchProfile.wed}
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
                    checked={lunchProfile.thu}
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
                    checked={lunchProfile.fri}
                    onChange={handleInput}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Freitag"
              />
            </FormGroup>
          </Box>
          <Box
            component="form"
            noValidate
            sx={{
              mt: 1,
              my: 5,
              mx: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Typography component="subtitle1" variant="subtitle1">
              Lieblingsthema beim Essen
            </Typography>
            <Slider
              aria-label="Essensthema"
              value={lunchProfile.lunchtopic}
              getAriaValueText={valuetext}
              step={10}
              onChange={handleLunchTopic}
              valueLabelDisplay="auto"
              marks={marks}
              sx={{
                width: "95%",
              }}
            />
          </Box>
          <SaveButton />
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Öffentliche Links (ready-only)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="subtitle2">
                <b>Nur-Lesen Link</b>
                <IconButton aria-label="copy" onClick={handleCopyReader}>
                  <FileCopyIcon />
                </IconButton>{" "}
                <br></br>
                <a href={readerLink} target="_blank" rel="noopener noreferrer">
                  {readerLink}
                </a>
                <br></br>
                <center>
                  <QRCode value={readerLink} />
                </center>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Impressum sx={{ mt: 5 }} />
        </Box>
      </Grid>
    </Grid>
  );
}
