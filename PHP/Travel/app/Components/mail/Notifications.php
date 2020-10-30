<?php
namespace App\Components\mail;

class Notifications
{
    private $mailer;

    public function __construct(Mail $mailer)
    {
        $this->mailer = $mailer;
    }

    public function emailWasChanged($email, $selector, $token)
    {

        $link = config()['domain'].'verify_email?selector=' . \urlencode($selector) . '&token=' . \urlencode($token);
        $message = "Для подтверждения почты и доступа к админке перейдите по ссылке ниже <br><a href=\"$link\">Подтвердить почту</a>";
        $this->mailer->send($email, $message);
    }

    public function passwordReset($email, $selector, $token)
    {
        /// message = ссылка для подтвержденим
      //
        $link = config()['domain'].'password-recovery/form?selector=' . \urlencode($selector) . '&token=' . \urlencode($token);
        $message = "Перейдите по ссылке ниже для сброса пароля к вашей учетной записи <br><a href=\"$link\">Сброс пароля</a>";
        $this->mailer->send($email, $message); // используем вместо gtestovik39@gmail.com
    }


}