// import react and react-dom
import React from 'react';
import ReactDOM from 'react-dom';

// import our main components. 
// Don't forget to export it in definition file
import ExampleWork from './example-work';

// create data structure we will pass to components 
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
    },
    {
        'title': "Writing",
        'href': "https://example.com",
        'desc':  "Great leaders are almost always great simplifiers, who can cut through argument, debate and doubt, to offer a solution everybody can understand.",
        'image': {
            'desc': "example screenshot of published report on Japan ",
            'src': "images/Lamine_Portrait.PNG",
            'comment': ` “Bengal cat” by roberto shabs is  licensed under CC BY 2.0
            https://www.flickr.com/photos/37287295@N00/2540855181 `
        }
    }
];




// Render our main components
ReactDOM.render(<ExampleWork work={myWork} />, document.querySelector("#example-work"));
// ReactDOM.render(<ExampleWork />, document.getElementById("example-work"));