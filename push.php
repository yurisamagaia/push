<?php

//android
//$token = "c8vAVjAsnf4:APA91bG-qjuqQCQnVg9egjHv-LlewnAZLJt883D3g98KO67VgCYi4mzuQ7dvjt2uJ9WKyRDgTbhO374EPKXrhCM9QGWpwKMXMM0yPAhLXtJAoS_nAVJcCNfLSwh0Ln1WciEvrk16CDX0";
//IOS
//$token = "fnA2Rjb69xU:APA91bFQ_1g16zntXeWinl7TEIPati-_7aWfjIRtH8k7XzyYg5XQ2tR88lPdUp4GcKTeDGvRv0snMNoYfQX2_ungPPxnQZJIlUeaBMU_oKFMt6Cx9KvHNZsuO3kPbQkyFcRRnLmzubPt";
//Todos os dispositivos
$token = "/topics/alldoctors";

$title = "Faça já seu agendamento";
$message = "A ferramenta para facilitar seu agendamento de Consultas e Exames!";

$return = sendPush($token, $title, $message);

echo $return;

function sendPush($token, $title, $message) {

  $fields = 
  '{
    "to": "'.$token.'",
    "notification": {
      "tag": "1",
      "title": "'.$title.'",
      "body": "'.$message.'",
      "sound": "default",
      "color": "#cc242b",
      "icon": "push"
    }
  }';

  //URL Firebase para envio externo
  $url = 'https://fcm.googleapis.com/fcm/send';

  //Firebase (alldoctors07) Configurações do Projeto -> Cloud Messaging -> Chave do Servidor
  $server_key = 'AAAAjw9gGas:APA91bF4-YHrUUR8CmChGUN68ORW8wy5HuvPaIPqVcgTFrLDG7EijGrrW5xH801U050pwwodrdELOD5qwZKNCEySuxywviALfy10jRtHIh7pGF32OdPIGvZwvT_CQwJ3hxQDVKU5h4dD';

  $headers = array (
    "Authorization: key = {$server_key}",
    "Content-Type: application/json"
  );

  $ch = curl_init ();
  curl_setopt ( $ch, CURLOPT_URL, $url );
  curl_setopt ( $ch, CURLOPT_POST, true );
  curl_setopt ( $ch, CURLOPT_HTTPHEADER, $headers );
  curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
  curl_setopt ( $ch, CURLOPT_POSTFIELDS, $fields );

  $result = curl_exec ( $ch );
  echo $result;
  $result = json_decode($result);
  if(isset($result->success) || isset($result->message_id)){
    return true;
  }else{
    return false;
  }
  curl_close ( $ch );
}
?>
