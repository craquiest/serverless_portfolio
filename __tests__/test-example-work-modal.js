import React from 'react';
import { shallow } from 'enzyme';
import ExampleWorkModal from '../js/example-work-modal';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const myExample = {
    'title': "Coding",
    'href': "https://example.com",
    'desc': "The chief condition on which, life, health and vigor depend on, is action. It is by action that an organism develops its faculties, increases its energy, and attains the fulfillment of its destiny.",
    'image': {
        'desc': "example screenshot of a project involving code",
        'src': "images/example1.png",
        'comment': ""
    }
}


describe("ExampleWorkModal component", () => {
    let component = shallow(<ExampleWorkModal example={myExample} open={false}/>);
    let openComp = shallow(<ExampleWorkModal example={myExample} open={true}/>);

    let anchors = component.find("a");

    it("Should contain a single 'a' element", () => {
        expect(anchors.length).toEqual(1);
    });

    it('Should link to our project', () => {
        expect(anchors.prop('href')).toEqual(myExample.href);
        
    });

    it('Should have the modal class set properly', () => {
        expect(component.find(".background--skyBlue").hasClass("modal--closed"));
        expect(openComp.find(".background--skyBlue").hasClass("modal--open"));
    });

});