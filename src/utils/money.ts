export const formatMoney = (money: number) =>
  new Intl.NumberFormat('es-CL').format(money)
