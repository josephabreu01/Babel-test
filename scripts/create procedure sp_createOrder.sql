create procedure sp_createOrder
(
  
  @CustomerName VARCHAR(255) ,
  @OrderDate DATE ,
  @TotalAmount DECIMAL(18, 2) 
  )
as
begin 
insert into Orders(
CustomerName,
OrderDate,
TotalAmount
)
values(
@CustomerName,
@OrderDate,
@TotalAmount
)
end ;
