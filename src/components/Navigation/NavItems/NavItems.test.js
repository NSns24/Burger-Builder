import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavItems from './NavItems';
import NavItem from './NavItem/NavItem';

configure({ adapter: new Adapter() });

describe('<NavItems />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavItems />);
    });

    it('should render two <NavItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavItem)).toHaveLength(2);
    });

    it('should render three <NavItem /> elements if authenticated', () => {
        wrapper.setProps({ isAuth: true });
        expect(wrapper.find(NavItem)).toHaveLength(3);
    });

    it('should render Logout <NavItem /> element if authenticated', () => {
        wrapper.setProps({ isAuth: true });
        expect(wrapper.contains(<NavItem link="/logout">Logout</NavItem>)).toEqual(true)
    });
});