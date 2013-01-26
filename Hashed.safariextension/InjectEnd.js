/*
   Copyright (c) 2011, Nathaniel Nutter
   All rights reserved.

   Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

   Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
   Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
   Neither the name of the Nathaniel Nutter nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */

var pwdHash;

if (window.top === window) {
    function findPasswordFields() {
        var passwordFields = new Array();
        for (var f = 0; f < document.forms.length; f++) {
            for (var e = 0; e < document.forms[f].elements.length; e++) {
                if (document.forms[f].elements[e].type == 'password') {
                    passwordFields.push(document.forms[f].elements[e]);
                }
            }
        }
        return passwordFields;
    }

    function receivePwdHash(msgEvent) {
        if (msgEvent.name === "missingMasterPassword") {
            alertMissingMasterPassword(msgEvent);
            return;
        }
 
        if (msgEvent.name === "missingAltMasterPassword") {
            alertMissingAltMasterPassword(msgEvent);
        }

    
        var msgName = msgEvent.name;
        var msgData = msgEvent.message;
        var autoFill = msgData[0];
        var password = msgData[1];
        if (msgName === "pwdHash") {
            pwdHash = password;
            if (autoFill) {
                var passwordFields = findPasswordFields();
                for (var e = 0; e < passwordFields.length; e++) {
                    if (!passwordFields[e].value) {
                        passwordFields[e].value = password;
                        passwordFields[e].style.backgroundColor = "#ffffe0";
                    }
                }
            }
        }
    }

    function alertMissingMasterPassword(msgEvent) {
        alert("You must set a Master Password in Hashed for Safari's extension settings.");
    }

    function alertMissingAltMasterPassword(msgEvent) {
        alert("You must set an Alternate Master Password in Hashed for Safari's extension settings.");
    }

    function handleClick(event) {
        var element = document.activeElement;
        if (element.type == 'password' && pwdHash) {
            element.value = pwdHash;
        }
    }

    function handleKeyboardShortcut(event) {
        if (event && event.metaKey && !event.shiftKey && !event.altKey && !event.ctrlKey && event.keyCode == 92) {
            safari.self.tab.dispatchMessage("pleaseGeneratePwdHash", true);
        }
        if (event && event.metaKey && !event.shiftKey && !event.altKey && !event.ctrlKey && event.keyCode == 39) {
            safari.self.tab.dispatchMessage("pleaseGeneratePwdHash", true);
        }
        if (event && event.metaKey && !event.shiftKey &&  event.altKey && !event.ctrlKey && event.keyCode == 230) {
            safari.self.tab.dispatchMessage("pleaseGeneratePwdHash", false);
        }
        if (event && event.metaKey && !event.shiftKey && !event.altKey && !event.ctrlKey && event.keyCode == 59) {
            safari.self.tab.dispatchMessage("pleaseGenerateAltPwdHash", true);
        }
        if (event && event.metaKey && !event.shiftKey &&  event.altKey && !event.ctrlKey && event.keyCode == 8230) {
            safari.self.tab.dispatchMessage("pleaseGenerateAltPwdHash", false);
        }
        
        /* german keyboard */
        if (event && event.metaKey && !event.shiftKey && !event.altKey && !event.ctrlKey && event.keyCode == 35) {
            safari.self.tab.dispatchMessage("pleaseGeneratePwdHash", true);
        }
        if (event && event.metaKey && !event.shiftKey &&  event.altKey && !event.ctrlKey && event.keyCode == 8216) {
            safari.self.tab.dispatchMessage("pleaseGeneratePwdHash", false);
        }
        
    }

    document.onkeypress = handleKeyboardShortcut;
    document.onclick = handleClick;

    safari.self.addEventListener("message", receivePwdHash, false);
}
