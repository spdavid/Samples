/// <reference path="../scripts/typings/sharepoint/sharepoint.d.ts" />
var Samples;
(function (Samples) {
    var CustomActionPopups = (function () {
        function CustomActionPopups() {
        }
        CustomActionPopups.ChangeTitlePopup = function () {
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
                console.log("Works.. weeee");
                var rootElement = document.createElement("div");
                var html = "<div>Enter Title Below</div>";
                html += "<input type='text' id='newTitleText' />";
                html += '<div class="ms-core-form-bottomButtonBox"><input id="okButton" type="button"  value="Ok" class="ms-ButtonHeightWidth"><input id="CancelButton" type="button" onclick="SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.Cancel, null);"   value="Cancel" class="ms-ButtonHeightWidth"></div>';
                rootElement.innerHTML = html;
                var options = SP.UI.$create_DialogOptions();
                options.html = rootElement;
                options.title = "Change Web Title";
                options.dialogReturnValueCallback = CustomActionPopups.DialogRefreshAfterClose;
                SP.UI.ModalDialog.showModalDialog(options);
                var okButton = document.getElementById("okButton");
                var textBox = document.getElementById("newTitleText");
                okButton.onclick = function () {
                    var ctx = SP.ClientContext.get_current();
                    ctx.get_web().set_title(textBox.value);
                    ctx.get_web().update();
                    ctx.executeQueryAsync(
                    // success function
                    function (sender, args) {
                        SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.OK, 1);
                    }, 
                    // fail function
                    function (sender, args) {
                        console.log("Error: " + args.get_message() + '\n' + args.get_stackTrace());
                    });
                };
            });
        };
        CustomActionPopups.DialogRefreshAfterClose = function (result, value) {
            SP.UI.ModalDialog.RefreshPage(result);
        };
        return CustomActionPopups;
    }());
    Samples.CustomActionPopups = CustomActionPopups;
})(Samples || (Samples = {}));
