<?php 

    require_once realpath('vendor/autoload.php');

    use SimpleSoftwareIO\QrCode\Generator;

    // $url = $_GET['url'];
    $type = $_GET['type'] ?? '';

    $qrcode = new Generator;
    switch($type){

        case('wifi'):
           $data = $qrcode->size(200)->wiFi([
                'encryption' => $_GET['encryption'],
                'ssid' => $_GET['ssid'],
                'password' => $_GET['password'],
                'hidden' => $_GET['hidden'] ?? 'false',
            ]);

            break;
        }
        
        // $data = $qrcode->size(280)->generate($url);

    echo json_encode(['status' => "success", "data" => $data]);