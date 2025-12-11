use testdb;

select * from Emp;
select dept, count(*), avg(salary), sum(salary), std(salary), variance(salary) from Emp group by dept;

select dept, count(*), avg(salary) from Emp where dept < 5
group by dept
having avg(salary) > 500;

select dept, count(*) from Emp group by dept having count(*) >= 40;
select dept, count(*), (select dname from Dept where id = e.dept)
from Emp e
group by dept having count(*) >= 35;

select e.*, d.* from Emp e join Dept d on e.dept = d.id;
select e.dept, count(*), max(d.dname) from Emp e join Dept d on e.dept = d.id
group by e.dept;


select * from Dept;
select * from Emp;
-- 부서 별 급여 평균이 전체 평균보다 높은 부서의 id와 평균 급여를 구하시오.
select dept, avg(salary)
from Emp
group by dept
having avg(salary) > (select avg(salary) from Emp);


-- 전체 평균보다 더 높은 급여를 가진 직원 목록을 출력하시오.
-- (부서id, 부서명, 직원id, 직원명, 급여)
select dept, dname, e.id, ename, salary
from Emp e join Dept d on e.dept = d.id
where salary > (select avg(salary) from Emp);

update Emp set salary = 901 + dept
  where id in (152, 97,18,80,133,47,128);


-- 부서 별 최고 급여자 목록을 추출하시오.
-- (부서별 1명 씩)
select e.*
from Emp e inner join Dept d on e.dept = d.id join (select dept, Max(salary) max_sal from Emp group by dept) s on max_sal = e.salary
order by salary desc;

select e.*
  from Emp e inner join (select dept, max(salary) salary from Emp group by dept) d
             on e.dept = d.dept and e.salary = d.salary
 order by e.dept;


select * from Emp order by ename;
select * from Dept;
select * from Emp;
-- 김나나, 김바순, 
select dept, min(ename), group_concat(ename order by ename) from Emp group by dept;
select d.id, d.dname, (select min(ename) from Emp where dept = d.id order by ename limit 1) from Dept d;
-- Dept 테이블에 부서 별로, 직원 이름이 가장 빠른 직원(가나다 순)을 각 부서의 captain으로 update 하시오
update Dept d set d.captain = (select id from Emp where dept = d.id order by ename asc limit 1);
                    

alter table Emp add column outdt date null comment '퇴사일' after salary;
-- Emp.id가 3, 5 인 직원을 2025년 11월 25일자 퇴사 처리하시오.
update Emp set outdt = '2025-11-25' where id in (3, 5);
-- Emp.id가 14, 26 인 직원을 오늘자 퇴사 처리하면서, 만약 Dept.captain이 퇴사자면 공석으로 처리! (SQL문 1개로)
select d.*, e.* from Dept d inner join Emp e on d.captain = e.id where e.id in (14, 26);
select * from Emp where id in (14, 26);
update Emp e join Dept d on e.dept = d.id set outdt = current_date(), captain = (case when d.captain in (14, 26) then null else d.captain end) where e.id in (14, 26);

select * from Emp e left outer join Dept d on e.id = d.captain where e.id in (14, 26);
update Emp e left outer join Dept d on e.id = d.captain 
set e.outdt = curdate(), d.captain = null
where e.id in (14, 26);