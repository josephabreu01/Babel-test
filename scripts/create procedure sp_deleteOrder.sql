create procedure sp_deleteOrder
(
  @Id INT
  )
as
begin 
delete from Orders where Id = @Id

end ;