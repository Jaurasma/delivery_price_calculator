interface CalculatedState {
  cartSurcharge: number;
  deliveryCharge: number;
  itemSurcharge: number;
  rushHourCharge: number;
  deliveryPrice: number;
}

// Calculate cart surcharge
const calculateCartSurcharge = (cartValue: number) =>
  Math.max(10 - cartValue, 0);

// Calculate delivery charge
const calculateDeliveryCharge = (deliveryDistance: number) =>
  deliveryDistance <= 1000 ? 2 : 2 + Math.ceil((deliveryDistance - 1000) / 500);

// Calculate item charge
const calculateItemSurcharge = (numberOfItems: number): number => {
  let surcharge = Math.max(numberOfItems - 4, 0) * 0.5;
  if (numberOfItems > 12) {
    surcharge += (numberOfItems - 12) * 1.2;
  }
  return surcharge;
};

const calculateRushHourCharge = (
  orderTime: string,
  totalDeliveryPrice: number
) => {
  const orderDateTime = new Date(orderTime);
  const isFriday = orderDateTime.getDay() === 5; // 5 is Friday
  const isTimeInRange =
    orderDateTime.getHours() >= 15 && orderDateTime.getHours() <= 19;

  return isFriday && isTimeInRange ? totalDeliveryPrice * 0.2 : 0;
};

export const CalculateDeliveryPrice = (
  cartValue: number,
  deliveryDistance: number,
  numberOfItems: number,
  orderTime: string,
  setPriceState: React.Dispatch<React.SetStateAction<CalculatedState>>
) => {
  if (
    cartValue < 0 ||
    deliveryDistance < 0 ||
    numberOfItems <= 0 ||
    orderTime === ""
  ) {
    alert(
      "Please fill in all required fields before calculating.\nCart value must be 0 or over\nDistance must be 0 or over\nNumber of itmes must be 1 or over"
    );
    return;
  }

  // Calculate individual surcharges
  const cartSurcharge = calculateCartSurcharge(cartValue);
  const deliveryCharge = calculateDeliveryCharge(deliveryDistance);
  const itemSurcharge = calculateItemSurcharge(numberOfItems);

  // Calculate total delivery price without rush hour charge
  const totalDeliveryPrice = cartSurcharge + deliveryCharge + itemSurcharge;

  // Apply rush hour charge if needed
  const rushHourCharge = calculateRushHourCharge(orderTime, totalDeliveryPrice);

  // Calculate final delivery price with rush hour charge
  let finalDeliveryPrice = 0;
  if (cartValue < 200)
    finalDeliveryPrice = Math.min(totalDeliveryPrice + rushHourCharge, 15);

  setPriceState((prev) => ({
    ...prev,
    cartSurcharge,
    deliveryCharge,
    itemSurcharge,
    rushHourCharge,
    deliveryPrice: finalDeliveryPrice,
  }));
};
