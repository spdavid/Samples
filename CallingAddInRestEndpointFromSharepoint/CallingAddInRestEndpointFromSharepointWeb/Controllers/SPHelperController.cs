using CallingAddInRestEndpointFromSharepointWeb.Models;
using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CallingAddInRestEndpointFromSharepointWeb.Controllers
{
    public class SPHelperController : ApiController
    {
        // GET: api/SPHelper
        public IEnumerable<string> Get()
        {
            return new string[] { "fake", "data" };
        }

        // GET: api/SPHelper/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/SPHelper
      
        public void Post(ListInfo info)
        {
            using (ClientContext ctx = GetAppOnlyContext(info.SPHostUrl))
            {
              List list =  ctx.Web.CreateList(ListTemplateType.GenericList, info.ListName, false);

               ListItem item = list.AddItem(new ListItemCreationInformation());
                item["Title"] = "somem title";
                item["Editor"] = int.Parse(info.UserName);
                item["Author"] = int.Parse(info.UserName);
                item.Update();
                ctx.ExecuteQuery();

            }
        }


        public static ClientContext GetAppOnlyContext(string siteUrl)
        {
            Uri siteUri = new Uri(siteUrl);
            // Connect to a site using an app-only token.
            string realm = TokenHelper.GetRealmFromTargetUrl(siteUri);
            var token = TokenHelper.GetAppOnlyAccessToken(TokenHelper.SharePointPrincipal, siteUri.Authority, realm).AccessToken;
            var ctx = TokenHelper.GetClientContextWithAccessToken(siteUrl.ToString(), token);
            return ctx;

        }

        // PUT: api/SPHelper/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/SPHelper/5
        public void Delete(int id)
        {
        }
    }
}
