#!/usr/bin/python

#CGI getting POST variables
import cgi
form = cgi.FieldStorage()
name = form["name"]
phone  = form["user_phone"]

#call mail function
mail("olexandr.kara@gmail.com",
   "Перезвоните мне",
   "Имя клиентки: "name+"; Её мобильный: "+phone)


# импорт нужных модулей для работы с почтой
import smtplib
import os

#Ваши данные мейл и пароль от gmail ящика
gmail_user = "kiev.tatuazh@gmail.com"
gmail_password = "karaanna"

# главная функция принимающая 3 параметра
# адресат, тему письма, само сообщение 
def mail(to, subject, text):

# инициализируем наши данные
   msg['From'] = gmail_user
   msg['To'] = to
   msg['Subject'] = subject

# инициализируем smtp сервер и отправляем письмо
   mailServer = smtplib.SMTP("smtp.gmail.com", 587)
   mailServer.ehlo()
   mailServer.starttls()
   mailServer.ehlo()
   mailServer.login(gmail_user, gmail_pwd)
   mailServer.sendmail(gmail_user, to, msg.as_string())
   mailServer.close()
