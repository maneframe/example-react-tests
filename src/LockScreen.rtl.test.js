import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import LockScreen from "./LockScreen";
import PINLock from "./PINLock";

jest.mock('./PINLock');

describe('leaving react unmocked', () => {
  beforeEach(() => {
    PINLock.mockImplementation(({onUnlock}) => {
      return <button onClick={onUnlock}>Unlock Me</button>
    })
  })

  it('unlocks if onUnlock is called', () => {
    render(<LockScreen>success</LockScreen>)
    const button = screen.getByRole('button', {name: "Unlock Me"})
    userEvent.click(button)
    expect(screen.getByText(/success/)).toBeInTheDocument()
  });
})

// describe('leaving react unmocked', () => {
//   it('unlocks if onUnlock is called', () => {
//     render(<LockScreen>success</LockScreen>)
//     const button = screen.getByRole('button', {name: "Check"})
//     expect(button).toBeInTheDocument()
//   });
// })
