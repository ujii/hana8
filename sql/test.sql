show tables;
select * from Dept;
select * from Emp;
select user();


create database schooldb;

create user school@'%' identified by 'Schooldb1!';

grant all privileges on schooldb.* to school@'%';

create table T (
	id tinyint unsigned auto_increment primary key,
    name varchar(30) not null,
    score enum('A', 'B', 'C', 'F') default 'F' comment '학점'
);

select * from T;
desc T;
insert into T(name, score) values('Hong', 'A');
insert into T(name, score) values('Kim', 'B'), ('Lee', 'C');
insert into T(name) values('Park');

insert into T(name, score) values('Choi', 'F');

select * from T where score = 4;

alter table T modify column score enum('A', 'B', 'C', 'D', 'F') default 'F' comment '학점';

select * from T where score = 5;

insert into T(name, score) values('Han', 'D');

select last_insert_id();

use testdb;
select * from Emp;
alter table Emp add column 
	-- auth tinyint(1) not null default 9 comment '1:admin, 3: manager, 5:employee, 7:temporary, 9:guest';
    auth enum('admin', 'manager', 'employee', 'temporary', 'guest') not null default 'geust';


desc Emp;
select * from Dept;
alter table Dept add column captain int unsigned null comment '부사장';
alter table Dept add constraint foreign key fk_Dept_captin_Emp (captain)
	references Emp(id) on update cascade on delete set null;

create table EmailLog(
	id int unsigned not null auto_increment primary key,
    sender int unsigned not null,
    receivers varchar(1024),
    subject varchar(255),
    body text,
    foreign key fk_EmailLog_sender_Emp (sender)
		references Emp(id) on delete no action on update cascade
);

show create table EmailLog;
alter table EmailLog drop constraint emaillog_ibfk_1;
alter table EmailLog drop index fk_EmailLog_sender_Emp;

alter table EmailLog add constraint foreign key fk_EmailLog_sender_Emp (sender)
		references Emp(id) on delete no action on update cascade;
alter table EmailLog engine = MyISAM;

select * from EmailLog;
insert into EmailLog(sender, receivers, subject, body)
				values(1, 'hong', 'kim', 'test mail', 'test mail body');
                
        
Drop table Prof;
                
create table Prof(
	id smallint unsigned not null auto_increment primary key,
    createdate timestamp default current_timestamp,
    updatedate timestamp default current_timestamp on update current_timestamp,
    name varchar(31) not null,
    likecnt mediumint not null default 0
);

create table Subject (
	id smallint unsigned auto_increment primary key,
    createdate timestamp default current_timestamp,
    updatedate timestamp default current_timestamp on update current_timestamp,
    name varchar(31) not null,
    prof smallint unsigned null,
    foreign key fk_Subject_Prof (prof) references Prof(id)
		on update cascade on delete set null
);

create table Enroll (
	id smallint unsigned auto_increment primary key,
    createdate timestamp default current_timestamp,
    updatedate timestamp default current_timestamp on update current_timestamp,
    subject smallint unsigned not null,
    student int unsigned not null,
    
    foreign key fk_Enroll_Subject (subject) references Subject (id)
		on update cascade on delete cascade,
	foreign key fk_Emnroll_Student (student) references Student (id)
		on update cascade on delete cascade,
	unique key uniq_Enroll_subject_student (subject, student)
        
);


