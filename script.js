let filter ={
    Brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    Contrast:{
         value:100,
        min:0,
        max:200,
         unit:"%"
    },
    Saturation:{
       value:100,
        min:0,
        max:200,
         unit:"%"
    },
    HueRotation:{
         value:0,
        min:0,
        max:360,
         unit:"deg"
    },
    Blur:{
           value:0,
        min:0,
        max:20,
         unit:"px"
    },
    Grayscale:{
           value:0,
        min:0,
        max:100,
         unit:"%"
    },
    Sepia:{
          value:0,
        min:0,
        max:100,
         unit:"%"
    },
    Opacity:{
          value:100,
        min:0,
        max:100,
         unit:"%"
    },
    Invert:{
          value:0,
        min:0,
        max:100,
         unit:"%"
    }

};
const filters = document.querySelector(".filters");
let canvas = document.querySelector(".image-canvas");
let imageinput = document.querySelector("#file");
let canvasCtx = canvas.getContext("2d");
let file = null;
let image = null;
let reset = document.querySelector('#reset-btn');
let download = document.querySelector('#down-btn');

function createfilter(name,min,max,value,unit){
    let div = document.createElement("div");
    div.classList.add("filter");
    let label = document.createElement("label")
    label.innerHTML = name;
    let input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.name = name;
    input.value = value;

    input.addEventListener("input",(e)=>{
       
        filter[name].value = e.target.value; 
        applyfilter()
    })

    div.appendChild(label);
    div.appendChild(input);
    filters.appendChild(div)
    
}
function createfilterelement(){
    Object.keys(filter).forEach((val)=>{
  createfilter(val,filter[val].min,filter[val].max, filter[val].value,filter[val].unit)
           
});
}
createfilterelement()
imageinput.addEventListener("change",(e)=>{
  let file = e.target.files[0];
 let placeholder = document.querySelector(".placeholder")
 placeholder.style.display = "none"
  const img = new Image()
    img.src = URL.createObjectURL(file);

    img.onload = ()=>{
        image = img;
        canvas.width = img.width;
        canvas.height = img.height;
        canvasCtx.drawImage(img,0,0);
    }
   
})
function applyfilter(){
    canvasCtx.clearRect(0,0,canvas.width,canvas.height);
    canvasCtx.filter=`
    brightness(${filter.Brightness.value}${filter.Brightness.unit})
    contrast(${filter.Contrast.value}${filter.Contrast.unit})
    saturate(${filter.Saturation.value}${filter.Saturation.unit})
    hue-rotate(${filter.HueRotation.value}${filter.HueRotation.unit})
    blur(${filter.Blur.value}${filter.Blur.unit})
    grayscale(${filter.Grayscale.value}${filter.Grayscale.unit})
    sepia(${filter.Sepia.value}${filter.Sepia.unit})
    opacity(${filter.Opacity.value}${filter.Opacity.unit})
    invert(${filter.Invert.value}${filter.Invert.unit})
    `.trim()
    canvasCtx.drawImage(image,0,0)
}
reset.addEventListener("click",()=>{
   filter ={
    Brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    Contrast:{
         value:100,
        min:0,
        max:200,
         unit:"%"
    },
    Saturation:{
       value:100,
        min:0,
        max:200,
         unit:"%"
    },
    HueRotation:{
         value:0,
        min:0,
        max:360,
         unit:"deg"
    },
    Blur:{
           value:0,
        min:0,
        max:20,
         unit:"px"
    },
    Grayscale:{
           value:0,
        min:0,
        max:100,
         unit:"%"
    },
    Sepia:{
          value:0,
        min:0,
        max:100,
         unit:"%"
    },
    Opacity:{
          value:100,
        min:0,
        max:100,
         unit:"%"
    },
    Invert:{
          value:0,
        min:0,
        max:100,
         unit:"%"
    }

};
applyfilter();
filters.innerHTML = "";
createfilterelement();
})

download.addEventListener("click",()=>{
    const link = document.createElement("a");
    link.download = "edited-image by website";
    link.href = canvas.toDataURL()
    link.click()
})