create database AICurtain;
use AICurtain;

create table User
(user_ID numeric(12,0),
password varchar(30),
primary key(user_ID));

create table Room
(room_ID numeric(12,0),
room_Name varchar(15),
primary key(room_ID));


create table Curtain
(curtain_ID numeric(12,0),
curtain_State int(1),
user_ID numeric(12,0),
room_ID numeric(12,0),
primary key(curtain_ID),
foreign key(user_ID) references User(user_ID));

create table Record
(record_ID numeric(12,0),
curtain_ID numeric(12,0),
Record_State int(1),
time date,
primary key(record_ID),
foreign key(curtain_ID) references Curtain(curtain_ID));