import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import Modal from "react-modal";
import { customStyles } from "../Modals/ModalStyles";

const Modals = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModalHandler = () => {
    setIsModalOpen(true);
  };

  const hideModalHandler = () => {
    setIsModalOpen(false);
  };
  Modal.setAppElement("body");

  return (
    <Box>
      <Button varient="contained" onClick={showModalHandler}>
        {props.buttonText}
      </Button>
        <Modal
          style={customStyles}
          isOpen={isModalOpen}
          onRequestClose={hideModalHandler}
        >
          {props.children}
          <Button
            variant="outlined"
            color="error"
            fullWidth={true}
            onClick={hideModalHandler}
            sx={{mt:2}}
          >
            Cancel
          </Button>
        </Modal>
    </Box>
  );
};

export default Modals;
