import ColorThief from 'colorthief';
import getUrl from './iconUrl';

export default function(iconUrl, selector){
    const colorThief = new ColorThief();
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = ((event)=>{
        const parent = selector;
        parent.appendChild(event.target);
        const colors = colorThief.getColor(event.target);
        const palette = colorThief.getPalette(event.target);
        const colorsString = `${colors[0]},${colors[1]},${colors[2]}`;
        parent.style.backgroundColor = `rgba(${colorsString}, 0.2)`;
        parent.style.border = `10px solid rgba(${colorsString}, 0.1)`;
        parent.style.boxShadow = `0px 0px 30px 0px rgba(0,0,0,0.5)`

        const secondColor= `${palette[1][0]},${palette[1][1]},${palette[1][2]}`;
        event.target.style.backgroundColor = `rgba(${secondColor}, 0.1)`;
        event.target.style.borderRadius = "100%";
        event.target.style.boxShadow = `0px 0px 10px 0px rgba(${secondColor},0.4)`
    });
    image.src = getUrl(iconUrl);
    
}