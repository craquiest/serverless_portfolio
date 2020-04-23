import React from 'react';
import { shallow } from 'enzyme';
import ExampleWork, { ExampleWorkBubble } from '../js/example-work';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const myWork = [
    {
        'title': "Coding",
        'image': {
            'desc': "example screenshot of a project involving code",
            'src': "images/example1.png",
            'comment': ""
        }
    },
    {
        'title': "Machine Learning",
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

    it("Should be an 'section' element", () => {
        expect(component.type()).toEqual('section');
    });
    
    it("Should contains as many children and there are work examples", () => {
        expect(component.find("ExampleWorkBubble").length).toEqual(myWork.length);
    });
    
});

describe("ExampleWorkBubble component", () => {
    let comp = shallow(<ExampleWorkBubble example={myWork[1]} />);
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

});