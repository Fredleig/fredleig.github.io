<?php

namespace App\Components\mail;

use Swift_Mailer;
use Swift_Message;

class Mail
{
  private $mailer;

  public function __construct(Swift_Mailer $mailer)
  {
    $this->mailer = $mailer;
  }

  public function send($email, $body)
  {
    $message = (new Swift_Message('Мой турестичесий сайт'))
        ->setFrom(['grinding191@gmail.com' => 'Traveling'])
        ->setTo($email)
        ->setBody($body, 'text/html');

    return $this->mailer->send($message);
  }
}