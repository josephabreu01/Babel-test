create procedure sp_updateOrder
(
  @Id INT,
  @CustomerName VARCHAR(255) ,
  @OrderDate DATE ,
  @TotalAmount DECIMAL(18, 2) 
  )
as
begin 
update  Orders set
CustomerName = @CustomerName,
OrderDate = @OrderDate,
TotalAmount = @TotalAmount
where Id = @Id

end ;