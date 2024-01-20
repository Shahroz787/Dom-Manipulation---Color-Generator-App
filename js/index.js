/**
 * Date : 28-03-2022
 * Author Name : Sahed (Sariful Islam)
 * Description : This is the color customize & convertar application by using JavaScript functionalities.
 */



//globals Section
let toastContainer = null;



//onload handeler
window.onload = () => {
    main();
}

 

//main or boot function section,This function will take care of getting all the DOM references.
 function main () {
     //Dom references
     const generateRandomColorBtn = document.querySelector(".sectionHeaderAction");
     const colorModeHexInp = document.getElementById("input-hex");
     const colorSliderRed = document.getElementById("colorSliderRed");
     const colorSliderGreen = document.getElementById("colorSliderGreen");
     const colorSliderBlue = document.getElementById("colorSliderBlue");
     const copyToClipBoardBtn = document.getElementById("copy-to-clipboard");
     const colorModeRadio = document.getElementsByName("colorMode");
     


     //events listeners
     generateRandomColorBtn.addEventListener('click', handleGenerateRandomColorBtn);
     colorModeHexInp.addEventListener("keyup" , handleColorModeHexInput);
     colorSliderRed.addEventListener("change" , handleColorSliders);
     colorSliderGreen.addEventListener("change" , handleColorSliders);
     colorSliderBlue.addEventListener("change" , handleColorSliders);
     copyToClipBoardBtn.addEventListener("click" , function () {
     const mode =   getCheckedValueFromRadios( colorModeRadio );
     if ( mode == null ) {
         throw new Error("invalid radio input !");
     }
     
     
     
     if ( mode == hex ) {
const hexColor =  document.getElementById("input-hex").value;
window.navigator.clipboard.writeText(`#${hexColor}`);

     }else {
        const rgbColor = document.getElementById("input-rgb").value;
        window.navigator.clipboard.writeText(rgbColor);
     }


     }
 )



// copyBtn.addEventListener("click" , function() {
//    );

//     if ( toastContainer !== null ) {
// toastContainer.remove();
// toastContainer = null;
//     }

//     if ( isValidHex(output.value) ) {
//         generateToastMessage( `#${output.value} copied` );
//     }else{
//         alert("Invalid color code !");
//     }
// });




//Events handelers
function handleGenerateRandomColorBtn () {
    const color = generateColorDecimal();
    updateColorCodeToDom( color );
}

function handleColorModeHexInput ( e ) {
    const hexColor = e.target.value
    if ( hexColor ) {
      this.value = hexColor.toUpperCase();
  if (isValidHex(hexColor) ) {
      const color = hexToDecimalColors(hexColor);
      updateColorCodeToDom(color);
      }
        
    } 
}


function handleColorSliders () {
    const color = {
        red: parseInt(colorSliderRed.value),
        green: parseInt(colorSliderGreen.value),
        blue: parseInt(colorSliderBlue.value) 
    };
    updateColorCodeToDom(color);
}



//DOM functions
/**
 * generate and Dynamic Dom elements to show toast message
 * @param {string} msg 
 */
function generateToastMessage (msg) {
    toastContainer = document.createElement("toastContainer");
    toastContainer.innerText = msg;
    toastContainer.className = "toastMessage toast-message-slide-in";


toastContainer.addEventListener("click" , function() {
    toastContainer.classList.remove( "toast-message-slide-in");
    toastContainer.classList.add("toast-message-slide-out");


    toastContainer.addEventListener("animationend" , function(){
        toastContainer.remove();
        toastContainer = null;
    });
})

document.body.appendChild(toastContainer);
}


/**
 * find a checked elements from radio buttons
 * @param {array} nodes 
 * returns{string | null}
 */

function getCheckedValueFromRadios( nodes ) {
let checkedValue = null;
for ( let i = 0; i < nodes.length; i++ ) {
    if ( nodes[i].checked ) {
        checkedValue = nodes[i].value;
        break;
    }
}
return checkedValue;
}


/**
 * update dom elements to calculate color values
 * @param {object} color : ;
 */
function updateColorCodeToDom( color ) {
    const hexColor = generateHexColor( color );
const rgbColor =  generateRGBColor( color );
 

 document.querySelector(".colorDisplay").style.backgroundColor = `#${ hexColor }`;
 document.getElementById("input-hex").value = hexColor;
 document.getElementById("input-rgb").value = rgbColor;
document.getElementById("colorSliderRedLabel").innerHTML = color.red;
document.getElementById("colorSliderGreenLabel").innerHTML = color.green;
document.getElementById("colorSliderBlueLable").innerHTML = color.blue;
document.getElementById("colorSliderRed").value = color.red;
document.getElementById("colorSliderGreen").value = color.green;
document.getElementById("colorSliderBlue").value = color.blue;



};
 

//utils functions
/**
 * generate & and return three colors
 * @returns {object}
 */

 function generateColorDecimal() {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	return {
		red,
		green,
		blue
	};
}
 

/**
 * take a color of three decimal values and return a hexadecimal color code
 * @param {object}  color 
 * @returns {string}
 */
 function generateHexColor({red, green, blue } ) {
	const getTwoCode = (value) => {
		const hex = value.toString(16);
		return hex.length === 1 ? `0${hex}` : hex;
	};

	return `${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(
		blue
	)}`.toUpperCase();
}



/**
 * take a color of three decimal values and return a RGB color code
 * @param {object} color 
 * @returns {string}
 */
 function generateRGBColor({ red, green, blue }) {
	return `rgb(${red}, ${green}, ${blue})`;
}



/**
  * convert hex to decimal color object
  * @param {string} hex 
  * @returns{object}
  */
 function hexToDecimalColors ( hex ) {
    const red =  parseInt(hex.slice(0, 2), 16);
    const green = parseInt(hex.slice(2, 4), 16);
    const blue =parseInt(hex.slice(4), 16);
    
    return{
        red,
        green,
        blue,
    };
    }




/**
 * validate hex color
 * @param {string} color 
 * @returns {Boolean}
 */

 function isValidHex ( color ) {
    if ( color.length !== 6) return false;

    return /^[0-9A-Fa-f]{6}$/i.test(color);
}


}

