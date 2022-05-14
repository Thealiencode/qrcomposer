function changeActiveState(element) {
    document.querySelector('.qr-type .active').classList.remove('active')

    element.classList.add('active')
    setUpTargetForm(element.getAttribute('data-type'))

}


var html;
function setUpTargetForm(type){
    switch(type){
        case 'link' : 
            html = `
            <div class="form-group">
                <label >Target Url:</label>
                <input type="url" placeholder="https://example.com" oninput="get_qr(this)" value="">
            </div>
            `
            break;

        case 'email':
            html = `
            <div class="form-group">
            <label>Email Content</label>
                <input type="email" placeholder="Your Email Address"  value="">
            </div>
            <div class="form-group">
                <input type="text" placeholder="Email Subject" oninput="">
            </div>
            <div class="form-group">
                <textarea placeholder="Email Body" oninput="" rows="8"></textarea>
            </div>
            <small>Scaning this qrcode will send this email</small>
            `
            break;
        case 'phone':
            html = `
            <div style="display: grid; grid-template-columns: 20% 75%; gap:5%">
            
                <div class="form-group" >
                    <label >Country Code:</label>
                    <input type="text" placeholder="+234" oninput="get_qr(this)">
                </div>
                <div class="form-group">
                    <label >Phone Number:</label>
                    <input type="number" placeholder="90876567656" oninput="get_qr(this)">
                </div>
            </div>
            <small>Scanning this code will send call this number</small>
            `
            break
        case 'text':
            html = `
                <div class="form-group">
                    <label >Text:</label>
                    <textarea type="text" placeholder="Enter Message" oninput="get_qr(this)"></textarea> 
                </div>
                `
            break;
        case 'sms':
            html = `
            <div style="display: grid; grid-template-columns: 20% 75%; gap:5%">
                <div class="form-group" >
                    <label >Country Code:</label>
                    <input type="text" placeholder="+234" oninput="get_qr(this)">
                </div>
                <div class="form-group">
                    <label >Phone Number:</label>
                    <input type="number" placeholder="90876567656" oninput="get_qr(this)">
                </div>
            </div>
            <div class="form-group">
                <label >Text:</label>
                <textarea type="text" placeholder="Enter Message" oninput="get_qr(this)"></textarea> 
            </div>


            
            <small>Scanning this code will send an sms this number</small>
            `
            break

        case 'wifi':
           html =  `
                <div style="display: grid; grid-template-columns: 30% 30% 30%; gap:5%">
                
                    <div class="form-group" >
                        <label >Network name</label>
                        <input type="text" placeholder="SSID">
                    </div>
                    <div class="form-group">
                        <label >Security Type:</label>
                        <select>
                            <option>None</option>
                            <option>WEB</option>
                            <option>WPA/WPA2</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label >Password:</label>
                        <input type="text" placeholder="wifi password">
                    </div>
                </div>
                <small>Scanning this code will connect to this network</small>
                `
            break;
        // case 'phone':
        // case 'whatsapp':
        // case 'v-card':
        // case 'geo':
        // case 'bitcoin':


    }

    document.querySelector('#form-area').innerHTML = html;
}




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

