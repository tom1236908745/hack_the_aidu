import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import NewSubjectDialog from './NewSubjectDialog'
import NewTestDialog from './NewTestDialog'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
      width: "100wv"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      width: "100wv"
    },
    buttons: {
      display: "flex",
      alignItems: "stretch"
    },
    spaceRight: {
      marginRight: "1rem"
    }
  }),
);

export default function ButtonAppBar(props) {
  const classes = useStyles()

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          💓
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          hack the aidu
        </Typography>
        <div className={classes.buttons}>
          <NewSubjectDialog subjects_remove={props.subjects_remove}/>
          <span className={classes.spaceRight} />
          <NewTestDialog />
        </div>
      </Toolbar>
    </AppBar>
  );
}