declare var appUrl2: string;

namespace samples {
    export class Main {
        static OpenDialog() {
            Utilities.loadScript(appUrl2 + "/scripts/es6-promise.js", () => {
                SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
                    let rootElement = document.createElement("div");
                    let html = "<div>Enter Title of new list Below</div>";
                    html += "<input type='text' id='newTitleText' />";
                    html += '<div class="ms-core-form-bottomButtonBox"><input id="okButton" type="button"  value="Ok" class="ms-ButtonHeightWidth"><input id="CancelButton" type="button" onclick="SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.Cancel, null);"   value="Cancel" class="ms-ButtonHeightWidth"></div>';

                    rootElement.innerHTML = html;
                    let options = SP.UI.$create_DialogOptions();
                    options.html = rootElement;
                    options.title = "Create List and Item";
                    //options.dialogReturnValueCallback = CustomActionPopups.DialogRefreshAfterClose;

                    SP.UI.ModalDialog.showModalDialog(options);

                    let okButton = document.getElementById("okButton");
                    let textBox: HTMLInputElement = document.getElementById("newTitleText") as HTMLInputElement;

                    okButton.onclick = () => {

                        let listInfo: samples.IListInfo =
                            {
                            ListName: textBox.value,
                            SPHostUrl: _spPageContextInfo.webAbsoluteUrl,
                            UserName: _spPageContextInfo.userId.toString()
                        };

                        Utilities.postJSON(appUrl2 + "/api/SPHelper", listInfo).then(() => {
                            SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.OK, 1);
                        });


                    };

                });

            });
        }
    }
}