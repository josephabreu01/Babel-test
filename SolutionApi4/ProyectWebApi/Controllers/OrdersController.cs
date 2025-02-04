using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using DataProyect;
using ModelsProyect;

namespace ProyectWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {

        private readonly OrdersData _ordersData;

        public OrdersController(OrdersData ordersData)
        {
            _ordersData = ordersData;
        }

        [HttpGet]
        public async Task<IActionResult> getOrders()
        {
            List<Orders> orders = await _ordersData.OrdersList();
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> getOneORder(int id)
        {
            Orders order = await _ordersData.GetOneOrder(id);

           
            return Ok(order);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] Orders order)
        {
            OrdersResponse response = await _ordersData.CreateOrder(order);
            if (response.responseCode !=200) {
                
                return BadRequest(response);
            }

           
            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateOrder([FromBody] Orders order)
        {
            Orders orderId = await _ordersData.GetOneOrder(order.Id);
            OrdersResponse response = await _ordersData.CreateOrder(order);

            if (orderId.Id.Equals(0))
            {
                return StatusCode(StatusCodes.Status404NotFound, "Orden No existente");
            }

            
            if (response.responseCode != 200)
            {
                return BadRequest(response);
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            bool response = await _ordersData.DeleteOrder(id);
            if (response == false)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            return Ok();
        }
    }
}
