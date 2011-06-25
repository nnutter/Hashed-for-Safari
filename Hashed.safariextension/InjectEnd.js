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
		if (msgEvent.name === "pwdHash") {
			var passwordFields = findPasswordFields();
			for (var e = 0; e < passwordFields.length; e++) {
				passwordFields[e].value = msgEvent.message;
				passwordFields[e].style.backgroundColor = "#ffffe0";
			}
		}
		else if (msgEvent.name === "missingMasterPassword") {
			alertMissingMasterPassword(msgEvent);
		}
	}
	
	function alertMissingMasterPassword(msgEvent) {
		alert("You must set a Master Password in Hashed for Safari's extension settings.");
	}
	
	safari.self.addEventListener("message", receivePwdHash, false);
}