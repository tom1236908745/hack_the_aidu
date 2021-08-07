import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';

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
      justifyContent: 'flex-end'
    }
  }),
);

export default function ButtonAppBar() {
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
        <Button color="inherit" className={classes.buttons}>科目追加</Button>
        <Button color="inherit" className={classes.buttons}>資料追加</Button>
      </Toolbar>
    </AppBar>
  );
}