using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OfficeDevPnP.Core;

namespace CustomActionPopupWithHtmlWeb.Controllers
{
    public class HomeController : Controller
    {
        [SharePointContextFilter]
        public ActionResult Index()
        {
            User spUser = null;

            var spContext = SharePointContextProvider.Current.GetSharePointContext(HttpContext);

            using (var ctx = spContext.CreateUserClientContextForSPHost())
            {
                if (ctx != null)
                {
                    spUser = ctx.Web.CurrentUser;

                    ctx.Load(spUser, user => user.Title);

                    ctx.ExecuteQuery();

                    ViewBag.UserName = spUser.Title;

                    Uri rawUrl = HttpContext.Request.Url;
                    // this gives us the root url of our app eg. http://localhost:port
                    string rootAppUrl = rawUrl.Scheme + "://" + rawUrl.Authority;

                    ctx.Web.AddJsLink("ourCustomjs", rootAppUrl + "/SPScripts/CustomActionsScript.js");
                    Helpers.CustomActionHelper.AddCustomActionToGear(ctx.Web);




                }
            }

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
