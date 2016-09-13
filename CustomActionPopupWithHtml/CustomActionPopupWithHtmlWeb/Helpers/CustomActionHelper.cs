using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CustomActionPopupWithHtmlWeb.Helpers
{
    public class CustomActionHelper
    {
        internal static void AddCustomActionToGear( Web web)
        {
       
         
             string javascriptPopUp = "javascript:Samples.CustomActionPopups.ChangeTitlePopup()";



            RemoveCustomActionFromWeb(web, "ChangeTitle");

            UserCustomAction action = web.UserCustomActions.Add();
            action.Name = "ChangeTitle";
            action.Sequence = 1; // order of the action
            action.Title = "Change Title";
            action.Url = javascriptPopUp;
            action.Location = "Microsoft.SharePoint.StandardMenu";
            action.Group = "SiteActions";

            // todo add rights

            action.Update();
            web.Context.ExecuteQuery();
        }


        private static void RemoveCustomActionFromWeb(Web web, string ActionName)
        {
            ClientContext ctx = web.Context as ClientContext;

            UserCustomActionCollection actions = web.UserCustomActions;
            ctx.Load(actions);
            ctx.ExecuteQuery();

            for (int i = actions.Count - 1; i >= 0; i--)
            {
                if (actions[i].Name == ActionName)
                {
                    actions[i].DeleteObject();
                }
            }

            ctx.ExecuteQuery();


        }

    }
}
