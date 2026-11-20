// Contact form for The Tattoo Co.
// Builds the form with JavaScript (the point of the original assignment),
// then checks the fields in the browser. This is a demo site, so nothing is sent.

(function () {
	var container = document.getElementById("form_sample");
	if (!container) return;

	var form = document.createElement("form");
	form.setAttribute("novalidate", "");

	var heading = document.createElement("h2");
	heading.textContent = "Contact Form";
	form.appendChild(heading);
	form.appendChild(document.createElement("hr"));

	// Adds a label and a field, linked by id so screen readers announce them together.
	function addField(id, labelText, tag, attrs) {
		var label = document.createElement("label");
		label.setAttribute("for", id);
		label.textContent = labelText;

		var field = document.createElement(tag);
		field.id = id;
		field.name = id;
		field.required = true;
		Object.keys(attrs).forEach(function (key) {
			field.setAttribute(key, attrs[key]);
		});

		form.appendChild(label);
		form.appendChild(field);
		return field;
	}

	var nameField = addField("name", "Your name", "input", { type: "text", autocomplete: "name" });
	var emailField = addField("email", "Your email", "input", { type: "email", autocomplete: "email" });
	var messageField = addField("message", "Your message", "textarea", { rows: "5" });

	var submit = document.createElement("button");
	submit.type = "submit";
	submit.textContent = "Send message";
	form.appendChild(submit);

	var note = document.createElement("p");
	note.className = "form-note";
	note.textContent = "This is a student project, so messages aren't actually sent.";
	form.appendChild(note);

	var status = document.createElement("p");
	status.className = "form-status";
	status.setAttribute("role", "status");
	status.hidden = true;
	form.appendChild(status);

	form.addEventListener("submit", function (event) {
		event.preventDefault();

		var fields = [nameField, emailField, messageField];
		for (var i = 0; i < fields.length; i++) {
			if (!fields[i].checkValidity()) {
				status.textContent = fields[i] === emailField && fields[i].value.trim()
					? "Please enter a valid email address."
					: "Please fill in your " + fields[i].name + ".";
				status.hidden = false;
				fields[i].focus();
				return;
			}
		}

		status.textContent = "Thanks, " + nameField.value.trim() +
			"! Since this is a demo site, your message wasn't sent anywhere.";
		status.hidden = false;
		form.reset();
	});

	container.appendChild(form);
})();
