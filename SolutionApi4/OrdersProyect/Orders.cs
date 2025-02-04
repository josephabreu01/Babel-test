using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsProyect
{
    public class Orders
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }

        public DateTime OrderDate { get; set; }

        public Decimal TotalAmount { get; set; }

    }
}
