<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="index.css">
    <link rel="shortcut icon" href"images/qrcode.png" type="image/x-icon">
    <title>QRCODE COMPOSER</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <nav>
        <div class="brand">
            <div class="brand-logo">
                <img src="images/qr-code.png"  alt="logo">
            </div>
            QRCODE COMPOSER</div>
    </nav>


   <div class="container container__content">
       <div class="form__content">
        <div class="qr-type">
            <button data-type="link" class="active" onclick="changeActiveState(this)"> <i class="fas fa-link"></i> Link</button>
            <button data-type="email" onclick="changeActiveState(this)"> <i class="fas fa-envelope"></i> Email</button>
            <button data-type="wifi" onclick="changeActiveState(this)"> <i class="fas fa-wifi"></i> Wifi</button>
            <button data-type="bitcoin" onclick="changeActiveState(this)"> <i class="fa-brands fa-bitcoin"></i> Bitcoin</button>
            <button data-type="phone" onclick="changeActiveState(this)"> <i class="fa-solid fa-phone-volume"></i> Phone</button>
            <button data-type="text" onclick="changeActiveState(this)"> <i class="fa-solid fa-align-justify"></i> Text</button>
            <button data-type="sms" onclick="changeActiveState(this)"> <i class="fas fa-sms"></i> Sms</button>
            <button data-type="whatsapp" onclick="changeActiveState(this)"> <i class="fa-brands fa-whatsapp"></i> whatsapp</button>
            <button data-type="v-card" onclick="changeActiveState(this)"> <i class="fa-solid fa-address-card"></i> V-card</button>
            <button data-type="geo" onclick="changeActiveState(this)"> <i class="fa-brands fa-bitcoin"></i> Geo Location</button>
        </div>

        <form id="form-area" onsubmit="onSubmit()">

            <div class="form-group">
                <label >Target Url:</label>
                <input type="url" placeholder="https://example.com" oninput="get_qr(this)" value="">
            </div>
        </form>
       </div>

       <div class="preview" >
           <div class="preview__content" id="preview__content">

               <svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="290px" height="290px" viewBox="-260 40 520 520" fill="#979696" style="width: 100%;" xml:space="preserve"><g><polygon id="XMLID_14_" class="st0" points="100,360 60,360 60,320 20.1,320 20.1,440.1 60,440.1 60,480 100,480 	"></polygon><rect id="XMLID_13_" x="100" y="480" class="st0" width="40" height="40"></rect><rect id="XMLID_12_" x="179.9" y="480" class="st0" width="40" height="40"></rect><polygon id="XMLID_11_" class="st0" points="220,320 179.9,320 179.9,360 139.9,360 139.9,480 179.9,480 179.9,440.1 220,440.1"></polygon><rect id="XMLID_10_" x="20.1" y="480" class="st0" width="40" height="40"></rect><g><rect id="XMLID_9_" x="-139.9" y="159.9" class="st0" width="40" height="40"></rect><path class="st0" d="M-220,80v200h199.9V80H-220z M-60,239.9h-119.9V120h120v119.9H-60z"></path></g><g><rect id="XMLID_6_" x="100" y="159.9" class="st0" width="40" height="40"></rect><path class="st0" d="M20.1,80v200H220V80H20.1z M179.9,239.9H60V120h120v119.9H179.9z"></path></g><g><rect id="XMLID_3_" x="-139.9" y="399.9" class="st0" width="40" height="40"></rect><path class="st0" d="M-220,320v200h199.9V320H-220z M-60,480h-119.9V360h120V480H-60z"></path></g></g></svg>
           </div>
           <div class="action_btns">
               <button onclick="saveSVGAsPNG()"> <i class="fa-solid fa-download"></i> Download PNG</button>
               <button onclick="saveAsSvg()" ><i class="fa-solid fa-download"></i> Download SVG</button>
           </div>
       </div>
   </div>

   <footer>
       <div class="copyright">
        <hr>
           Made with 🤍 By <a href="https://github.com/Thealiencode">Golden Moses</a> All Rights Reserved</footer>
       </div>


   <script src="index.js"></script>
</body>
</html>
