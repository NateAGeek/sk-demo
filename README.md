# Skolem Demo
This is a demo app calculator that can convert between ETH, GWEI, and WEI. The app allows the user to do basic operations in WEI and then run calculations on the inputs, then can change and do further calculations with other currencies. The app supports mobile and desktop views.

Live: https://skdemo-nateageek.netlify.app/

## A to Z Approach
I have worked in fairly large and small teams (ranging from 2 - 8). I usually have different phases: Discovery, Design, and Implementation.
Discovery
Working with currencies in the past, I knew I would need a library to handle long decimals. Javascript is notoriously inaccurate with "floating" primitive Number.

I was originally using was planning on using dinero.js to handle currencies and conversions. However, I think the library was primarily used for currencies with only 2 decimal places. 

I ended up looking into web3.js as a reference to figure out how they store long decimals. It seems they use bn.js and handle the conversions internally.

Also, I had to look into the standards of the way ETH, GWEI, and WEI are implemented. They truncate anything over the 9th or 18th decimal place. 

## Design
Figma Design: https://www.figma.com/file/RgE8Dy2x61N02tDUtqfsfL/Application?node-id=0%3A1

The design was fairly straightforward. I wanted to find a nice color scheme and built it using some popular crypto colors. I also used Dribbble.com and the iOS calculator for my inspiration for UI/UX. I ended up starting my design process with the different view modes for common devices: iPhone SE, iPhone Pro, IPad, and Desktop. I built out the various components, Buttons, display, and Conversions Buttons.

## Challenges
Having used dinero.js I thought it would be a great fit and allow me to quickly and easily switch between different currencies and accurately do calculations. However, as I mentioned earlier, it did not play as nicely with multiple decimals. Also, the division system was hard to use accurately for large decimal points. I ended up trying to take my dinero.js implementation and work it around bn.js. I think I should have scrapped the original implementation and then just worked with BN. I ended up doing that for the most part and making everything converted into a base WEI and then built outputs from there. 

Had a minor issue with flex-grow and flex-shrink around the calculation history, as I wanted it to have a fixed height but expand as much as possible. I could do a post-render height calculation and then fix the height, however, I did not want to risk any weird cross-platform glitches at this stage.

Also, need to calculate the font height base on the width of the input field and the width required for the input. This could be accomplished, but I think this is out of scope and could lead to longer development time than allowed. 
