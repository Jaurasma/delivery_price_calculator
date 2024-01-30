import React, { useState } from "react";
import { calculateDeliveryPrice } from "./calculateDeliveryPrice";
import InputField from "./InputField";
import TimeInputField from "./TimeInputField";

import "./App.css";

function getCurrentDateTime() {
  const now = new Date();
  // Format the current date and time as "YYYY-MM-DDTHH:mm" for the input value, no need for seconds?
  return now.toISOString().slice(0, 16);
}

interface CalculatedState {
  cartSurcharge: number;
  deliveryCharge: number;
  itemSurcharge: number;
  rushHourCharge: number;
  deliveryPrice: number;
}

function DeliveryCalculator() {
  const calculatedState: CalculatedState = {
    cartSurcharge: 0,
    deliveryCharge: 0,
    itemSurcharge: 0,
    rushHourCharge: 0,
    deliveryPrice: 0,
  };

  const [priceState, setPriceState] =
    useState<CalculatedState>(calculatedState);

  const [cartValue, setCartValue] = useState(0);
  const [deliveryDistance, setDeliveryDistance] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [orderTime, setOrderTime] = useState(getCurrentDateTime());

  const [breakdownVisible, setBreakdownVisible] = useState(false);

  const toggleBreakdown = () => setBreakdownVisible((prev) => !prev);

  const handleCalculateDeliveryPrice = () => {
    calculateDeliveryPrice(
      cartValue,
      deliveryDistance,
      numberOfItems,
      orderTime,
      setPriceState
    );
  };

  return (
    <div className="DeliveryCalculator ">
      <form>
        <header>
          <h1 className="text-center text-lg divide-x-8 ">
            Delivery Fee Calculator
          </h1>
        </header>
        <InputField
          label="💰 Cart value (€)"
          name="cartValue"
          type="number"
          placeholder="Value of your cart"
          ariaLabel="Cart value in euros"
          min={0}
          dataTestId="cartValue"
          value={cartValue}
          additionalInfo="Small order surcharge limit: 10,00€"
          onChange={setCartValue}
        />
        <InputField
          label="📍 Delivery distance (m)"
          name="deliveryDistance"
          type="number"
          placeholder="Delivery distance of your order"
          ariaLabel="Delivery distance in meters"
          min={0}
          step={100}
          dataTestId="deliveryDistance"
          value={deliveryDistance}
          additionalInfo="Delivery cost: 2,00€ Long delivery surcharge limit 1000m"
          onChange={setDeliveryDistance}
        />
        <InputField
          label="🛒 Amount of items"
          name="numberOfItems"
          type="number"
          placeholder="Number of itmes in your cart"
          ariaLabel="Number of items"
          min={1}
          step={1}
          dataTestId="numberOfItems"
          value={numberOfItems}
          additionalInfo="Item surcharge limit: 4"
          onChange={setNumberOfItems}
        />
        <TimeInputField
          label="⏰ Time"
          name="orderTime"
          type="datetime-local"
          ariaLabel="Order time"
          dataTestId="orderTime"
          value={orderTime}
          additionalInfo="Fridays 15.00-19.00 prices are multiplied to 1.2x"
          onChange={setOrderTime}
        />
        <button
          type="button"
          name="calcualationButton"
          className="text-black p-2 m-2.5 bg-sky-400 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-full mx-auto block"
          onClick={handleCalculateDeliveryPrice}
        >
          Calculate Delivery Price
        </button>
        <p className="text-center border text-lg	border-gray-300 p-2">
          Delivery price: {priceState.deliveryPrice} €
        </p>
        <button
          type="button"
          onClick={toggleBreakdown}
          className="text-sm text-black p-2 m-2.5 bg-sky-400 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-full mx-auto block"
        >
          {breakdownVisible ? "Hide Breakdown 🔺" : "Show Breakdown 🔻"}
        </button>
        {breakdownVisible && (
          <div className="text-sm text-center">
            <p>Cart value surcharge: {priceState.cartSurcharge} €</p>
            <p>Distance charge: {priceState.deliveryCharge} €</p>
            <p>Item surcharge: {priceState.itemSurcharge} €</p>
            <p>Rushhour charge: {priceState.rushHourCharge} €</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default DeliveryCalculator;
