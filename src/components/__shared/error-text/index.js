import React, { Fragment } from "react";
import { View, Text } from "react-native";

// Text Error Component
const ErrorText = ({ textErrors, styles, errorKey, style }) => {
  return (
    <Fragment>
      {Object.keys(textErrors).length > 0 && textErrors[errorKey] && (
        <Text style={[styles.error, style]}>{textErrors[errorKey]}</Text>
      )}
    </Fragment>
  );
};

export default ErrorText;
