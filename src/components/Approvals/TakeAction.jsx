import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Button,
  useMediaQuery,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Formik, Form } from "formik";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useUser } from "../../context/userContext";

const TakeActionOnLeaveApprovals = ({ open, handleClose, employee }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { user } = useUser()

  const [openRejectConfirmationDialog, setRejectConfirmationDialog] = useState(false);
  const [openApprovedConfirmationDialog, setApprovedConfirmationDialog] = useState(false);
  // Prevent closing the dialog on backdrop click
  const handleDialogClose = (event, reason) => {
    if (reason !== "backdropClick") {
      handleClose();
    }
  };

  // Handle update action.
  const handleUpdateClick = (values) => {
    if (openApprovedConfirmationDialog) {
      employee.status = 'Approved'
      employee.comment = values.comment
      employee.action_taken_by = user?.name
      setApprovedConfirmationDialog(false);
      handleClose();
    } else {
      employee.status = 'Rejected'
      employee.comment = values.comment
      employee.action_taken_by = user?.name
      setRejectConfirmationDialog(false);
      handleClose();
    }
  };

  // reject Button Click
  // Handle opening the reject confirmation dialog
  const handleRejectClick = () => {
    setRejectConfirmationDialog(true);
  };

  // reject Button Click
  // Handle opening the approve confirmation dialog
  const handleApprovedClick = () => {
    setApprovedConfirmationDialog(true);
  };

  // Cancel the reject/approve action
  const handleCancel = () => {
    setRejectConfirmationDialog(false);
    setApprovedConfirmationDialog(false);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      maxWidth="md"
      PaperProps={{
        style: {
          backgroundColor: "#333333",
          borderRadius: "20px",
          boxShadow: "none",
          position: "relative",
        },
      }}
      disablebackdropclick
      disableEscapeKeyDown
    >
      <DialogContent
        style={{
          padding: "40px 20px 20px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          position: "relative",
        }}
      >
        <span
          className={`font-title text-[#EDF6FF] flex justify-center items-center text-[1.5rem] mb-[1.5rem]`}
        >
          Leave Request Details
        </span>
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "#EDF6FF",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
            },
            zIndex: 1,
          }}
        >
          <CloseOutlinedIcon />
        </IconButton>
        <Formik
          initialValues={employee || {}}
          onSubmit={(values) => handleUpdateClick(values)}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" gap="20px">
                {/* Top Section: Divided into three parts */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  gap="10px"
                >

                  {/* Middle: Employee ID and below that Email */}
                  <Box
                    flex="2"
                    display="flex"
                    flexDirection="column"
                    gap="10px"
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Full Name"
                      name="name"
                      onChange={handleChange}
                      value={values.name || ""}
                      slotProps={{
                        input: {
                          readOnly: true,

                          style: {
                            color: "#EDF6FF",
                            backgroundColor: "#282828",
                            borderRadius: "0.5rem",
                            borderWidth: "0.1rem",
                            borderColor: "#D7AE83",
                            outline: "none",
                          },
                        },
                        inputLabel: {
                          style: {
                            color: "#999999",
                          },
                        },
                      }}
                      sx={{
                        // Remove the underline
                        "& .MuiFilledInput-root": {
                          "&:before": {
                            borderBottom: "none !important",
                          },
                          "&:hover:before": {
                            borderBottom: "none !important",
                          },
                          "&:after": {
                            borderBottom: "none !important",
                          },
                        },
                      }}
                    />
                    {/* use map funtion . with one Textfield can be possible render the form */}
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="From"
                      name="from"
                      onChange={handleChange}
                      value={values.from || ""}
                      slotProps={{
                        input: {
                          readOnly: true,

                          style: {
                            color: "#EDF6FF",
                            backgroundColor: "#282828",
                            borderRadius: "0.5rem",
                            borderWidth: "0.1rem",
                            borderColor: "#D7AE83",
                            outline: "none",
                          },
                        },
                        inputLabel: {
                          style: {
                            color: "#999999",
                          },
                        },
                      }}
                      sx={{
                        // Remove the underline
                        "& .MuiFilledInput-root": {
                          "&:before": {
                            borderBottom: "none !important",
                          },
                          "&:hover:before": {
                            borderBottom: "none !important",
                          },
                          "&:after": {
                            borderBottom: "none !important",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Right: Employee Name and below that Phone */}
                  <Box
                    flex="2"
                    display="flex"
                    flexDirection="column"
                    gap="10px"
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Email Id"
                      name="email"
                      onChange={handleChange}
                      value={values.email || ""}
                      slotProps={{
                        input: {
                          readOnly: true,

                          style: {
                            color: "#EDF6FF",
                            backgroundColor: "#282828",
                            borderRadius: "0.5rem",
                            borderWidth: "0.1rem",
                            borderColor: "#D7AE83",
                            outline: "none",
                          },
                        },
                        inputLabel: {
                          style: {
                            color: "#999999",
                          },
                        },
                      }}
                      sx={{
                        // Remove the underline
                        "& .MuiFilledInput-root": {
                          "&:before": {
                            borderBottom: "none !important",
                          },
                          "&:hover:before": {
                            borderBottom: "none !important",
                          },
                          "&:after": {
                            borderBottom: "none !important",
                          },
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="To"
                      name="to"
                      onChange={handleChange}
                      value={values.to || ""}
                      slotProps={{
                        input: {
                          readOnly: true,

                          style: {
                            color: "#EDF6FF",
                            backgroundColor: "#282828",
                            borderRadius: "0.5rem",
                            borderWidth: "0.1rem",
                            borderColor: "#D7AE83",
                            outline: "none",
                          },
                        },
                        inputLabel: {
                          style: {
                            color: "#999999",
                          },
                        },
                      }}
                      sx={{
                        // Remove the underline
                        "& .MuiFilledInput-root": {
                          "&:before": {
                            borderBottom: "none !important",
                          },
                          "&:hover:before": {
                            borderBottom: "none !important",
                          },
                          "&:after": {
                            borderBottom: "none !important",
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Bottom Section: Other fields in column view */}

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Leave Type"
                  name="leave_type"
                  onChange={handleChange}
                  value={values.leave_type || ""}
                  slotProps={{
                    input: {
                      readOnly: true,

                      style: {
                        color: "#EDF6FF",
                        backgroundColor: "#282828",
                        borderRadius: "0.5rem",
                        borderWidth: "0.1rem",
                        borderColor: "#D7AE83",
                        outline: "none",
                      },
                    },
                    inputLabel: {
                      style: {
                        color: "#999999",
                      },
                    },
                  }}
                  sx={{
                    // Remove the underline
                    "& .MuiFilledInput-root": {
                      "&:before": {
                        borderBottom: "none !important",
                      },
                      "&:hover:before": {
                        borderBottom: "none !important",
                      },
                      "&:after": {
                        borderBottom: "none !important",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Reason For Leave"
                  name="dob"
                  onChange={handleChange}
                  value={values.reason_for_leave || ""}
                  slotProps={{
                    input: {
                      readOnly: true,

                      style: {
                        color: "#EDF6FF",
                        backgroundColor: "#282828",
                        borderRadius: "0.5rem",
                        borderWidth: "0.1rem",
                        borderColor: "#D7AE83",
                        outline: "none",
                      },
                    },
                    inputLabel: {
                      style: {
                        color: "#999999",
                      },
                    },
                  }}
                  sx={{
                    // Remove the underline
                    "& .MuiFilledInput-root": {
                      "&:before": {
                        borderBottom: "none !important",
                      },
                      "&:hover:before": {
                        borderBottom: "none !important",
                      },
                      "&:after": {
                        borderBottom: "none !important",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Comment"
                  name="comment"
                  onChange={handleChange}
                  value={values.comment || ""}
                  slotProps={{
                    input: {
                      style: {
                        color: "#EDF6FF",
                        backgroundColor: "#282828",
                        borderRadius: "0.5rem",
                        borderWidth: "0.1rem",
                        borderColor: "#D7AE83",
                        outline: "none",
                      },
                    },
                    inputLabel: {
                      style: {
                        color: "#999999",
                      },
                    },
                  }}
                  sx={{
                    // Remove the underline
                    "& .MuiFilledInput-root": {
                      "&:before": {
                        borderBottom: "none !important",
                      },
                      "&:hover:before": {
                        borderBottom: "none !important",
                      },
                      "&:after": {
                        borderBottom: "none !important",
                      },
                    },
                  }}
                />

              </Box>

              <Box display="flex" justifyContent="space-between" mt={4} gap={5}>
                {/* Delete Button */}
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleRejectClick}
                  sx={{
                    backgroundColor: "#d7ae83",
                    color: "#111111",
                    fontSize: "1rem",
                    fontWeight: 600,
                    padding: "5px 15px",
                    border: "none",
                    borderRadius: "5px",
                    "&:hover": {
                      backgroundColor: "#111111",
                      color: "#EDF6FF",
                    },
                  }}
                >
                  Reject
                </Button>

                {/* Edit and Update Button */}
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleApprovedClick}
                  sx={{
                    backgroundColor: "#EDF6FF",
                    color: "#111111",
                    fontSize: "1rem",
                    fontWeight: 600,
                    padding: "5px 15px",
                    border: "none",
                    borderRadius: "5px",
                    "&:hover": {
                      backgroundColor: "#666666",
                      color: "#EDF6FF",
                    },
                  }}
                >
                  {/* {isEditing ? "Update" : "Edit"} */}
                  Approved
                </Button>
              </Box>

              {/* Reject Confirmation Dialog */}
              <Dialog
                open={openRejectConfirmationDialog}
                onClose={handleCancel}
                PaperProps={{
                  sx: {
                    borderRadius: "1rem",
                    backgroundColor: "#333333",
                    padding: "2rem",
                    display: "flex",
                  },
                }}
              >
                <DialogTitle
                  sx={{
                    color: "#EDF6FF",
                    padding: "0px",
                    marginBottom: "1.5rem",
                  }}
                >
                  Confirmation
                </DialogTitle>
                <DialogContent sx={{ padding: "0px", marginBottom: "1.5rem" }}>
                  <DialogContentText sx={{ color: "#EDF6FF !important" }}>
                    {employee ? (
                      <>
                        Confirm: Reject leave for <span className="font-bold text-[#d7ae83]">
                          {employee.name}
                        </span> from <span className="font-bold text-[#d7ae83]">
                          {employee.from}
                        </span> to <span className="font-bold text-[#d7ae83]">
                          {employee.to}
                        </span>?

                      </>
                    ) : (
                      "No employee selected for deletion."
                    )}
                  </DialogContentText>
                </DialogContent>
                <DialogActions className="gap-5" sx={{ padding: "4px 0px" }}>
                  <Button
                    onClick={handleCancel}
                    sx={{
                      color: "#EDF6FF",
                      backgroundColor: "#212121",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      "&:hover": {
                        color: "#13f702",
                        backgroundColor: "#111111",
                        borderRadius: "5px",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    sx={{
                      color: "#EDF6FF",
                      backgroundColor: "#212121",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      "&:hover": {
                        color: "#f70202",
                        backgroundColor: "#111111",
                        borderRadius: "5px",
                      },
                    }}
                  >
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>

              <Dialog
                open={openApprovedConfirmationDialog}
                onClose={handleCancel}
                PaperProps={{
                  sx: {
                    borderRadius: "1rem",
                    backgroundColor: "#333333",
                    padding: "2rem",
                    display: "flex",
                  },
                }}
              >
                <DialogTitle
                  sx={{
                    color: "#EDF6FF",
                    padding: "0px",
                    marginBottom: "1.5rem",
                  }}
                >
                  Confirmation
                </DialogTitle>
                <DialogContent sx={{ padding: "0px", marginBottom: "1.5rem" }}>
                  <DialogContentText sx={{ color: "#EDF6FF !important" }}>
                    {employee ? (
                      <>
                        Confirm: Approved leave for <span className="font-bold text-[#d7ae83]">
                          {employee.name}
                        </span> from <span className="font-bold text-[#d7ae83]">
                          {employee.from}
                        </span> to <span className="font-bold text-[#d7ae83]">
                          {employee.to}
                        </span>?

                      </>
                    ) : (
                      "No employee selected for deletion."
                    )}
                  </DialogContentText>
                </DialogContent>
                <DialogActions className="gap-5" sx={{ padding: "4px 0px" }}>
                  <Button
                    onClick={handleCancel}
                    sx={{
                      color: "#EDF6FF",
                      backgroundColor: "#212121",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      "&:hover": {
                        color: "#13f702",
                        backgroundColor: "#111111",
                        borderRadius: "5px",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    sx={{
                      color: "#EDF6FF",
                      backgroundColor: "#212121",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      "&:hover": {
                        color: "#f70202",
                        backgroundColor: "#111111",
                        borderRadius: "5px",
                      },
                    }}
                  >
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default TakeActionOnLeaveApprovals;