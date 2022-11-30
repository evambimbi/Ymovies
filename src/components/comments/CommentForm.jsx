import React from "react";
import { useState } from "react";
import { TextField, Button, Stack, Paper } from "@mui/material";

export default function CommentForm({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <Stack direction="column">
          <Paper elevation={2} sx={{ width: 500 }}>
            <TextField
              multiline
              maxRows={4}
              label="Ecrit un commentaire"
              variant="standard"
              sx={{ width: "500px" }}
              value={text}
              onChange={(e) => setText(e.target.value)}></TextField>
            <Button type="submit" disabled={isTextareaDisabled}>
              {submitLabel}
            </Button>
            {hasCancelButton && (
              <Button type="button" onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </Paper>
        </Stack>
      </form>
    </>
  );
}
