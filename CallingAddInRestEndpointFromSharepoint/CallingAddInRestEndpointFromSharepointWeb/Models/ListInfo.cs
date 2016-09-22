using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CallingAddInRestEndpointFromSharepointWeb.Models
{
    public class ListInfo
    {
        public string ListName { get; set; }
        public string UserName { get; set; }
        public string SPHostUrl { get; set; }
    }
}