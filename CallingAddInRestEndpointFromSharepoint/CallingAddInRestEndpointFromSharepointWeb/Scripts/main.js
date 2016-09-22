var samples;
(function (samples) {
    var Utilities = (function () {
        function Utilities() {
        }
        Utilities.getJSON = function (url) {
            var prom = new Promise(function (resolve, reject) {
                var request = new XMLHttpRequest();
                request.open('GET', url);
                request.setRequestHeader("Accept", "application/json");
                request.send();
                request.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(this.response);
                    }
                    else {
                        // Performs the function "reject" when this.status is different than 2xx
                        reject(this.statusText);
                    }
                };
                request.onerror = function () {
                    reject(this.statusText);
                };
            });
            return prom;
        };
        Utilities.postJSON = function (url, data) {
            var prom = new Promise(function (resolve, reject) {
                console.log("gonna post");
                var request = new XMLHttpRequest();
                request.open('POST', url);
                request.setRequestHeader("X-RequestDigest", document.getElementById("__REQUESTDIGEST").getAttribute("value"));
                request.setRequestHeader("Accept", "application/json");
                request.setRequestHeader("content-type", "application/json;odata=verbose");
                request.send(JSON.stringify(data));
                request.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(this.response);
                    }
                    else {
                        // Performs the function "reject" when this.status is different than 2xx
                        console.log(JSON.parse(this.response));
                        reject(this.response);
                    }
                };
                request.onerror = function () {
                    console.log(JSON.stringify(this.response));
                    reject(this.response);
                };
            });
            return prom;
        };
        Utilities.postJSONwCallBack = function (url, data, Callback) {
            console.log("gonna post");
            var request = new XMLHttpRequest();
            request.open('POST', url);
            //request.setRequestHeader("X-RequestDigest", document.getElementById("__REQUESTDIGEST").getAttribute("value"));
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("content-type", "application/json;odata=verbose");
            request.send(JSON.stringify(data));
            request.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    Callback();
                }
                else {
                    // Performs the function "reject" when this.status is different than 2xx
                    console.log(JSON.parse(this.response));
                }
            };
            request.onerror = function () {
                console.log(JSON.stringify(this.response));
            };
        };
        Utilities.loadScript = function (url, callback) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" ||
                        script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            }
            else {
                script.onload = function () {
                    callback();
                };
            }
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
        };
        Utilities.loadCss = function (path) {
            var head = document.getElementsByTagName("head");
            var e = document.createElement("link");
            head[0].appendChild(e);
            e.setAttribute("type", "text/css");
            e.setAttribute("rel", "stylesheet");
            e.setAttribute("href", path);
        };
        Utilities.ready = function (fn) {
            if (document.readyState != 'loading') {
                fn();
            }
            else {
                document.addEventListener('DOMContentLoaded', fn);
            }
        };
        Utilities.RegisterErrorMessage = function (Sender, args) {
            console.log("Error: " + args.get_message() + '\n' + args.get_stackTrace());
        };
        return Utilities;
    }());
    samples.Utilities = Utilities;
})(samples || (samples = {}));
var samples;
(function (samples) {
    var Main = (function () {
        function Main() {
        }
        Main.OpenDialog = function () {
            samples.Utilities.loadScript(appUrl2 + "/scripts/es6-promise.js", function () {
                SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
                    var rootElement = document.createElement("div");
                    var html = "<div>Enter Title of new list Below</div>";
                    html += "<input type='text' id='newTitleText' />";
                    html += '<div class="ms-core-form-bottomButtonBox"><input id="okButton" type="button"  value="Ok" class="ms-ButtonHeightWidth"><input id="CancelButton" type="button" onclick="SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.Cancel, null);"   value="Cancel" class="ms-ButtonHeightWidth"></div>';
                    rootElement.innerHTML = html;
                    var options = SP.UI.$create_DialogOptions();
                    options.html = rootElement;
                    options.title = "Create List and Item";
                    //options.dialogReturnValueCallback = CustomActionPopups.DialogRefreshAfterClose;
                    SP.UI.ModalDialog.showModalDialog(options);
                    var okButton = document.getElementById("okButton");
                    var textBox = document.getElementById("newTitleText");
                    okButton.onclick = function () {
                        var listInfo = {
                            ListName: textBox.value,
                            SPHostUrl: _spPageContextInfo.webAbsoluteUrl,
                            UserName: _spPageContextInfo.userId.toString()
                        };
                        samples.Utilities.postJSON(appUrl2 + "/api/SPHelper", listInfo).then(function () {
                            SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.OK, 1);
                        });
                    };
                });
            });
        };
        return Main;
    }());
    samples.Main = Main;
})(samples || (samples = {}));
//# sourceMappingURL=main.js.map