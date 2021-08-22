import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";

import CssBaseline from "@material-ui/core/CssBaseline";

import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import FastfoodIcon from "@material-ui/icons/Fastfood";
import Typography from "@material-ui/core/Typography";

import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

import Switch from "@material-ui/core/Switch";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Impressum from "./impressum";

export default function LunchProfileRead(props) {
  const [lunchProfile, setLunchProfile] = useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    lunchtopic: 50,
  });

  const daymapping = {
    mon: "Montag",
    tue: "Dienstag",
    wed: "Mittwoch",
    thu: "Donnerstag",
    fri: "Friday",
  };

  const authid = props.authid;
  const readerid = props.reader;

  useEffect(() => {
    console.log("Use Effect with props:");
    console.log(props);
    setLunchProfile(props.lunchdata);
  }, [props]);

  function Emoji(props) {
    if (props.mood) {
      return <InsertEmoticonIcon color="primary" />;
    } else {
      return <SentimentVeryDissatisfiedIcon color="error" />;
    }
  }

  function DaysTable() {
    return (
      <Grid item xs={12} md={6}>
        <div>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Emoji mood={lunchProfile.mon} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Montag" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Emoji mood={lunchProfile.tue} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Dienstag" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Emoji mood={lunchProfile.wed} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Mittwoch" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Emoji mood={lunchProfile.thu} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Donnerstag" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Emoji mood={lunchProfile.fri} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Freitag" />
            </ListItem>
          </List>
        </div>
      </Grid>
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
            my: 8,
            mx: 8,
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
          <Typography component="subtitle1" variant="subtitle1">
            An diesen Tagen habe ich typischerweise Zeit für einen Lunch
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <DaysTable />
            <Typography component="subtitle1" variant="subtitle1">
              Auf einer Skala von 0-10, wobei 0 nur Privates und 10 nur Arbeit
              ist, wäre mein Lieblingsthema eine {lunchProfile.lunchtopic / 10}
            </Typography>
          </Box>
        </Box>{" "}
        <Impressum sx={{ mt: 5 }} />
      </Grid>
    </Grid>
  );
}
