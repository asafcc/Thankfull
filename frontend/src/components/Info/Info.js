import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
} from "@material-ui/core";
import { ImInfo } from "react-icons/im";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Info() {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  return (
    <>
      <ImInfo className="animateScale" onClick={handleClickOpen} />

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <h2 style={{ letterSpacing: "0.2rem", padding: "2rem 0 1rem 1.5rem" }}>
          {"The Power Of Gratitude"}
        </h2>
        <DialogContent style={{ margin: "0 1rem 0 1.3rem" }}>
          <p>
            How often do you spare a minute to acknowledge the things that make
            you happy?
          </p>
          <p>
            It might not seem like it at first glance, but we should all be
            grateful for what we already have: Our family members, friends,
            pets, and even the chocolate cake we ate earlier today - All of
            these things and more should not be taken for granted.
          </p>
          <p>
            Gratitude is a simple, yet powerful tool to give us a better
            perspective about our lives.
          </p>
          <p>
            Studies show that practicing gratitude consistently{" "}
            <span style={{ fontWeight: "400" }}>
              can help one's to cope better with anxiety, strengthen the immune
              systems, Lower blood pressure, and more.
            </span>
          </p>
          <p>
            What a better moment for starting to practice your gratitude than
            right now?
          </p>
        </DialogContent>
        <DialogActions style={{ margin: "0 0.5rem 0.5rem 0" }}>
          <Button color="primary">
            <a
              href="https://www.health.harvard.edu/healthbeat/giving-thanks-can-make-you-happier"
              // eslint-disable-next-line
              target="_blank"
            >
              Read More
            </a>
          </Button>
          <Button onClick={handleClose} color="secondary">
            <b> Sounds Awesome!</b>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Info;
