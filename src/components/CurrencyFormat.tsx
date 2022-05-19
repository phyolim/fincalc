import NumberFormat from "react-number-format";
import { useState } from "react";

export const CurrencyFormat = ({ onChange, value, ...rest }) => {
  const [currency, setCurrency] = useState(value / 100);
  return (
    <NumberFormat
      {...rest}
      value={currency}
      thousandSeparator={true}
      decimalScale={2}
      onValueChange={(target) => {
        setCurrency(target.floatValue);
        onChange(target.floatValue);
      }}
      isNumericString
      prefix="$ "
    />
  );
};
