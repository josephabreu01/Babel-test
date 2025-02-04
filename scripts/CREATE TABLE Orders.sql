CREATE TABLE Orders (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CustomerName VARCHAR(255) NOT NULL,
    OrderDate DATE NOT NULL,
    TotalAmount DECIMAL(18, 2) CHECK (TotalAmount > 0)
);
CREATE TABLE OrderStatistics (
    TotalOrders INT,
    LastOrderDate DATE
);

CREATE TRIGGER trg_Orders_Insert
ON Orders
FOR INSERT
AS
BEGIN
    -- Evitar fechas futuras
    IF EXISTS (SELECT * FROM inserted WHERE OrderDate > GETDATE())
    BEGIN
        RAISERROR('No se pueden insertar órdenes con fecha futura', 16, 1);
        ROLLBACK;
        RETURN;
    END

    -- Actualizar estadísticas
    DECLARE @TotalOrders INT = (SELECT COUNT(*) FROM Orders);
    DECLARE @LastOrderDate DATE = (SELECT MAX(OrderDate) FROM Orders);
    
    -- Si no hay registros, insertar el primero
    IF NOT EXISTS (SELECT * FROM OrderStatistics)
    BEGIN
        INSERT INTO OrderStatistics (TotalOrders, LastOrderDate)
        VALUES (@TotalOrders, @LastOrderDate);
    END
    ELSE
    BEGIN
        UPDATE OrderStatistics 
        SET TotalOrders = @TotalOrders, LastOrderDate = @LastOrderDate;
    END
END;
