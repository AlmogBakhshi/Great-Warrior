/*
use master
go
drop database GreatWarrior
go 
*/   

/*
create database GreatWarrior
go

use GreatWarrior
go
*/

/* not in use
exec Sp_addType  'Code_General' , 'int' , 'not null'
exec Sp_addType  'Name_General' , 'nvarchar(20)' , 'not null'
exec Sp_addType  'Tiny_General' , 'tinyint' , 'not null'
go
*/

---------------------------------------------------------------------------------------------------------------------
------------------------------------------------------{ Table }------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
create table Players(
	Player_Email nvarchar(50) not null,
	Player_Name nvarchar(20),
	Player_Password nvarchar(max),
	Player_Score int
	)
go

create table Figures(
	Figure_Name nvarchar(20) not null,
	Figure_Image image,
	Figure_Attack tinyint,
	Figure_Defense tinyint
)
go


create table FiguresOfPlayer(
	Player_Email nvarchar(50) not null,
	Figure_Name nvarchar(20) not null,
	Figure_Level tinyint
)
go

create table FigureItems(
	FigureItem_Name nvarchar(20) not null,
	Item_Image image
)
go

create table FigureItemsByPlayer(
	Player_Email nvarchar(50) not null,
	Figure_Name nvarchar(20) not null,
	FigureItem_Name nvarchar(20) not null,
	Item_Level tinyint,
	Figure_Attack tinyint,
	Figure_Defense tinyint
)
go

create table PlayerGift(
	Gift_Code int not null,
	Player_Email nvarchar(50) not null,
	Gift_Level tinyint,
	Gift_Receive datetime
)
go

create table GamesHistory(
	Player_One_Email nvarchar(50) not null,
	Player_Two_Email nvarchar(50) not null,
	Game_Date datetime not null,
	Winner_Player nvarchar(50)
)
go

create table FiguresInGames(
	Player_One_Email nvarchar(50) not null,
	Player_Two_Email nvarchar(50) not null,
	Game_Date datetime not null,
	Player_Email nvarchar(50) not null,
	Figure_Name nvarchar(20) not null,
	Figure_Level tinyint,
)
go

create table Admins(
	Admin_Email nvarchar(50) not null,
	Admin_Password nvarchar(max)
	)
go

---------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------{ Primary Key }------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------
alter table Players
add
constraint PK_Player_Code primary key (Player_Email)
go

alter table Figures
add
constraint PK_Figure_Code primary key (Figure_Name)
go
 
alter table FiguresOfPlayer
add
constraint PK_Figure_Player_Code primary key (Player_Email, Figure_Name)
go

alter table FigureItems
add
constraint PK_Figure_Item_Code primary key (FigureItem_Name)
go

alter table FigureItemsByPlayer
add
constraint PK_Figure_Item_Player_Code primary key (Player_Email, Figure_Name, FigureItem_Name)
go

alter table PlayerGift
add
constraint PK_Gift_Code primary key (Gift_Code) 
go

alter table GamesHistory
add
constraint PK_Game_History_Code primary key (Player_One_Email, Player_Two_Email, Game_Date) 
go

alter table FiguresInGames
add
constraint PK_Figures_In_Games_Code primary key (Player_One_Email, Player_Two_Email, Game_Date, Player_Email, Figure_Name) 
go

alter table Admins
add
constraint PK_Admin_Code primary key (Admin_Email)
go

---------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------{ Foreign Key }------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------
alter table FiguresOfPlayer
add
constraint FK_FiguresOfPlayer_Player_Code foreign key (Player_Email) references Players (Player_Email),
constraint FK_FiguresOfPlayer_Figure_Code foreign key (Figure_Name) references Figures (Figure_Name)
go

alter table FigureItemsByPlayer
add
constraint FK_FigureItemsByPlayer_FiguresOfPlayer_Code foreign key (Player_Email, Figure_Name) references FiguresOfPlayer (Player_Email, Figure_Name),
constraint FK_FigureItemsByPlayer_FigureItem_Code foreign key (FigureItem_Name) references FigureItems (FigureItem_Name)
go

alter table PlayerGift
add
constraint FK_PlayerGift_Player_Code foreign key (Player_Email) references Players (Player_Email)
go

alter table GamesHistory
add
constraint FK_GamesHistory_PlayerOne_Code foreign key (Player_One_Email) references Players (Player_Email),
constraint FK_GamesHistory_PlayerTwo_Code foreign key (Player_Two_Email) references Players (Player_Email)
go

alter table FiguresInGames
add
constraint FK_FiguresInGames_GamesHistory_Code foreign key (Player_One_Email, Player_Two_Email, Game_Date) references GamesHistory (Player_One_Email, Player_Two_Email, Game_Date),
constraint FK_FiguresInGames_Player_Code foreign key (Player_Email) references Players (Player_Email),
constraint FK_FiguresInGames_Figure_Code foreign key (Figure_Name) references Figures (Figure_Name)
go
