import React, { useState } from "react";
import "./App.css";

function getCurrentDateTime() {
  const now = new Date();
  // Format the current date and time as "YYYY-MM-DDTHH:mm" for the input value, no need for seconds?
  return now.toISOString().slice(0, 16);
}

function DeliveryCalculator() {
  const initialState = {
    cartValue: "",
    deliveryDistance: 0,
    numberOfItems: 1,
    orderTime: getCurrentDateTime(),
  };

  const calculatedState = {
    showBreakdown: false,
    cartSurcharge: 0,
    deliveryCharge: 0,
    itemSurcharge: 0,
    rushHourCharge: 0,
    deliveryPrice: 0,
  };

  const [state, setState] = useState(initialState);
  const [priceState, setPriceState] = useState(calculatedState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "orderTime") {
      setState((prev) => ({ ...prev, [name]: value }));
    } else {
      const isValidNumber = /^\d*\.?\d*$/.test(value);
      if (isValidNumber || value === "") {
        setState((prev) => ({
          ...prev,
          [name]: name === "cartValue" ? value : Number(value),
        }));
      }
    }
  };

  const changeBrakedownStatus = () => {
    setPriceState((prev) => ({
      ...prev,
      showBreakdown: !prev.showBreakdown, // Toggle the value of showBreakdown
    }));
  };

  const calculateDeliveryPrice = () => {
    if (
      state.cartValue.trim() === "" ||
      state.deliveryDistance < 0 ||
      state.numberOfItems <= 0 ||
      state.orderTime === ""
    ) {
      alert("Please fill in all required fields before calculating.");
      return; // Stop the calculation if any field is empty
    }
    // Calculate individual surcharges
    const cartSurcharge = Math.max(10 - parseFloat(state.cartValue), 0);
    const deliveryCharge =
      state.deliveryDistance <= 1000
        ? 2
        : 2 + Math.ceil((state.deliveryDistance - 1000) / 500);
    const itemSurcharge = Math.max(state.numberOfItems - 4, 0) * 0.5;

    // Calculate total delivery price without rush hour charge
    const totalDeliveryPrice = cartSurcharge + deliveryCharge + itemSurcharge;

    // Apply rush hour charge if applicable
    const orderDateTime = new Date(state.orderTime);
    const isFriday = orderDateTime.getDay() === 5; // 5 is Friday
    const isTimeInRange =
      orderDateTime.getHours() >= 15 && orderDateTime.getHours() < 19;

    let rushHourCharge = 0;

    if (isFriday && isTimeInRange) {
      rushHourCharge = totalDeliveryPrice * 0.2;
    }

    // Calculate final delivery price with rush hour charge
    const finalDeliveryPrice = Math.min(
      totalDeliveryPrice + rushHourCharge,
      15
    );

    // Set the updated state in a single call
    setPriceState((prev) => ({
      ...prev,
      cartSurcharge,
      deliveryCharge,
      itemSurcharge,
      rushHourCharge,
      deliveryPrice: finalDeliveryPrice,
    }));

    // Handle special cases (cartValue >= 200)
    if (parseFloat(state.cartValue) >= 200) {
      setPriceState((prev) => ({
        ...prev,
        deliveryPrice: 0,
      }));
    }
  };

  return (
    <div className="DeliveryCalculator">
      <form>
        <header>
          <h3 className="text-center border-2 border-gray-300">
            Delivery fee calculator
          </h3>
        </header>
        <label>
          Cart value (€)*
          <input
            name="cartValue"
            placeholder="Value of your cart"
            aria-label="Cart value in euros"
            type="text"
            data-test-id="cartValue"
            value={state.cartValue}
            onChange={handleChange}
          />
        </label>
        <label>
          Delivery distance (m)*
          <input
            name="deliveryDistance"
            type="number"
            aria-label="Delivery distance in meters"
            min="0"
            step="100"
            data-test-id="deliveryDistance"
            value={state.deliveryDistance}
            onChange={handleChange}
          />
        </label>
        <label>
          Amount of items*
          <input
            name="numberOfItems"
            type="number"
            aria-label="Number of items"
            min="1"
            data-test-id="numberOfItems"
            value={state.numberOfItems}
            onChange={handleChange}
          />
        </label>
        <label>
          Time*
          <input
            name="orderTime"
            type="datetime-local"
            aria-label="Order time"
            data-test-id="orderTime"
            value={state.orderTime}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={calculateDeliveryPrice}>
          Calculate Delivery Price
        </button>
        <p className="text-center border-2	border-gray-300">
          Delivery price: {priceState.deliveryPrice} €
        </p>
        <div>
          <button type="button" onClick={changeBrakedownStatus}>
            {priceState.showBreakdown ? "Hide Breakdown" : "Show Breakdown"}
          </button>
          {priceState.showBreakdown && (
            <>
              <p>Cart value surcharge: {priceState.cartSurcharge} €</p>
              <p>Distance charge: {priceState.deliveryCharge} €</p>
              <p>Item surcharge: {priceState.itemSurcharge} €</p>
              <p>Rushhour charge: {priceState.rushHourCharge} €</p>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default DeliveryCalculator;
