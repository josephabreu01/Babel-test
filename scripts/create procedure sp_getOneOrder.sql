create procedure sp_getOneOrder
(@Id INT)
as
begin 
select * from Orders where Id = @Id;
end ;