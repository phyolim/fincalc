import NumberFormat from "react-number-format";
import { useState } from "react";

// @ts-ignore
export const CurrencyFormat = ({ onChange, value, ...rest }) => {
  const [currency, setCurrency] = useState(value / 100);
  return (
    <NumberFormat
      {...rest}
      value={currency}
      thousandSeparator={true}
      decimalScale={2}
      onValueChange={(target) => {
        // @ts-ignore
        setCurrency(target.floatValue);
        onChange(target.floatValue);
      }}
      isNumericString
      prefix="$ "
    />
  );
};
