import React from 'react';
import { shallow } from 'enzyme';
import PINLock from "./PINLock";

describe('mocking react internals', () => {
  // https://snapdocs-eng.atlassian.net/wiki/spaces/~434669960/pages/1722974292/Unit+testing+React+components+with+Jest

  let setFailed, setCode, onUnlock, wrapper;
  const setMocks = (failed, code) => {
    onUnlock = jest.fn();
    setFailed = jest.fn();
    setCode = jest.fn();
    const mockStates = [failed, code] // has to be in same order as the `useState` calls in component
    const mockSetStates = [setFailed, setCode] // has to be in same order as the `useState` calls in component
    let mockStateInd = 0;
    jest.spyOn(React, 'useState')
      .mockImplementation(def => {
        return [mockStates[mockStateInd] || def, mockSetStates[mockStateInd++]]
      });
    wrapper = shallow(<PINLock onUnlock={onUnlock}/>);
  }

  describe('initial state', () => {
    beforeEach(() => setMocks());

    it('has number buttons', () => {
      expect(wrapper.find(".number")).toHaveLength(4)
    });

    it('adds to code with number', () => {
      const buttonOne = wrapper.find(".number").first()
      buttonOne.props().onClick()
      expect(setCode).toHaveBeenCalledWith([1])
    });
  })

  describe('with an incorrect code', () => {
    beforeEach(() => setMocks(false, [1, 2, 3]));

    it('fails on check', () => {
      const checkButton = wrapper.find(".check").first()
      checkButton.simulate('click')
      expect(setFailed).toHaveBeenCalledWith(true)
      expect(onUnlock).not.toHaveBeenCalled()
    });
  })

  describe('with a correct code', () => {
    beforeEach(() => setMocks(false, [4, 3, 2, 1]));

    it('unlocks on check', () => {
      const checkButton = wrapper.find(".check").first()
      checkButton.simulate('click')
      expect(onUnlock).toHaveBeenCalled()
    });
  })

  describe('with a failed state', () => {
    beforeEach(() => setMocks(true, []));

    it('shows a failed message', () => {
      expect(wrapper.text()).toMatch(/Try again/);
    });
  })
})
