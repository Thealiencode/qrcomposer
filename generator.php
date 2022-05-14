<?php 

    require_once realpath('vendor/autoload.php');

    use SimpleSoftwareIO\QrCode\Generator;

    $url = $_GET['url'];

    $qrcode = new Generator;

    $data = $qrcode->size(280)->generate($url);
    echo json_encode(['status' => "success", "data" => $data]);