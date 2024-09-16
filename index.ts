// Get elements from the DOM
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeOutput = document.getElementById('resume-output') as HTMLElement;
const nameOutput = document.getElementById('name-output') as HTMLSpanElement;
const emailOutput = document.getElementById('email-output') as HTMLSpanElement;
const phoneOutput = document.getElementById('phone-output') as HTMLSpanElement;
const profilePicOutput = document.getElementById('profile-pic-output') as HTMLImageElement;

const educationList = document.getElementById('education-list') as HTMLUListElement;
const workExperienceList = document.getElementById('work-experience-list') as HTMLUListElement;
const skillsList = document.getElementById('skills-list') as HTMLUListElement;

const profilePicInput = document.getElementById('profile-pic') as HTMLInputElement;

// Utility to split text areas by lines or commas and populate a list
const populateList = (listElement: HTMLUListElement, items: string) => {
    listElement.innerHTML = '';
    items.split(/\r?\n|,/).forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.trim();
        listElement.appendChild(li);
    });
};

// Handle form submission
form?.addEventListener('submit', event => {
    event.preventDefault();

    // Update resume fields
    nameOutput.textContent = (document.getElementById('name') as HTMLInputElement).value;
    emailOutput.textContent = (document.getElementById('email') as HTMLInputElement).value;
    phoneOutput.textContent = (document.getElementById('phone') as HTMLInputElement).value;

    const profilePic = profilePicInput.files?.[0];
    if (profilePic) {
        const reader = new FileReader();
        reader.onload = e => { profilePicOutput.src = e.target?.result as string; };
        reader.readAsDataURL(profilePic);
    }

    // Populate lists
    populateList(educationList, (document.getElementById('education') as HTMLTextAreaElement).value);
    populateList(workExperienceList, (document.getElementById('work-experience') as HTMLTextAreaElement).value);
    populateList(skillsList, (document.getElementById('skills') as HTMLTextAreaElement).value);

    // Show resume output
    resumeOutput.style.display = 'block';
});

// Handle profile picture change
profilePicInput?.addEventListener('change', () => {
    const file = profilePicInput.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = e => { profilePicOutput.src = e.target?.result as string; };
        reader.readAsDataURL(file);
    }
});

// Toggle edit/save functionality for list and text sections
const toggleEdit = (button: HTMLButtonElement, sectionId: string) => {
    const listElement = document.getElementById(sectionId) as HTMLUListElement;
    if (button.textContent === 'Edit') {
        Array.from(listElement.getElementsByTagName('li')).forEach(item => item.setAttribute('contentEditable', 'true'));
        button.textContent = 'Save';
    } else {
        Array.from(listElement.getElementsByTagName('li')).forEach(item => item.setAttribute('contentEditable', 'false'));
        button.textContent = 'Edit';
    }
};

// Add editing functionality to buttons
document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', event => {
        const section = (event.target as HTMLButtonElement).dataset.section;
        if (section) {
            toggleEdit(event.target as HTMLButtonElement, `${section}-list`);
        }
    });
});

// Copy resume link functionality
document.getElementById('copy-link-btn')?.addEventListener('click', () => {
    const resumeURL = window.location.href;
    navigator.clipboard.writeText(resumeURL)
        .then(() => alert('Resume link copied to clipboard!'))
        .catch(err => console.error('Failed to copy link:', err));
});

// Download resume as PDF functionality
document.getElementById('download-pdf-btn')?.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text('Resume', 20, 20);
    doc.text(`Name: ${nameOutput.textContent}`, 20, 30);
    doc.text(`Email: ${emailOutput.textContent}`, 20, 40);
    doc.text(`Phone: ${phoneOutput.textContent}`, 20, 50);
    doc.text(`Education: ${educationList.textContent}`, 20, 60);
    doc.text(`Work Experience: ${workExperienceList.textContent}`, 20, 70);
    doc.text(`Skills: ${skillsList.textContent}`, 20, 80);

    // Save the PDF
    doc.save('resume.pdf');
});
