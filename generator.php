<?php 

    require_once realpath('vendor/autoload.php');

    use SimpleSoftwareIO\QrCode\Generator;

    $type = $_GET['type'] ?? '';

    $qrcode = new Generator;
    switch($type){

        case('wifi'):
           $data = $qrcode->size(280)->wiFi([
                'encryption' => $_GET['encryption'],
                'ssid' => $_GET['ssid'],
                'password' => $_GET['password'],
                'hidden' => $_GET['hidden'] ?? 'false',
            ]);

            break;

        case "email":
            // $data = $qrcode->size(280)->email($_GET['to'], "{$_GET['subject']}" ?? '', $_GET['body'] ?? '');
            $data = $qrcode->size(280)->generate("mailto:{$_GET['to']}?subject={$_GET['subject']}&body={$_GET['body']}");
            break;

        case "bitcoin":
            $data = $qrcode->size(280)->BTC($_GET['address'], $_GET['amount']);
            break;

        case 'phone':
            $data = $qrcode->size(280)->phoneNumber($_GET['countrycode'].$_GET['phonenumber']);
            break;
        
        case 'sms':
            $data = $qrcode->size(280)->SMS($_GET['countrycode'].$_GET['phonenumber'], $_GET['body']);
            break;

        case 'whatsapp':
            $data = $qrcode->size(280)->generate("https://wa.me/{$_GET['countrycode']}{$_GET['phonenumber']}?text={$_GET['message']}");
            break;
        case 'geo':
            $data = $qrcode->size(280)->geo($_GET['latitude'], $_GET['longitude']);
            break;

        case 'vcard':
            $data = $qrcode->size(280)->generate("
            BEGIN:VCARDVERSION:2.1N;CHARSET=UTF-8:{$_GET['lname']};{$_GET['fname']}FN;CHARSET=UTF-8:{$_GET['fname']} {$_GET['lname']}TEL;CELL:{$_GET['cell']}TEL;HOME;VOICE:{$_GET['home']}ORG;CHARSET=UTF-8:{$_GET['company']}ADR;CHARSET=UTF-8;WORK;PREF:;;{$_GET['address']};{$_GET['city']};{$_GET['zipcode']};{$_GET['country']}EMAIL:{$_GET['email']}URL:{$_GET['url']}END:VCARD");
            break;
        default: 

            $data = $qrcode->size(280)->generate($_GET['url']);
        }
        

    echo json_encode(['status' => "success", "data" => $data]);