using Microsoft.Extensions;
using System.Data.SqlClient;
using System.Data;
using ModelsProyect;
using Microsoft.Extensions.Options;

namespace DataProyect
{
    public class OrdersData
    {
        private readonly ConnectionStrings _connectionStrings;

        public OrdersData(IOptions<ConnectionStrings> options)
        {
            _connectionStrings = options.Value;
        }

        public async Task<List<Orders>> OrdersList()
        {
            List<Orders> orders = new List<Orders>();

            using (var connection = new SqlConnection(_connectionStrings.SqlConnectionString))
            {
                await connection.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_getOrders", connection);

                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (reader.Read())
                    {
                        orders.Add(new Orders
                        {
                            Id = Convert.ToInt32(reader["Id"]),
                            CustomerName = reader["CustomerName"].ToString(),
                            OrderDate = Convert.ToDateTime(reader["OrderDate"]),
                            TotalAmount = Convert.ToDecimal(reader["TotalAmount"])
                        });
                    }

                }
                return orders;
            }
        }

        public async Task<Orders> GetOneOrder(int id)
        {
            Orders order = new Orders();

            using (var connection = new SqlConnection(_connectionStrings.SqlConnectionString))
            {
                await connection.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_getOneOrder", connection);

                cmd.Parameters.AddWithValue("@Id", id);

                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (reader.Read())
                    {
                      order = new Orders
                        {
                            Id = Convert.ToInt32(reader["Id"]),
                            CustomerName = reader["CustomerName"].ToString(),
                            OrderDate = Convert.ToDateTime(reader["OrderDate"]),
                            TotalAmount = Convert.ToDecimal(reader["TotalAmount"])
                        };
                    }

                }
                return order;
            }
        }

        public async Task<OrdersResponse> CreateOrder(Orders orders)
        {
            using (var connection = new SqlConnection(_connectionStrings.SqlConnectionString))
            {
               
                SqlCommand cmd = new SqlCommand("sp_createOrder", connection);

                cmd.Parameters.AddWithValue("@CustomerName",orders.CustomerName);
                cmd.Parameters.AddWithValue("@OrderDate",orders.OrderDate);
                cmd.Parameters.AddWithValue("@TotalAmount",orders.TotalAmount);

                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    await connection.OpenAsync();
                    await cmd.ExecuteNonQueryAsync();

                    return new OrdersResponse
                    {
                        message = "Order creada exitosamente",
                        responseCode = 200,
                    };
                }
                catch (SqlException ex)
                {
                    return new OrdersResponse { responseCode = 500, message = ex.Message }; 
                }
            }

        }

        public async Task<OrdersResponse> UpdateOrder(Orders orders)
        {
            using (var connection = new SqlConnection(_connectionStrings.SqlConnectionString))
            {

                SqlCommand cmd = new SqlCommand("sp_updateOrder", connection);

                cmd.Parameters.AddWithValue("@Id", orders.Id);
                cmd.Parameters.AddWithValue("@CustomerName", orders.CustomerName);
                cmd.Parameters.AddWithValue("@OrderDate", orders.OrderDate);
                cmd.Parameters.AddWithValue("@TotalAmount", orders.TotalAmount);

                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    await connection.OpenAsync();
                    return new OrdersResponse
                    {
                        message = "Order creada exitosamente",
                        responseCode = 200,
                    };
                }
                catch (Exception ex)
                {
                    return new OrdersResponse  { responseCode = 500,message = ex.Message};  
                }
            }

        }

        public async Task<bool> DeleteOrder(int id)
        {
            using (var connection = new SqlConnection(_connectionStrings.SqlConnectionString))
            {

                SqlCommand cmd = new SqlCommand("sp_deleteOrder", connection);

                cmd.Parameters.AddWithValue("@Id", id);
                

                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    await connection.OpenAsync();
                    return await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }

        }
    }
}