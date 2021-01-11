export const validateConfirmPassword = (pass, value) => {
  let error = "";
  if (pass && value) {
    if (pass !== value) {
      error = "Password not matched";
    }
  } else {
    error = "Password not matched";
  }
  return error;
};

export const validateAgreed = (value) => {
  let error;
  if (!value) error = "Accept our terms and condition to proceed";
  return error;
};

export const validatePassword = (value) => {
  let error;
  if (!value) {
    error = "Please enter your password";
  } else if (value.length < 4) {
    error = "Value must be longer than 3 characters";
  }
  return error;
};

export const validateFName = (value) => {
  let error;
  if (!value) {
    error = "Please enter your firstname";
  } else if (value.length < 3) {
    error = "Value must be longer than 2 characters";
  }
  return error;
};

export const validateLName = (value) => {
  let error;
  if (!value) {
    error = "Please enter your lastname";
  } else if (value.length < 3) {
    error = "Value must be longer than 2 characters";
  }
  return error;
};

export const validatePhone = (value) => {
  let error;
  if (!value) {
    error = "Please enter phone number";
  } else if (value.length < 11) {
    error = "Value must be longer than 10 characters";
  }
  return error;
};

export const validateEmail = (value) => {
  let error;
  if (!value) {
    error = "Please enter your email address";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};
export const validateUsername = (value) => {
  let error;
  if (!value) error = "Please enter your username";
  return error;
};

export const validateCountry = (value) => {
  let error;
  if (!value) error = "Please select a country";
  return error;
};

export const validateRegion = (value) => {
  let error;
  if (!value) error = "Please select a region";
  return error;
};

export const validateName = (value) => {
  let error;
  if (!value) {
    error = "Please enter name";
  } else if (value.length > 65) {
    error = "Value must be less than 64 characters";
  }
  return error;
};

export const validateIdentifier = (value, isTaken) => {
  let error;
  if (!value || isTaken === 0) {
    error = "Please enter identifier.";
  } else if (value.length > 65) {
    error = "Value must be less than 64 characters";
  } else if (isTaken === 2) {
    error = "This identifier has been taken";
  } else if (isTaken === 3) {
    error = "Please wait while we check this identifier";
  } else if (isTaken === 4) {
    error = "error encountered while checking identifier...";
  } else if (isTaken === 5) {
    error = "Please clear identifier error";
  }
  return error;
};
export const validateTerm = (value) => {
  let error;
  if (!value) {
    error = "Please select a valid term";
  }
  return error;
};
export const validateAddress = (value) => {
  let error;
  if (!value) {
    error = "Please enter address";
  } else if (value && value.length > 251) {
    error = "Value must be less than 250 characters";
  }
  return error;
};
export const validateValuelessName = (value) => {
  let error;
  if (value && value.length < 3) {
    error = "Value must be longer than 2 characters";
  }
  return error;
};
export const validateValuelessDesc = (value) => {
  let error;
  if (value && value.length > 251) {
    error = "Value must be less than 250 characters";
  }
  return error;
};
export const validateValuelessEmail = (value) => {
  let error;
  if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};
