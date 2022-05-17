const CFonts = require('cfonts');
module.exports = async function CF(text,style,align_) {
  
    CFonts.say(text, {
      font: style,              // define the font face
      align: align_,              // define text alignment
      colors: ['red','blue'],         // define all colors
      background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
      letterSpacing: 1,           // define letter spacing
      lineHeight: 1,              // define the line height
      space: true,                // define if the output text should have empty lines on top and on the bottom
      maxLength: '0',             // define how many character can be on one line
      gradient: ['green','red','yellow','blue'],           // define your two gradient colors
      independentGradient: true, // define if you want to recalculate the gradient for each new line
      transitionGradient: true,  // define if this is a transition between colors directly
      env: 'node'                 // define the environment CFonts is being executed in
    });
  }