<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\User;

class ForgotLoginNotification extends Notification
{
    use Queueable;

    public function __construct(public User $user) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $cpf = $this->user->cpf_formatado ?? $this->user->cpf;

        return (new MailMessage)
            ->subject('Seu login (CPF)')
            ->greeting('Olá!')
            ->line('Você solicitou lembrar seu login (CPF).')
            ->line('CPF cadastrado: '.$cpf)
            ->line('Se não foi você, pode ignorar este e-mail.');
    }
}
