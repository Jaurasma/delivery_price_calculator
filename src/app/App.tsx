// DeliveryCalculator.tsx

import { useState } from "react";
import { CalculateDeliveryPrice } from "./CalculateDeliveryPrice";
import InputField from "../components/InputField";
import TimeInputField from "../components/TimeInputField";

// Function to get the current date and time formatted for input value
function getCurrentDateTime() {
  const now = new Date();
  return now.toISOString().slice(0, 16);
}

interface CalculatedState {
  cartSurcharge: number;
  deliveryCharge: number;
  itemSurcharge: number;
  rushHourCharge: number;
  deliveryPrice: number;
}

function App() {
  // State hooks
  const [priceState, setPriceState] = useState<CalculatedState>({
    cartSurcharge: 0,
    deliveryCharge: 0,
    itemSurcharge: 0,
    rushHourCharge: 0,
    deliveryPrice: 0,
  });
  const [cartValue, setCartValue] = useState(0);
  const [deliveryDistance, setDeliveryDistance] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [orderTime, setOrderTime] = useState(getCurrentDateTime());
  const [breakdownVisible, setBreakdownVisible] = useState(false);

  // Toggle visibility of the breakdown section
  const toggleBreakdown = () => setBreakdownVisible((prev) => !prev);

  // Function to handle the calculation of delivery price
  const handleCalculateDeliveryPrice = () => {
    CalculateDeliveryPrice(
      cartValue,
      deliveryDistance,
      numberOfItems,
      orderTime,
      setPriceState
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-sky-400 font-bold">
      <main className="text-white max-w-xs items-center w-full p-4 rounded shadow-xl shadow-sky-400/40 bg-gray-900">
        <header>
          <h1 className="text-center text-xl divide-x-8 ">
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
          step={0.01}
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
          additionalInfo="Base delivery fee: 2,00€ Long delivery surcharge limit 1000m"
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
          name="calculationButton"
          className="p-4 m-2.5 bg-sky-400 hover:bg-sky-500 text-white font-bold py-3 px-11 rounded-full mx-auto block"
          onClick={handleCalculateDeliveryPrice}
        >
          Calculate Delivery Price
        </button>
        <p className="text-center border text-lg rounded-full border-gray-300 p-2 m-4 flex flex-row items-center justify-center">
          <span>Delivery price:&nbsp;</span>
          <p data-testid="fee">{priceState.deliveryPrice.toFixed(2)}</p>
          <span>€</span>
        </p>
        <button
          type="button"
          name="breakdownButton"
          onClick={toggleBreakdown}
          className="text-sm p-1 text-white font-bold mx-auto block"
        >
          {breakdownVisible ? "Hide Breakdown 🔺" : "Show Breakdown 🔻"}
        </button>
        {breakdownVisible && (
          <div className="text-sm text-center">
            <p>Cart value surcharge: {priceState.cartSurcharge.toFixed(2)} €</p>
            <p>Distance charge: {priceState.deliveryCharge.toFixed(2)} €</p>
            <p>Item surcharge: {priceState.itemSurcharge.toFixed(2)} €</p>
            <p>Rushhour charge: {priceState.rushHourCharge.toFixed(2)} €</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
