var _a, _b;
// Get elements from the DOM
var form = document.getElementById('resume-form');
var resumeOutput = document.getElementById('resume-output');
var nameOutput = document.getElementById('name-output');
var emailOutput = document.getElementById('email-output');
var phoneOutput = document.getElementById('phone-output');
var profilePicOutput = document.getElementById('profile-pic-output');
var educationList = document.getElementById('education-list');
var workExperienceList = document.getElementById('work-experience-list');
var skillsList = document.getElementById('skills-list');
var profilePicInput = document.getElementById('profile-pic');
// Utility to split text areas by lines or commas and populate a list
var populateList = function (listElement, items) {
    listElement.innerHTML = '';
    items.split(/\r?\n|,/).forEach(function (item) {
        var li = document.createElement('li');
        li.textContent = item.trim();
        listElement.appendChild(li);
    });
};
// Handle form submission
form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    // Update resume fields
    nameOutput.textContent = document.getElementById('name').value;
    emailOutput.textContent = document.getElementById('email').value;
    phoneOutput.textContent = document.getElementById('phone').value;
    var profilePic = (_a = profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (profilePic) {
        var reader = new FileReader();
        reader.onload = function (e) { var _a; profilePicOutput.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result; };
        reader.readAsDataURL(profilePic);
    }
    // Populate lists
    populateList(educationList, document.getElementById('education').value);
    populateList(workExperienceList, document.getElementById('work-experience').value);
    populateList(skillsList, document.getElementById('skills').value);
    // Show resume output
    resumeOutput.style.display = 'block';
});
// Handle profile picture change
profilePicInput === null || profilePicInput === void 0 ? void 0 : profilePicInput.addEventListener('change', function () {
    var _a;
    var file = (_a = profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) { var _a; profilePicOutput.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result; };
        reader.readAsDataURL(file);
    }
});
// Toggle edit/save functionality for list and text sections
var toggleEdit = function (button, sectionId) {
    var listElement = document.getElementById(sectionId);
    if (button.textContent === 'Edit') {
        Array.from(listElement.getElementsByTagName('li')).forEach(function (item) { return item.setAttribute('contentEditable', 'true'); });
        button.textContent = 'Save';
    }
    else {
        Array.from(listElement.getElementsByTagName('li')).forEach(function (item) { return item.setAttribute('contentEditable', 'false'); });
        button.textContent = 'Edit';
    }
};
// Add editing functionality to buttons
document.querySelectorAll('.edit-btn').forEach(function (button) {
    button.addEventListener('click', function (event) {
        var section = event.target.dataset.section;
        if (section) {
            toggleEdit(event.target, "".concat(section, "-list"));
        }
    });
});
// Copy resume link functionality
(_a = document.getElementById('copy-link-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var resumeURL = window.location.href;
    navigator.clipboard.writeText(resumeURL)
        .then(function () { return alert('Resume link copied to clipboard!'); })
        .catch(function (err) { return console.error('Failed to copy link:', err); });
});
// Download resume as PDF functionality
(_b = document.getElementById('download-pdf-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF();
    doc.text('Resume', 20, 20);
    doc.text("Name: ".concat(nameOutput.textContent), 20, 30);
    doc.text("Email: ".concat(emailOutput.textContent), 20, 40);
    doc.text("Phone: ".concat(phoneOutput.textContent), 20, 50);
    doc.text("Education: ".concat(educationList.textContent), 20, 60);
    doc.text("Work Experience: ".concat(workExperienceList.textContent), 20, 70);
    doc.text("Skills: ".concat(skillsList.textContent), 20, 80);
    // Save the PDF
    doc.save('resume.pdf');
});
