import React, {useState} from 'react';
import { useMutation } from 'react-query';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import SelectLabels from './SelectLabels'
import {test_kind_enum} from '../interfaces/test_get_type'
import {field_patch} from '../apis/subjects_post'
import { subjects_get } from '../apis/subjects_get'

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

export default function NewSubjectDialogs() {
  

  const [new__subject_data, setNew_subject_data] = useState<string>("")


  const [open, setOpen] = React.useState(false);

  const {
    mutate: new_field_mutation,
    isLoading: mutateIsLoading
  } = useMutation((data: any) => field_patch(data), {
    onSuccess: () => {
      alert("success")
    },
    onError: (errorMessage: string) => {
      alert("failed")
    }
  })

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSave = () => {
    new_field_mutation(new__subject_data)
    setOpen(false);
  };
  const handlerSubject = e => setNew_subject_data(e.target.data);
  return (
    <div>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        科目追加
      </Button>
      <Dialog onClose={() => setOpen(false)} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={() => setOpen(false)}>
          科目追加
        </DialogTitle>
        <DialogContent dividers>
          <input value={new__subject_data} onChange={handlerSubject} />
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
