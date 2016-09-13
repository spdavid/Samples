/// <reference path="../scripts/typings/sharepoint/sharepoint.d.ts" />


namespace Samples
{
    export class CustomActionPopups
    {

        static ChangeTitlePopup()
        {
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
                console.log("Works.. weeee");

                let rootElement = document.createElement("div");
                let html = "<div>Enter Title Below</div>";
                html += "<input type='text' id='newTitleText' />";
                html += '<div class="ms-core-form-bottomButtonBox"><input id="okButton" type="button"  value="Ok" class="ms-ButtonHeightWidth"><input id="CancelButton" type="button" onclick="SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.Cancel, null);"   value="Cancel" class="ms-ButtonHeightWidth"></div>';

                rootElement.innerHTML = html;
                let options = SP.UI.$create_DialogOptions();
                options.html = rootElement;
                options.title = "Change Web Title";
                options.dialogReturnValueCallback = CustomActionPopups.DialogRefreshAfterClose;

                SP.UI.ModalDialog.showModalDialog(options);

                let okButton = document.getElementById("okButton");
                let textBox: HTMLInputElement = document.getElementById("newTitleText") as HTMLInputElement;
                
                okButton.onclick = () => {
                    let ctx = SP.ClientContext.get_current();
                    ctx.get_web().set_title(textBox.value);
                    ctx.get_web().update();
                    ctx.executeQueryAsync(
                        // success function
                        (sender, args) => {
                        SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.OK, 1);
                        },
                        // fail function
                        (sender, args) => {
                            console.log("Error: " + args.get_message() + '\n' + args.get_stackTrace());
                        });
                };

            });
        }

        static DialogRefreshAfterClose(result, value: any) {
            SP.UI.ModalDialog.RefreshPage(result);
        }

    }

}