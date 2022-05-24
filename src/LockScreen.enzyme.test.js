import React from 'react';
import { shallow } from 'enzyme';
import LockScreen from "./LockScreen";
import PINLock from "./PINLock";

describe('mocking react internals', () => {
  let setUnlocked, wrapper;
  const setMocks = (unlocked) => {
    setUnlocked = jest.fn();
    jest.spyOn(React, 'useState')
      .mockImplementation(def => {
        return [unlocked, setUnlocked]
      });
    wrapper = shallow(<LockScreen>success</LockScreen>);
  }

  it('shows lock if locked', () => {
    setMocks(false)
    const lock = wrapper.find(PINLock).first()
    lock.props().onUnlock()
    expect(setUnlocked).toHaveBeenCalledWith(true)
  });

  it('shows children if unlocked', () => {
    setMocks(true)
    expect(wrapper.text()).toMatch(/success/)
  });
})
