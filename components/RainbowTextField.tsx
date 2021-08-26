import { Theme } from "@material-ui/core/styles";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

export default function RainbowTextBox(props) {
  const buttonStyles = makeStyles((theme: Theme) =>
    createStyles({
      textForm: {
        "& label.Mui-focused": {
          color: "green",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#4050B5",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#4050B5",
          },
          "&:hover fieldset": {
            borderColor: "yellow",
          },
          "&.Mui-focused fieldset": {
            borderColor: "green",
          },
        },
      },
      color: {
        color: theme.palette.grey[800],
      },
    })
  );
  const classes = buttonStyles();
  const handleFunc = props.handleFunc;
  return (
    <TextField
      className={classes.textForm}
      label={props.label}
      variant="outlined"
      id="custom-css-outlined-input"
      value={props.value}
      onChange={handleFunc}
    />
  );
}
