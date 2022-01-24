import React from 'react';
import { shallow } from 'enzyme';
import RemoveModal from '../../components/RemoveModal';
import expenses from '../fixtures/expenses';

let handleRemoveYes, handleRemoveNo, removeClicked, wrapper;

beforeEach(() => {
    handleRemoveYes = jest.fn();
    handleRemoveNo = jest.fn();
    removeClicked = true;
    wrapper = shallow(<RemoveModal  
                                    removeClicked={removeClicked}
                                    handleRemoveYes={handleRemoveYes} 
                                    handleRemoveNo={handleRemoveNo} 
                                />);
});

test('should render RemoveModal correctly', () => {
    expect(wrapper).toMatchSnapshot();                                         
});

test('should handle remove expense if clicked Yes', () => {
    wrapper.find('button').at(0).simulate('click');
    expect(handleRemoveYes).toHaveBeenCalled();
});

test('should handle remove expense if clicked No', () => {
    wrapper.find('button').at(1).simulate('click');
    expect(handleRemoveNo).toHaveBeenCalled();
});