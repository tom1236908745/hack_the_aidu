import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { test_fix } from '../apis/test_fix'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


export default function EditDialogs(props) {
  const [open, setOpen] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const {
    mutate: post_test_mutation,
    isLoading: mutateIsLoading
  } = useMutation((data: any) => test_fix(data), {
    onSuccess: () => {
      props.fetch_test_mutation()
      
    },
    onError: () => {
      alert("failed")
    }
  })

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSave = () => {
    let new_test = Object.assign({}, props.test)
    new_test.file_url = newUrl
    post_test_mutation(new_test)
    console.log(props.test.file_url)
    setOpen(false);
  };

  const handleUrl = e => setNewUrl(e.target.value);
  return (
    <div>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        編集
      </Button>
      <Dialog onClose={() => setOpen(false)} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={() => setOpen(false)}>
          リンク編集
        </DialogTitle>
        <DialogContent dividers>
          <input value={newUrl} onChange={handleUrl} placeholder={props.test.file_url} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
