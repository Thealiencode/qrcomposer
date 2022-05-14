async function get_qr(element){
    console.log(element)
    url = element.value

    response = await fetch(`/generator.php?url=${url}`)
    qrData = await response.json()

    console.log(qrData);
    document.querySelector('#preview__content').innerHTML = qrData.data;
}


function saveAsSvg(){
    source = document.querySelector('#preview__content').innerHTML
	var el = document.createElement("a");
	el.setAttribute("href", "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source));
	el.setAttribute("download", 'QRcode.svg');
	document.body.appendChild(el);
 	el.click();
	el.remove();
}

function saveSVGAsPNG(){
    const canvas = document.createElement("canvas");
    // svg data
    const svg =  document.querySelector('#preview__content').innerHTML
    const svgEl =  document.querySelector('#preview__content svg')

    // get wudth and height of svg
    const w = parseInt(svgEl.getAttribute('width'));
    const h = parseInt(svgEl.getAttribute('height'));

    const img_to_download = document.createElement('img');
    img_to_download.src ="data:image/svg+xml;charset=utf-8,"+ encodeURIComponent(svg);

    img_to_download.onload = function () {
      canvas.setAttribute('width', w);
      canvas.setAttribute('height', h);
      const context = canvas.getContext("2d");
      //context.clearRect(0, 0, w, h);
      context.drawImage(img_to_download,0,0,w,h);
      const dataURL = canvas.toDataURL('image/png');
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(), "qrcode.png");
        e.preventDefault();
      } else {
        const a = document.createElement('a');
        a.download = 'qrcode.png';
        a.href = dataURL;
        a.click();
      }
    }
}