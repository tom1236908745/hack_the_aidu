import { Theme } from "@material-ui/core/styles";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
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

  return (
    <>
      <Box mt={4}>
        <p>{props.text}</p>
        <TextField
          error={props.error}
          inputRef={props.inputRef}
          helperText={props.helperText}
          className={classes.textForm}
          label={props.label}
          variant="outlined"
          id="custom-css-outlined-input"
          value={props.value}
          type={props.type}
          onChange={props.handleFunc}
        />
      </Box>
      {props.text2 && (
        <Box mt={4}>
          <p>{props.text2}</p>
          <TextField
            error={props.error2}
            inputRef={props.inputRef2}
            inputProps={props.inputProps2}
            helperText={props.helperText2}
            className={classes.textForm}
            label={props.label2}
            variant="outlined"
            id="custom-css-outlined-input"
            value={props.value2}
            type={props.type2}
            onChange={props.handleFunc2}
          />
        </Box>
      )}
    </>
  );
}
