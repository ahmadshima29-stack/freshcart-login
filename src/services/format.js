const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
export const formatMoney = value => money.format(value);
