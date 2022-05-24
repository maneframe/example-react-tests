import React from "react";
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import PINLock from "./PINLock";

describe('leaving react unmocked', () => {
  const clickNumber = (number) => {
    const button = screen.getByRole('button', {name: number})
    userEvent.click(button);
  }

  const checkResult = () => {
    userEvent.click(screen.getByRole('button', {name: "Check"}))
  }

  it("shows buttons", () => {
    render(<PINLock/>)
    expect(screen.getAllByRole('button').map((b) => b.innerHTML)).toEqual(['1', '2', '3', '4', 'Check'])
  })

  it("adds to the code", () => {
    render(<PINLock/>)
    clickNumber(1)
    clickNumber(2)
    expect(screen.getByText("**")).toBeInTheDocument()
  })

  it("shows failure if code is incorrect", () => {
    const onUnlock = jest.fn();
    render(<PINLock onUnlock={onUnlock} />)
    clickNumber(1)
    checkResult()
    expect(screen.getByText(/Try again!/)).toBeInTheDocument()
    expect(onUnlock).not.toHaveBeenCalled()
  })

  it("unlocks if code is correct", () => {
    const onUnlock = jest.fn();
    render(<PINLock onUnlock={onUnlock} />)

    clickNumber(4)
    clickNumber(3)
    clickNumber(2)
    clickNumber(1)
    checkResult()

    expect(screen.queryByText(/Try again!/)).toBeNull()
    expect(onUnlock).toHaveBeenCalled()
  })
})
