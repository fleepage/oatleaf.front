export const customModalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    background: "rgba(0, 0, 0, 0)",
    border: "none",
    transform: "translate(-50%, -50%)",
  },
};

export const customCenterlessModalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    background: "rgba(0, 0, 0, 0)",
    border: "none",
    transform: "translate(-50%, -50%)",
  },
};
