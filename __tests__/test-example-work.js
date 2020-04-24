import React from 'react';
import { shallow } from 'enzyme';
import ExampleWork, { ExampleWorkBubble } from '../js/example-work';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const myWork = [
    {
        'title': "Coding",
        'href': "https://example.com",
        'desc': "Leadership is solving problems. The day soldiers stop bringing you their problems is the day you have stopped leading them. They have either lost confidence that you can help or concluded you do not care. Either case is a failure of leadership.",
        'image': {
            'desc': "example screenshot of a project involving code",
            'src': "images/example1.png",
            'comment': ""
        }
    },
    {
        'title': "Machine Learning",
        'href': "https://example.com",
        'desc': "The chief condition on which, life, health and vigor depend on, is action. It is by action that an organism develops its faculties, increases its energy, and attains the fulfillment of its destiny.",
        'image': {
            'desc': "example screenshot of a machine learning project",
            'src': "images/example2.png",
            'comment': `“Chemistry” by Surian Soosay is licensed under CC BY 2.0
            https://www.flickr.com/photos/ssoosay/4097410999`
        }
    }
];

describe("ExampleWork component", () => {
    let component = shallow(<ExampleWork work={myWork} />)

    it("Should pass the obvious one.", () => {
        expect("value").toEqual("value");
        console.log(component.debug());
    });

    it("Should be an 'span' element", () => {
        expect(component.type()).toEqual('span');
    });
    
    it("Should contains as many children and there are work examples", () => {
        expect(component.find("ExampleWorkBubble").length).toEqual(myWork.length);
    });

    it('Should allow the modal to open and close', () => {
        component.instance().openModal();
        expect(component.instance().state.modalOpen).toBe(true);
        component.instance().closeModal();
        expect(component.instance().state.modalOpen).toBe(false);
    });
    
});

describe("ExampleWorkBubble component", () => {
    let mockOpenModalFn = jest.fn();

    let comp = shallow(<ExampleWorkBubble example={myWork[1]} 
                                    openModal= {mockOpenModalFn} />);
    let images = comp.find("img");

    it("Should contain a single 'img' element", () => {
        expect(images.length).toEqual(1);
    });

    it("Should have the image source and alt, and dt title set correctly", () => {
        expect(images.prop('src')).toEqual(myWork[1].image.src);
        expect(images.prop('alt')).toEqual(myWork[1].image.desc);
    });

    it("Should have the 'dt' title set correctly", () => {
        expect(comp.find("dt").prop('children')).toEqual(myWork[1].title);
    });

    it('Should call the openModal handler when clicked', () => {
        comp.find(".section__exampleWrapper").simulate('click');
        expect(mockOpenModalFn).toHaveBeenCalled();
    });

});