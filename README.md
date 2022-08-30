# Chat-App

This application is currently under development.

The goal of this project is to build a simple chat application that allows users to chat to other users. The main focus is to learn and 
gain a better understanding of MongoDB as well as web sockets. 

# Features
* Users can signup/login/logout
* Users can create/delete/edit/view chat rooms where other users can join to talk
* Users will not be able to edit or delete individual messages

# Stretch Goals
* Maybe add the ability for users to search and invite other users to join a room who can either accept or decline.

# Database Design

* Three separate collections
* Users, Chat_Room, Messages
* Users will have many Chat_rooms and many Messages
* A Chat_Room will have many Users and many Messages
* Messages will relate to a user as well as chat rooms that contain those messages

# CSS Design
* Css frameworks in consideration: bootstrap, trailwind, materialui

# Redux state
* I want to store current users that are logged on in redux state. 
* On application load, I can query for all of a Users chatrooms/messages and have them loaded into state. 
