select d.id, max(d.dname), avg(e.salary) avgsal
from Dept d inner join Emp e on d.id = e.dept
group by d.id
order by avgsal desc;

with AvgSal AS (
	select d.id, max(d.dname) dname, avg(e.salary) avgsal
	from Dept d inner join Emp e on d.id = e.dept
	group by d.id
),
MaxSal AS (select * from AvgSal order by avgsal desc limit 1),
MinSal AS (select * from AvgSal order by avgsal limit 1)
select * from MaxSal
union all
select * from MinSal
union all
select 0, '평균 차액', (select avgsal from MaxSal) - (select avgsal from MinSal);

with AvgSal AS (
	select max(d.dname) dname, avg(e.salary) avgsal
	from Dept d inner join Emp e on d.id = e.dept
	group by d.id
),
MaxSal AS (select * from AvgSal order by avgsal desc limit 1),
MinSal AS (select * from AvgSal order by avgsal limit 1),
SumUp AS (
	select '최고', dname, avgsal from MaxSal
    union all
    select '최저', dname, avgsal from MinSal
)
select * from SumUp
UNION 
select '', '평균 차액', max(avgsal) - min(avgsal) from SumUp;


-- 0 1 1 2 3 5 8 13 21 34 55
with recursive fibonacci (n, prev, next) AS (
	select 1, 0, 1
    union all
    select n + 1, next, prev + next from fibonacci where n < 10
)
select * from fibonacci;

select * from Dept;
insert into Dept(pid, dname) values(6, '인프라셀'), (6, 'DB셀'), (7, '모바일셀');
insert into Dept(pid, dname) values(3, '영업특공대');

-- 댓글 테이블 설계 시 참조. 셀프 조인하면 됨
select * from Dept;
select p.dname, d.dname
from Dept p inner join Dept d on p.id = d.pid;

select p.dname, d.dname, concat(p.id, '-', d.id) h
from Dept p inner join Dept d on p.id = d.pid
order by h;

show variables like '%cte%';

with recursive CteDept (id, dname, depth, h) AS (
	select id, dname, 0, cast(id as char(30)) from Dept where pid = 0
    union all
    select d.id, d.dname, cte.depth + 1, concat(cte.h, '-', d.id)
    from Dept d inner join CteDept cte on d.pid = cte.id
    where pid = cte.id
)
select concat(repeat('└ ', depth), dname) from CteDept order by h;

select row_number() over (order by dept, salary desc) '순번', e.*,
    avg(salary) over w '급여 평균',
    sum(salary) over w '급여 누적치'
  from Emp e
 where ename like '박%'
 window w as (partition by dept order by salary desc);
 
 select
    row_number() over(order by dept, salary desc) '순번',
    e.*,
    rank() over w '부서내 순위',
    dense_rank() over w '부서내 순위',
    percent_rank() over w '부서내 %순위',
    cume_dist() over w '부서내 %경계',
    ntile(3) over w '급여등급'
  from Emp e
 where ename like '김%'
 WINDOW w as (partition by dept order by dept, salary desc);

 
 select p.id pid, d.id did, 
		(case when p.id is not null then max(p.dname) else '총계' end) pname, 
        (case when d.id is not null then max(d.dname)
				when p.id is not null then '--소계--'
				else ' - ' end) name, format(sum(e.salary), 0)
 from Dept d inner join Dept p on p.id = d.pid
			 inner join Emp e on e.dept = d.id
 group by p.id, d.id
 with rollup;
 
 select d.id, max(dname), avg(e.salary), sum(e.salary)
 from Dept d inner join Emp e on d.id = e.dept
 group by d.id
 order by d.id;
 
 select '평균 급여' as '구분', 
		 avg(case when dept = 3 then salary end) as '영업1팀', 
         avg(if(dept = 4, salary, null)) as '영업2팀',
         avg(if(dept = 5, salary, null)) as '영업3팀'
from Emp
 union 
 select '총 급여', 
		 sum(case when dept = 3 then salary end) as '영업1팀', 
         sum(if(dept = 4, salary, null)) as '영업2팀',
         sum(if(dept = 5, salary, null)) as '영업3팀'
 from Emp;
 
 
 
 
