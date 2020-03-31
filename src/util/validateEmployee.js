export const validateEmployee = ({ name, email, phone, address }, errors) => {
  if (!name) {
    errors.name = "Please enter your name";
    // return setError(errors);
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Please enter a valid email";
    // return setError(errors);
  }

  if (!address) {
    errors.address = "Please have us know your adddress";
    // return setError(errors);
  }

  if (!phone) {
    errors.phone = "Please enter your phone details";
    // return setError(errors);
  }

  if (phone.length !== 10) {
    errors.phone = "Please enter a valid phone number (10 digits)";
    // return setError(errors);
  }

  return {
    errors,
    isValid: Object.keys(errors).length <= 0
  };
};
