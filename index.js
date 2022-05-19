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
            <input type="hidden" value="link" name="type">
            <div class="form-group">
                <label >Target Url:</label>
                <input type="url" placeholder="https://example.com" oninput="get_qr(this)" value="">
            </div>
            `
            break;

        case 'email':
            html = `
            <input type="hidden" value="email" name="type">

            <div class="form-group">
            <label>Email Content</label>
                <input type="email" placeholder="Your Email Address" name="email" value="">
            </div>
            <div class="form-group">
                <input type="text" placeholder="Email Subject" name="subject">
            </div>
            <div class="form-group">
                <textarea placeholder="Email Body" name="body" rows="8"></textarea>
            </div>
            <small>Scaning this qrcode will send this email</small>
            <div class="form-group">
                <button class="btn" type="Submit"><i class="fa-solid fa-gears"></i> Generate</button>
            </div>

            `
            break;
        case 'phone':
            html = `
            <input type="hidden" value="phone" name="type">

            <div style="display: grid; grid-template-columns: repeat(auto-fill, 30% 68%); gap:2%">
            
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
            <div class="form-group">
                <button class="btn" type="Submit"><i class="fa-solid fa-gears"></i> Generate</button>
            </div>
            `
            break
        case 'text':
            html = `
            <input type="hidden" value="text" name="type>

                <div class="form-group">
                    <label >Text:</label>
                    <textarea type="text" placeholder="Enter Message" oninput="get_qr(this)"></textarea> 
                </div>

                <div class="form-group">
                <button class="btn" type="Submit"><i class="fa-solid fa-gears"></i> Generate</button>
            </div>
                `
            break;
        case 'sms':
            html = `
            <input type="hidden" value="sms" name="type">

            <div style="display: grid; grid-template-columns: 30% 68%; gap:2%">
                <div class="form-group" >
                    <label class="form-lbl">Country Code:</label>
                    <input type="text" placeholder="+234" oninput="get_qr(this)">
                </div>
                <div class="form-group">
                    <label class="form-lbl">Phone Number:</label>
                    <input type="number" placeholder="90876567656" oninput="get_qr(this)">
                </div>
            </div>
            <div class="form-group">
                <label >Text:</label>
                <textarea type="text" placeholder="Enter Message" oninput="get_qr(this)"></textarea> 
            </div>


            
            <small>Scanning this code will send an sms this number</small>
            <div class="form-group">
                <button class="btn" type="Submit"><i class="fa-solid fa-gears"></i> Generate</button>
            </div>
            `
            break

        case 'wifi':
           html =  `
            <input type="hidden" value="wifi" name="type">

                <div class="col-3">
                
                    <div class="form-group" >
                        <label >Network name</label>
                        <input type="text" name="ssid" placeholder="SSID">
                    </div>
                    <div class="form-group">
                        <label >Security Type:</label>
                        <select name="encryption">
                            <option>None</option>
                            <option>WEB</option>
                            <option>WPA/WPA2</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label >Password:</label>
                        <input name="password" type="password" placeholder="wifi password">
                    </div>
                </div>
                <div class="" style="margin-top:2rem">
                    <label>Hidden</label>
                    <input type="checkbox" name="hidden" value="true">
                </div>
                <small>Scanning this code will connect to this network</small>
                <div class="form-group">
                    <button class="btn" type="Submit"><i class="fa-solid fa-gears"></i> Generate</button>
                </div>
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


document.querySelector('#form-area').addEventListener('submit', async(e) => {

    e.preventDefault()
    form = e.target
    formData = new FormData(form);
    queryString = new URLSearchParams(formData).toString();
    
    
    response = await fetch(`/generator.php?`+queryString)
    qrData = await response.json()
    
    console.log(qrData);
    document.querySelector('#preview__content').innerHTML = qrData.data;
})





