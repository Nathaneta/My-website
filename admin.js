// Admin Dashboard JavaScript

let currentUser = null;
let students = [];
let teachers = [];
let subjects = [];
let marks = [];
let deadlines = [];

// Initialize admin dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    currentUser = checkAuth();
    if (!currentUser || currentUser.role !== 'admin') {
        window.location.href = 'index.html';
        return;
    }
    
    // Update admin name
    document.getElementById('adminName').textContent = currentUser.name;
    
    // Initialize dashboard
    initializeDashboard();
    loadData();
    updateOverviewCards();
    loadRecentActivity();
    renderAdminMessages();
});

// Initialize dashboard
function initializeDashboard() {
    // Load initial data
    students = storage.get('students') || [];
    teachers = storage.get('teachers') || [];
    subjects = storage.get('subjects') || [];
    marks = storage.get('marks') || [];
    deadlines = storage.get('deadlines') || [];
    
    console.log('Dashboard initialized with:', {
        students: students.length,
        teachers: teachers.length,
        subjects: subjects.length,
        marks: marks.length
    });
    populateStudentDropdowns();
    importStudentsFromAuth();
    importTeachersFromAuth();
}

// Load data from localStorage
function loadData() {
    students = storage.get('students') || [];
    teachers = storage.get('teachers') || [];
    subjects = storage.get('subjects') || [];
    marks = storage.get('marks') || [];
    deadlines = storage.get('deadlines') || [];
    populateStudentDropdowns();
    importStudentsFromAuth();
    importTeachersFromAuth();
}

// Update overview cards
function updateOverviewCards() {
    document.getElementById('totalStudents').textContent = students.length;
    document.getElementById('totalTeachers').textContent = teachers.length;
    document.getElementById('totalSubjects').textContent = subjects.length;
    
    // Calculate average grade
    if (marks.length > 0) {
        const totalScore = marks.reduce((sum, mark) => sum + (mark.total || 0), 0);
        const average = Math.round((totalScore / marks.length) * 100) / 100;
        document.getElementById('averageGrade').textContent = average + '%';
    } else {
        document.getElementById('averageGrade').textContent = '0%';
    }
}

// Load recent activity
function loadRecentActivity() {
    const activityTable = document.getElementById('activityTable');
    
    if (marks.length === 0) {
        activityTable.innerHTML = '<tr><td colspan="4" class="text-center">No recent activity</td></tr>';
        return;
    }
    
    // Get recent marks (last 10)
    const recentMarks = marks
        .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
        .slice(0, 10);
    
    activityTable.innerHTML = recentMarks.map(mark => `
        <tr>
            <td><i class="fas fa-plus text-success"></i> Mark Added</td>
            <td>${mark.studentName}</td>
            <td>${mark.subject} - ${mark.total}%</td>
            <td>${formatDate(mark.dateAdded)}</td>
        </tr>
    `).join('');
}

// Show add student modal
function showAddStudentModal() {
    document.getElementById('addStudentModal').classList.remove('hidden');
}

// Show add teacher modal
function showAddTeacherModal() {
    document.getElementById('addTeacherModal').classList.remove('hidden');
}

// Show add subject modal
function showAddSubjectModal() {
    document.getElementById('addSubjectModal').classList.remove('hidden');
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Export data
function exportData() {
    const data = {
        students: students,
        teachers: teachers,
        subjects: subjects,
        marks: marks
    };
    
    const filename = `student_mark_data_${getCurrentDate()}.json`;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", filename);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    showNotification('Data exported successfully!', 'success');
}

// Handle form submissions
document.addEventListener('DOMContentLoaded', function() {
    // Add student form
    const addStudentForm = document.getElementById('addStudentForm');
    if (addStudentForm) {
        addStudentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const student = {
                id: generateId(),
                name: document.getElementById('studentName').value,
                email: document.getElementById('studentEmail').value,
                grade: document.getElementById('studentGrade').value,
                phone: document.getElementById('studentPhone').value,
                dateAdded: new Date().toISOString()
            };
            
            students.push(student);
            storage.set('students', students);
            
            updateOverviewCards();
            populateStudentDropdowns();
            showNotification('Student added successfully!', 'success');
            closeModal('addStudentModal');
            addStudentForm.reset();
        });
    }
    
    // Add teacher form
    const addTeacherForm = document.getElementById('addTeacherForm');
    if (addTeacherForm) {
        addTeacherForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const teacher = {
                id: generateId(),
                name: document.getElementById('teacherName').value,
                email: document.getElementById('teacherEmail').value,
                subject: document.getElementById('teacherSubject').value,
                phone: document.getElementById('teacherPhone').value,
                dateAdded: new Date().toISOString()
            };
            
            teachers.push(teacher);
            storage.set('teachers', teachers);
            
            updateOverviewCards();
            showNotification('Teacher added successfully!', 'success');
            closeModal('addTeacherModal');
            addTeacherForm.reset();
        });
    }
    
    // Add subject form
    const addSubjectForm = document.getElementById('addSubjectForm');
    if (addSubjectForm) {
        addSubjectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const subject = {
                id: generateId(),
                name: document.getElementById('subjectName').value,
                code: document.getElementById('subjectCode').value,
                description: document.getElementById('subjectDescription').value,
                dateAdded: new Date().toISOString()
            };
            
            subjects.push(subject);
            storage.set('subjects', subjects);
            
            updateOverviewCards();
            showNotification('Subject added successfully!', 'success');
            closeModal('addSubjectModal');
            addSubjectForm.reset();
        });
    }
});

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });
});

// Add modal styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    
    .modal.hidden {
        display: none;
    }
    
    .modal-content {
        background: white;
        border-radius: 15px;
        padding: 0;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }
    
    .modal-header {
        padding: 20px 25px;
        border-bottom: 1px solid #e1e5e9;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h3 {
        margin: 0;
        color: #333;
        font-size: 1.3rem;
    }
    
    .modal-header h3 i {
        margin-right: 10px;
        color: #4CAF50;
    }
    
    .close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s ease;
    }
    
    .close:hover {
        background: #f0f0f0;
    }
    
    .modal form {
        padding: 25px;
    }
    
    .form-actions {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
        margin-top: 20px;
    }
    
    .text-success {
        color: #4CAF50;
    }
    
    .text-center {
        text-align: center;
    }
`;

document.head.appendChild(modalStyles);

// Add global functions for buttons in admin.html
function showAddStudent() {
    var modal = document.getElementById('userManagementModal');
    if (modal) {
        modal.classList.remove('hidden');
    showUserTab('add');
    } else {
        alert('User Management modal not found!');
    }
}

function showAddTeacher() {
    var modal = document.getElementById('userManagementModal');
    if (modal) {
        modal.classList.remove('hidden');
    showUserTab('add');
    } else {
        alert('User Management modal not found!');
    }
}

function showAddMark() {
    var modal = document.getElementById('addMarkModal');
    if (modal) {
        modal.classList.remove('hidden');
    } else {
        alert('Add Mark modal not found!');
    }
}

function showUserManagement() {
    document.getElementById('userManagementModal').classList.remove('hidden');
    renderStudentsList();
    renderTeachersList();
    renderAllUsersTable();
}

// Calculate and update the total in the Add Mark modal in real time
function calculateTotalPreview() {
    const activity = parseFloat(document.getElementById('addActivity').value) || 0;
    const exerciseBook = parseFloat(document.getElementById('addExerciseBook').value) || 0;
    const midExam = parseFloat(document.getElementById('addMidExam').value) || 0;
    const finalExam = parseFloat(document.getElementById('addFinalExam').value) || 0;
    const groupWork = parseFloat(document.getElementById('addGroupWork').value) || 0;
    const worksheet = parseFloat(document.getElementById('addWorksheet').value) || 0;
    const total = activity + exerciseBook + midExam + finalExam + groupWork + worksheet;
    document.getElementById('totalPreview').textContent = total;
}

// Update saveMark to include a comment field
function saveMark() {
    try {
        // Get form values
        const studentId = document.getElementById('addStudent').value;
        const subject = document.getElementById('addSubject').value;
        const term = document.getElementById('addTerm').value;
        const activity = parseFloat(document.getElementById('addActivity').value) || 0;
        const exerciseBook = parseFloat(document.getElementById('addExerciseBook').value) || 0;
        const midExam = parseFloat(document.getElementById('addMidExam').value) || 0;
        const finalExam = parseFloat(document.getElementById('addFinalExam').value) || 0;
        const groupWork = parseFloat(document.getElementById('addGroupWork').value) || 0;
        const worksheet = parseFloat(document.getElementById('addWorksheet').value) || 0;
        const comment = document.getElementById('addComment') ? document.getElementById('addComment').value : '';

        // Validate required fields
        if (!studentId || !subject || !term) {
            return;
        }

        // Find student
        const student = students.find(s => s.id === studentId);
        // Find teacher for the subject
        let teacher = 'Unknown';
        if (teachers && teachers.length > 0) {
            const found = teachers.find(t => t.subject && t.subject.toLowerCase() === subject.toLowerCase());
            if (found) teacher = found.name + ' (' + found.subject + ')';
        }

        // Calculate total and grade
        const total = activity + exerciseBook + midExam + finalExam + groupWork + worksheet;
        const grade = typeof calculateGrade === 'function' ? calculateGrade(total) : total;

        // Create mark object
        const mark = {
            id: generateId(),
            studentId,
            studentName: student ? student.name : 'Unknown',
            subject,
            term,
            activity,
            exerciseBook,
            midExam,
            finalExam,
            groupWork,
            worksheet,
            total,
            grade,
            teacher,
            comment,
            dateAdded: new Date().toISOString()
        };

        marks.push(mark);
        storage.set('marks', marks);
        updateOverviewCards();
        loadRecentActivity();
        showNotification('Mark added successfully!', 'success');
        closeModal('addMarkModal');
        document.getElementById('addMarkForm').reset();
        calculateTotalPreview(); // Reset total preview
    } catch (e) {
        // Do nothing on error
    }
}

// Populate student dropdowns in mark management and add mark modal
function populateStudentDropdowns() {
    const filterStudent = document.getElementById('filterStudent');
    const addStudent = document.getElementById('addStudent');
    if (filterStudent) {
        filterStudent.innerHTML = '<option value="">All Students</option>' +
            students.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    }
    if (addStudent) {
        addStudent.innerHTML = '<option value="">Select Student</option>' +
            students.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    }
}

// Stubs for quick action functions
function showAllUsers() {
    var modal = document.getElementById('userManagementModal');
    if (modal) {
        modal.classList.remove('hidden');
    showUserTab('all');
    } else {
        alert('User Management modal not found!');
    }
}

function showBulkImport() {
    var modal = document.getElementById('bulkImportModal');
    if (modal) {
        modal.classList.remove('hidden');
    } else {
        alert('Bulk Import modal not found!');
    }
}

function showSystemStats() {
    var modal = document.getElementById('systemStatsModal');
    if (modal) {
        modal.classList.remove('hidden');
    setTimeout(() => {
        if (window.Chart && document.getElementById('systemStatsChart')) {
            new Chart(document.getElementById('systemStatsChart').getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Students', 'Teachers', 'Subjects'],
                    datasets: [{
                        label: 'Count',
                        data: [students.length, teachers.length, subjects.length],
                        backgroundColor: ['#2196F3', '#4CAF50', '#FFC107']
                    }]
                },
                options: { responsive: false, plugins: { legend: { display: false } } }
            });
        }
    }, 200);
    } else {
        alert('System Stats modal not found!');
    }
}

function showStudentImage() {
    var modal = document.getElementById('studentImagesModal');
    if (modal) {
        modal.classList.remove('hidden');
    } else {
        alert('Student Images modal not found!');
    }
}

function showDeadlineManagement() {
    var modal = document.getElementById('deadlinesModal');
    if (modal) {
        modal.classList.remove('hidden');
    } else {
        alert('Deadlines modal not found!');
    }
}

function resetDemoData() {
    var modal = document.getElementById('resetDemoDataModal');
    if (modal) {
        modal.classList.remove('hidden');
    } else {
        alert('Reset Demo Data modal not found!');
    }
}

function loadDemoData() {
    var modal = document.getElementById('loadDemoDataModal');
    if (modal) {
        modal.classList.remove('hidden');
    } else {
        alert('Load Demo Data modal not found!');
    }
}

// Image preview for student images
if (document.getElementById('studentImageUpload')) {
    document.getElementById('studentImageUpload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        const select = document.getElementById('studentImageSelect');
        const studentId = select ? select.value : '';
        if (file && studentId) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                document.getElementById('studentImagePreview').innerHTML = `<img src="${evt.target.result}" alt="Preview" style="max-width:100px;max-height:100px;">`;
                saveStudentImage(studentId, evt.target.result);
            };
            reader.readAsDataURL(file);
        } else if (!studentId) {
            showNotification('Please select a student first.', 'warning');
            e.target.value = '';
        }
    });
}

// Deadlines logic
function renderDeadlines() {
    const list = document.getElementById('deadlinesList');
    if (list) {
        list.className = 'deadline-list';
        list.innerHTML = deadlines.map((d, i) => {
            const dateObj = new Date(d.date);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString('default', { month: 'short' });
            return `<div class='deadline-item'>
                <div class='deadline-date-box'>
                    <span class='deadline-day'>${day}</span>
                    <span class='deadline-month'>${month}</span>
                </div>
                <div>
                    <div class='deadline-title'>${d.title}</div>
                    <div style='font-size:0.98em;color:#666;'>${d.date}</div>
                </div>
                ${d.cleared ? `<span class='deadline-cleared'>(Cleared)</span>` : `<button onclick='clearDeadline(${i})' class='deadline-clear-btn'>Clear</button>`}
            </div>`;
        }).join('');
    }
}

function notifyTeachersOfDeadline(deadline) {
    const teachers = storage.get('teachers') || [];
    let notifications = storage.get('notifications') || [];
    teachers.forEach(t => {
        notifications.push({
            id: generateId(),
            to: t.id,
            from: 'admin',
            message: `New deadline set: ${deadline.title} on ${deadline.date}`,
            date: new Date().toISOString(),
            read: false
        });
    });
    storage.set('notifications', notifications);
}

if (document.getElementById('addDeadlineForm')) {
    document.getElementById('addDeadlineForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('deadlineTitle').value;
        const date = document.getElementById('deadlineDate').value;
        if (title && date) {
            deadlines.push({ title, date, cleared: false });
            storage.set('deadlines', deadlines);
            renderDeadlines();
            document.getElementById('addDeadlineForm').reset();
            notifyTeachersOfDeadline({ title, date });
        }
    });
    renderDeadlines();
}

function clearDeadline(index) {
    if (typeof index !== 'number') return;
    deadlines[index].cleared = true;
    storage.set('deadlines', deadlines);
    renderDeadlines();
    showNotification('Deadline cleared. Teachers can now add marks.', 'success');
}

function confirmResetDemoData() {
    storage.clear();
    showNotification('Demo data reset!', 'success');
    closeModal('resetDemoDataModal');
    location.reload();
}

function confirmLoadDemoData() {
    // For now, just show a notification
    showNotification('Demo data loaded!', 'success');
    closeModal('loadDemoDataModal');
    location.reload();
}

// --- Add stubs for missing functions referenced in admin.html ---
function renderMarksTable(filteredMarks) {
    const table = document.getElementById('marksTable');
    if (!table) return;
    if (!filteredMarks || filteredMarks.length === 0) {
        table.innerHTML = '<tr><td colspan="8" class="text-center">No marks found</td></tr>';
        return;
    }
    table.innerHTML = filteredMarks.map(m =>
        `<tr>
            <td>${m.studentName}</td>
            <td>${m.subject}</td>
            <td>${m.term}</td>
            <td>${m.total}</td>
            <td>${m.grade}</td>
            <td>${m.teacher}</td>
            <td>${m.comment ? m.comment : ''}</td>
            <td><!-- Actions here if needed --></td>
        </tr>`
    ).join('');
}
function filterMarks() {
    const subject = document.getElementById('filterSubject').value;
    const student = document.getElementById('filterStudent').value;
    let filtered = (storage.get('marks') || []);
    if (subject) filtered = filtered.filter(m => m.subject === subject);
    if (student) filtered = filtered.filter(m => m.studentId === student);
    // Also apply search if any
    const search = document.getElementById('searchMarks') ? document.getElementById('searchMarks').value.toLowerCase() : '';
    if (search) {
        filtered = filtered.filter(m =>
            (m.studentName && m.studentName.toLowerCase().includes(search)) ||
            (m.subject && m.subject.toLowerCase().includes(search)) ||
            (m.term && m.term.toLowerCase().includes(search)) ||
            (m.grade + '').toLowerCase().includes(search) ||
            (m.teacher && m.teacher.toLowerCase().includes(search))
        );
    }
    renderMarksTable(filtered);
}
function searchMarks() {
    filterMarks(); // search is integrated with filter
}
// On page load, render all marks
if (window.location.pathname.includes('admin.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        renderMarksTable(storage.get('marks') || []);
    });
}
function exportMarks() {
    // Export all marks as CSV
    const marks = storage.get('marks') || [];
    if (!marks.length) {
        showNotification('No marks to export.', 'warning');
        return;
    }
    const csv = [
        ['Student', 'Subject', 'Term', 'Total', 'Grade', 'Teacher'],
        ...marks.map(m => [m.studentName, m.subject, m.term, m.total, m.grade, m.teacher])
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'all_marks.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Marks exported as CSV!', 'success');
}
function generateReport() {
    // Export all marks as a styled PDF
    const marks = storage.get('marks') || [];
    if (!marks.length) {
        showNotification('No marks to export.', 'warning');
        return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('All Marks Report', 14, 18);
    doc.setFontSize(10);
    const headers = ['Student', 'Subject', 'Term', 'Total', 'Grade', 'Teacher'];
    const rows = marks.map(m => [m.studentName, m.subject, m.term, m.total, m.grade, m.teacher]);
    let y = 28;
    // Table header
    doc.setFillColor(56, 217, 150);
    doc.setTextColor(0,0,0);
    doc.rect(14, y-5, 182, 8, 'F');
    headers.forEach((h, i) => {
        doc.text(h, 16 + i*30, y);
    });
    y += 8;
    // Table rows
    rows.forEach(row => {
        row.forEach((cell, i) => {
            doc.text(String(cell), 16 + i*30, y);
        });
        y += 8;
        if (y > 280) {
            doc.addPage();
            y = 20;
        }
    });
    doc.save('all_marks_report.pdf');
    showNotification('PDF report generated!', 'success');
}
function showAddNotification() {
    document.getElementById('addNotificationModal').classList.remove('hidden');
}
function showUserTab(tab) {
    // Switch between user management tabs
    const tabs = ['studentsTab', 'teachersTab', 'addUserTab', 'allUsersTab'];
    tabs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    });
    if (tab === 'students') document.getElementById('studentsTab').classList.add('active');
    if (tab === 'teachers') document.getElementById('teachersTab').classList.add('active');
    if (tab === 'add') document.getElementById('addUserTab').classList.add('active');
    if (tab === 'all') document.getElementById('allUsersTab').classList.add('active');
}
function showUserSnippetModal(snippet) {
    let modal = document.getElementById('userSnippetModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'userSnippetModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class='fas fa-code'></i> Copy User Code for auth.js</h3>
                    <span class="close" onclick="closeModal('userSnippetModal')">&times;</span>
                </div>
                <div class="modal-body">
                    <p>Copy and paste this code into your <b>auth.js</b> file inside the <code>users</code> object:</p>
                    <pre id="userSnippetCode" style="background:#f4f4f4;padding:10px;border-radius:5px;overflow:auto;"></pre>
                    <button onclick="copyUserSnippet()" class="btn btn-primary">Copy to Clipboard</button>
                </div>
                <div class="modal-footer">
                    <button onclick="closeModal('userSnippetModal')" class="btn btn-secondary">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    document.getElementById('userSnippetCode').textContent = snippet;
    modal.classList.remove('hidden');
}

function copyUserSnippet() {
    const code = document.getElementById('userSnippetCode').textContent;
    navigator.clipboard.writeText(code).then(() => {
        showNotification('Copied to clipboard!', 'success');
    });
}

// Update saveNewUser to show the snippet modal
function saveNewUser() {
    // Enforce: Only one subject can ever be assigned to a teacher.
    // This is a business rule. Do not change to allow multiple subjects per teacher unless requirements change.
    // Get form values
    const name = document.getElementById('newUserName').value.trim();
    const username = document.getElementById('newUserUsername').value.trim();
    const password = document.getElementById('newUserPassword').value.trim();
    const role = document.getElementById('newUserRole').value;
    let subject = '';
    if (role === 'teacher') {
        subject = document.getElementById('newUserSubject') ? document.getElementById('newUserSubject').value : '';
        // Defensive: If subject is an array (shouldn't be), only take the first one
        if (Array.isArray(subject)) subject = subject[0] || '';
    }
    else {
        subject = document.getElementById('newUserSubject') ? document.getElementById('newUserSubject').value : '';
    }

    if (!name || !username || !password || !role || (role === 'teacher' && !subject)) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    let newUser = {
        username: username,
        password: password,
        name: name,
        role: role,
        email: username + '@internationalschool.com',
        fullName: name
    };
    let snippet = '';
    if (role === 'student') {
        newUser.grade = '10th Grade';
        if (students.some(s => s.id === username)) {
            showNotification('A student with this username already exists.', 'error');
            return;
        }
        students.push({
            id: username,
            name: name,
            email: '',
            grade: '',
            phone: '',
            password: password,
            dateAdded: new Date().toISOString()
        });
        storage.set('students', students);
        updateOverviewCards();
        populateStudentDropdowns();
        document.getElementById('addUserForm').reset();
        showUserTab('students');
        snippet = `'${username}': ${JSON.stringify(newUser, null, 4)},`;
    } else if (role === 'teacher') {
        // Always assign only one subject
        newUser.subjects = [subject];
        if (teachers.some(t => t.id === username)) {
            showNotification('A teacher with this username already exists.', 'error');
            return;
        }
        teachers.push({
            id: username,
            name: name,
            email: '',
            subject: subject,
            phone: '',
            password: password,
            dateAdded: new Date().toISOString()
        });
        storage.set('teachers', teachers);
        updateOverviewCards();
        document.getElementById('addUserForm').reset();
        showUserTab('teachers');
        snippet = `'${username}': ${JSON.stringify(newUser, null, 4)},`;
    }
    showUserSnippetModal(snippet);
}

// Import students from auth.js if none exist in localStorage
function importStudentsFromAuth() {
    if (!students || students.length === 0) {
        if (typeof users !== 'undefined') {
            const studentList = Object.values(users).filter(u => u.role === 'student');
            students = studentList.map(u => ({
                id: u.username,
                name: u.name || u.fullName,
                email: u.email,
                grade: u.grade || '',
                phone: '',
                dateAdded: new Date().toISOString()
            }));
            storage.set('students', students);
        }
    }
}

// Import teachers from auth.js if none exist in localStorage
function importTeachersFromAuth() {
    if (!teachers || teachers.length === 0) {
        if (typeof users !== 'undefined') {
            const teacherList = Object.values(users).filter(u => u.role === 'teacher');
            teachers = teacherList.map(u => ({
                id: u.username,
                name: u.name || u.fullName,
                email: u.email,
                subject: (u.subjects && u.subjects.length > 0) ? u.subjects[0] : '',
                phone: '',
                dateAdded: new Date().toISOString()
            }));
            storage.set('teachers', teachers);
        }
    }
}

function generatePassword() {
    const role = document.getElementById('newUserRole') ? document.getElementById('newUserRole').value : '';
    let password = '';
    if (role === 'student') {
        // Find highest student password number
        let maxNum = 100;
        students.forEach(s => {
            const match = (s.password || '').match(/Stud@(\d+)/);
            if (match) {
                const num = parseInt(match[1], 10);
                if (num > maxNum) maxNum = num;
            }
        });
        password = `Stud@${maxNum + 1}`;
    } else if (role === 'teacher') {
        // Find highest teacher password number
        let maxNum = 0;
        teachers.forEach(t => {
            const match = (t.password || '').match(/Teach@(\d+)/);
            if (match) {
                const num = parseInt(match[1], 10);
                if (num > maxNum) maxNum = num;
            }
        });
        password = `Teach@${(maxNum + 1).toString().padStart(3, '0')}`;
    } else {
        // Fallback: random password
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!%*?&';
        for (let i = 0; i < 10; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    }
    const input = document.getElementById('newUserPassword');
    if (input) input.value = password;
}

function toggleNewUserPasswordVisibility() {
    const input = document.getElementById('newUserPassword');
    if (input) {
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    }
}

// --- Admin Notifications & Messaging Logic ---
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('admin.html')) {
        renderAdminMessages();
        // Notification form
        const notifForm = document.getElementById('adminNotificationForm');
        if (notifForm) {
            notifForm.onsubmit = function(e) {
                e.preventDefault();
                sendAdminNotification();
            };
        }
        // Reply form
        const replyForm = document.getElementById('adminReplyForm');
        if (replyForm) {
            replyForm.onsubmit = function(e) {
                e.preventDefault();
                sendAdminReply();
            };
        }
    }
});
function sendAdminNotification() {
    const to = document.getElementById('notificationTo').value.trim();
    const message = document.getElementById('notificationMessage').value.trim();
    if (!to || !message) return;
    let notifications = storage.get('notifications') || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (to === 'all') {
        // Send to all students and teachers individually
        const students = storage.get('students') || [];
        const teachers = storage.get('teachers') || [];
        students.forEach(s => {
            notifications.push({
                id: generateId(),
                to: s.id,
                from: currentUser ? currentUser.username : 'admin',
                message: message,
                date: new Date().toISOString(),
                read: false
            });
        });
        teachers.forEach(t => {
            notifications.push({
                id: generateId(),
                to: t.id,
                from: currentUser ? currentUser.username : 'admin',
                message: message,
                date: new Date().toISOString(),
                read: false
            });
        });
        // Also keep a single 'all' notification for compatibility
        notifications.push({
            id: generateId(),
            to: 'all',
            from: currentUser ? currentUser.username : 'admin',
            message: message,
            date: new Date().toISOString(),
            read: false
        });
    } else {
        notifications.push({
            id: generateId(),
            to: to,
            from: currentUser ? currentUser.username : 'admin',
            message: message,
            date: new Date().toISOString(),
            read: false
        });
    }
    storage.set('notifications', notifications);
    document.getElementById('adminNotificationForm').reset();
    showNotification('Notification sent!', 'success');
}
function renderAdminMessages() {
    const list = document.getElementById('adminMessagesList');
    if (!list) return;
    const messages = (storage.get('messages') || []).filter(m => m.to === 'admin' || m.to === 'admin' || m.to === (JSON.parse(localStorage.getItem('currentUser')) || {}).username);
    if (messages.length === 0) {
        list.innerHTML = '<p class="text-center">No messages yet.</p>';
        return;
    }
    list.innerHTML = messages.map(m =>
        `<div class="message-item received">
            <div><b>${m.from}:</b> ${m.message}</div>
            <div style="font-size:0.9em;color:#888;">${formatDate(m.date)}</div>
            <button class="btn btn-sm" onclick="showAdminReplyForm('${m.from}')">Reply</button>
        </div>`
    ).join('');
}
function showAdminReplyForm(to) {
    document.getElementById('adminReplyTo').value = to;
    document.getElementById('adminReplyForm').style.display = '';
}
function closeAdminReplyForm() {
    document.getElementById('adminReplyForm').style.display = 'none';
    document.getElementById('adminReplyForm').reset();
}
function sendAdminReply() {
    const to = document.getElementById('adminReplyTo').value.trim();
    const message = document.getElementById('adminReplyText').value.trim();
    if (!to || !message) return;
    let messages = storage.get('messages') || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    messages.push({
        id: generateId(),
        from: currentUser ? currentUser.username : 'admin',
        to: to,
        message: message,
        date: new Date().toISOString()
    });
    storage.set('messages', messages);
    closeAdminReplyForm();
    renderAdminMessages();
    showNotification('Reply sent!', 'success');
}

// --- Admin to Teacher Messaging Logic ---
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('admin.html')) {
        renderAdminTeacherMessages();
        // Send message form
        const msgForm = document.getElementById('adminTeacherMessageForm');
        if (msgForm) {
            msgForm.onsubmit = function(e) {
                e.preventDefault();
                sendAdminTeacherMessage();
            };
        }
        // Reply form
        const replyForm = document.getElementById('adminTeacherReplyForm');
        if (replyForm) {
            replyForm.onsubmit = function(e) {
                e.preventDefault();
                sendAdminTeacherReply();
            };
        }
    }
});
function renderAdminTeacherMessages() {
    const list = document.getElementById('adminTeacherMessagesList');
    if (!list) return;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const messages = (storage.get('messages') || []).filter(m => (m.to === currentUser.username || m.to === 'admin' || m.to === 'all-admins') && (m.from && m.from !== currentUser.username));
    if (messages.length === 0) {
        list.innerHTML = '<p class="text-center">No messages yet.</p>';
        return;
    }
    list.innerHTML = messages.map(m =>
        `<div class="message-item received">
            <div><b>${m.from}:</b> ${m.message}</div>
            <div style="font-size:0.9em;color:#888;">${formatDate(m.date)}</div>
            <button class="btn btn-sm" onclick="showAdminTeacherReplyForm('${m.from}')">Reply</button>
        </div>`
    ).join('');
}
function sendAdminTeacherMessage() {
    const to = document.getElementById('adminTeacherMessageTo').value.trim();
    const message = document.getElementById('adminTeacherMessageText').value.trim();
    if (!to || !message) return;
    let messages = storage.get('messages') || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    messages.push({
        id: generateId(),
        from: currentUser ? currentUser.username : 'admin',
        to: to,
        message: message,
        date: new Date().toISOString()
    });
    storage.set('messages', messages);
    document.getElementById('adminTeacherMessageForm').reset();
    renderAdminTeacherMessages();
    showNotification('Message sent!', 'success');
}
function showAdminTeacherReplyForm(to) {
    document.getElementById('adminTeacherReplyTo').value = to;
    document.getElementById('adminTeacherReplyForm').style.display = '';
}
function closeAdminTeacherReplyForm() {
    document.getElementById('adminTeacherReplyForm').style.display = 'none';
    document.getElementById('adminTeacherReplyForm').reset();
}
function sendAdminTeacherReply() {
    const to = document.getElementById('adminTeacherReplyTo').value.trim();
    const message = document.getElementById('adminTeacherReplyText').value.trim();
    if (!to || !message) return;
    let messages = storage.get('messages') || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    messages.push({
        id: generateId(),
        from: currentUser ? currentUser.username : 'admin',
        to: to,
        message: message,
        date: new Date().toISOString()
    });
    storage.set('messages', messages);
    closeAdminTeacherReplyForm();
    renderAdminTeacherMessages();
    showNotification('Reply sent!', 'success');
}

function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('themeBtn');
    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem('adminTheme', isDark ? 'dark' : 'light');
    if (btn) {
        btn.innerHTML = isDark ? '<i class="fas fa-moon"></i> Light Mode' : '<i class="fas fa-sun"></i> Dark Mode';
    }
}

// Apply theme on load
window.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('adminTheme');
    const body = document.body;
    const btn = document.getElementById('themeBtn');
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        if (btn) btn.innerHTML = '<i class="fas fa-moon"></i> Light Mode';
    } else {
        body.classList.remove('dark-mode');
        if (btn) btn.innerHTML = '<i class="fas fa-sun"></i> Dark Mode';
    }
});

function renderPerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx || !window.Chart) return;
    // Destroy previous chart instance if it exists
    if (window.performanceChartInstance) {
        window.performanceChartInstance.destroy();
    }
    const marks = storage.get('marks') || [];
    const subjects = Array.from(new Set(marks.map(m => m.subject)));
    const averages = subjects.map(subj => {
        const subjMarks = marks.filter(m => m.subject === subj);
        if (!subjMarks.length) return 0;
        return Math.round(subjMarks.reduce((sum, m) => sum + (m.total || 0), 0) / subjMarks.length);
    });
    window.performanceChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: subjects,
            datasets: [{
                label: 'Average Mark',
                data: averages,
                backgroundColor: ['#ffe066', '#baff80', '#38d996', '#4CAF50', '#FFC107', '#2196F3', '#FF9800'],
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, max: 100 } }
        }
    });
}
function renderTopPerformers() {
    const marks = storage.get('marks') || [];
    const students = storage.get('students') || [];
    // Calculate average for each student
    const studentAverages = {};
    marks.forEach(m => {
        if (!studentAverages[m.studentId]) studentAverages[m.studentId] = { total: 0, count: 0, name: m.studentName };
        studentAverages[m.studentId].total += m.total || 0;
        studentAverages[m.studentId].count += 1;
    });
    const leaderboard = Object.entries(studentAverages)
        .map(([id, data]) => ({ id, name: data.name, avg: data.count ? (data.total / data.count) : 0 }))
        .sort((a, b) => b.avg - a.avg)
        .slice(0, 5);
    const list = document.getElementById('leaderboard');
    if (!list) return;
    if (!leaderboard.length) {
        list.innerHTML = '<p class="text-center">No data yet.</p>';
        return;
    }
    list.innerHTML = leaderboard.map((s, i) =>
        `<div class="leaderboard-item">
            <span class="leaderboard-rank">${i + 1}</span>
            <span class="leaderboard-name">${s.name}</span>
            <span class="leaderboard-score">${Math.round(s.avg)}%</span>
        </div>`
    ).join('');
}
// Call on dashboard load and after marks change
if (window.location.pathname.includes('admin.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        renderPerformanceChart();
        renderTopPerformers();
    });
}
const origRenderMarksTable = renderMarksTable;
renderMarksTable = function(filteredMarks) {
    origRenderMarksTable(filteredMarks);
    renderPerformanceChart();
    renderTopPerformers();
};

function renderFirstNotification() {
    const div = document.getElementById('firstNotification');
    if (!div) return;
    const notifications = (storage.get('notifications') || []).filter(n => n.from === (currentUser ? currentUser.username : 'admin'));
    if (!notifications.length) {
        div.innerHTML = '';
        return;
    }
    const first = notifications.reduce((min, n) => new Date(n.date) < new Date(min.date) ? n : min, notifications[0]);
    div.innerHTML = `
        <div class="notification-item" style="background:#ffe066;color:#222;">
            <div><b>First Notification</b></div>
            <div><b>From:</b> ${first.from}</div>
            <div>${first.message}</div>
            <div style="font-size:0.9em;color:#888;">${formatDate(first.date)}</div>
        </div>
    `;
}
// Call on dashboard load and after sending notification
if (window.location.pathname.includes('admin.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        renderFirstNotification();
    });
}
const origSendAdminNotification = sendAdminNotification;
sendAdminNotification = function() {
    origSendAdminNotification();
    renderFirstNotification();
};

function renderAdminNotifications() {
    const list = document.getElementById('notificationsList');
    if (!list) return;
    const notifications = (storage.get('notifications') || []).filter(n => n.from === (currentUser ? currentUser.username : 'admin'));
    if (!notifications.length) {
        list.innerHTML = '<p class="text-center">No notifications yet.</p>';
        return;
    }
    list.innerHTML = notifications.map(n =>
        `<div class="notification-item">
            <div><b>To:</b> ${n.to}</div>
            <div>${n.message}</div>
            <div style="font-size:0.9em;color:#888;">${formatDate(n.date)}</div>
        </div>`
    ).join('');
}
// Call on dashboard load and after sending notification
if (window.location.pathname.includes('admin.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        renderAdminNotifications();
    });
}
const origSendAdminNotification2 = sendAdminNotification;
sendAdminNotification = function() {
    origSendAdminNotification2();
    renderAdminNotifications();
};

function renderStudentsList() {
    const list = document.getElementById('studentsList');
    if (!list) return;
    const students = storage.get('students') || [];
    if (!students.length) {
        list.innerHTML = '<p class="text-center">No students found.</p>';
        return;
    }
    list.innerHTML = students.map(s =>
        `<div class="user-item">
            <h4>${s.name} <span style="font-size:0.9em;color:#888;">(${s.id})</span></h4>
            <p>Email: ${s.email || '-'}</p>
            <p>Grade: ${s.grade || '-'}</p>
            <p>Phone: ${s.phone || '-'}</p>
        </div>`
    ).join('');
}
function renderTeachersList() {
    const list = document.getElementById('teachersList');
    if (!list) return;
    const teachers = storage.get('teachers') || [];
    if (!teachers.length) {
        list.innerHTML = '<p class="text-center">No teachers found.</p>';
        return;
    }
    list.innerHTML = teachers.map(t =>
        `<div class="user-item">
            <h4>${t.name} <span style="font-size:0.9em;color:#888;">(${t.id})</span></h4>
            <p>Email: ${t.email || '-'}</p>
            <p>Subject: ${t.subject || '-'}</p>
            <p>Phone: ${t.phone || '-'}</p>
        </div>`
    ).join('');
}
function renderAllUsersTable() {
    const tbody = document.getElementById('allUsersTableBody');
    if (!tbody) return;
    const students = storage.get('students') || [];
    const teachers = storage.get('teachers') || [];
    tbody.innerHTML = [
        ...students.map(s =>
            `<tr><td>${s.name}</td><td>${s.id}</td><td>${s.password || '-'}</td><td>Student</td><td>-</td></tr>`
        ),
        ...teachers.map(t =>
            `<tr><td>${t.name}</td><td>${t.id}</td><td>${t.password || '-'}</td><td>Teacher</td><td>${t.subject || '-'}</td></tr>`
        )
    ].join('');
}

function populateStudentImageDropdown() {
    const select = document.getElementById('studentImageSelect');
    if (!select) return;
    const students = storage.get('students') || [];
    select.innerHTML = '<option value="">Select Student</option>' +
        students.map(s => `<option value="${s.id}">${s.name} (${s.id})</option>`).join('');
}
if (window.location.pathname.includes('admin.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        populateStudentImageDropdown();
    });
}
function saveStudentImage(studentId, base64) {
    let students = storage.get('students') || [];
    students = students.map(s => s.id === studentId ? { ...s, image: base64 } : s);
    storage.set('students', students);
    // If student dashboard is open, update image there too
    if (window.parent && window.parent !== window && window.parent.updateStudentProfileImage) {
        window.parent.updateStudentProfileImage(studentId, base64);
    }
}

function refreshData() {
    students = storage.get('students') || [];
    teachers = storage.get('teachers') || [];
    subjects = storage.get('subjects') || [];
    marks = storage.get('marks') || [];
    deadlines = storage.get('deadlines') || [];
    updateOverviewCards();
    loadRecentActivity();
    renderMarksTable(marks);
    renderAdminNotifications();
    renderStudentsList();
    renderTeachersList();
    renderAllUsersTable();
    renderDeadlines();
    renderPerformanceChart();
    renderTopPerformers();
    renderFirstNotification();
    showNotification('Dashboard refreshed!', 'success');
}

// --- Bulk Import/Export Logic ---
document.addEventListener('DOMContentLoaded', function() {
    const importForm = document.getElementById('bulkImportForm');
    const importFile = document.getElementById('bulkImportFile');
    if (importForm && importFile) {
        importForm.onsubmit = function(e) {
            e.preventDefault();
            if (!importFile.files.length) return alert('Please select a file.');
            const file = importFile.files[0];
            const reader = new FileReader();
            reader.onload = function(evt) {
                let data;
                if (file.name.endsWith('.json')) {
                    try { data = JSON.parse(evt.target.result); } catch { return alert('Invalid JSON file.'); }
                } else if (file.name.endsWith('.csv')) {
                    data = csvToArray(evt.target.result);
                } else {
                    return alert('Unsupported file type.');
                }
                // Try to detect type and import
                if (Array.isArray(data)) {
                    if (data.length && data[0].grade !== undefined) {
                        storage.set('students', data);
                        showNotification('Students imported!', 'success');
                    } else if (data.length && data[0].subject !== undefined && data[0].grade === undefined) {
                        storage.set('teachers', data);
                        showNotification('Teachers imported!', 'success');
                    } else if (data.length && data[0].total !== undefined) {
                        storage.set('marks', data);
                        showNotification('Marks imported!', 'success');
                    } else if (data.length && data[0].status !== undefined) {
                        localStorage.setItem('attendance', JSON.stringify(data));
                        showNotification('Attendance imported!', 'success');
                    } else if (data.length && data[0].dueDate !== undefined) {
                        localStorage.setItem('assignments', JSON.stringify(data));
                        showNotification('Assignments imported!', 'success');
                    } else {
                        alert('Unknown data format.');
                    }
                } else {
                    alert('Invalid data format.');
                }
            };
            reader.readAsText(file);
        };
    }
});
function exportDataType(type) {
    let data = [];
    if (type === 'students') data = storage.get('students') || [];
    if (type === 'teachers') data = storage.get('teachers') || [];
    if (type === 'marks') data = storage.get('marks') || [];
    if (type === 'attendance') data = JSON.parse(localStorage.getItem('attendance') || '[]');
    if (type === 'assignments') data = JSON.parse(localStorage.getItem('assignments') || '[]');
    if (!data.length) return alert('No data to export.');
    const csv = arrayToCSV(data);
    downloadCSV(csv, `${type}.csv`);
}
function csvToArray(str) {
    const [header, ...rows] = str.trim().split('\n');
    const keys = header.split(',');
    return rows.map(row => {
        const values = row.split(',');
        const obj = {};
        keys.forEach((k, i) => obj[k.trim()] = values[i] ? values[i].trim() : '');
        return obj;
    });
}
function arrayToCSV(arr) {
    if (!arr.length) return '';
    const keys = Object.keys(arr[0]);
    const lines = [keys.join(',')];
    arr.forEach(obj => {
        lines.push(keys.map(k => JSON.stringify(obj[k] || '')).join(','));
    });
    return lines.join('\n');
}
function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// --- Audit Log / Activity History Data Model & Functions ---
const AUDIT_LOG_KEY = 'auditLog';
function getAuditLog() {
    return JSON.parse(localStorage.getItem(AUDIT_LOG_KEY)) || [];
}
function saveAuditLog(log) {
    localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(log));
}
function logAction(user, action, details) {
    const log = getAuditLog();
    log.unshift({
        id: generateId(),
        user,
        action,
        details,
        date: new Date().toISOString()
    });
    saveAuditLog(log);
}

// --- Render Audit Log in Admin Dashboard ---
document.addEventListener('DOMContentLoaded', function() {
    const logTable = document.getElementById('activityLogTable');
    if (logTable) renderAuditLog();
});
function renderAuditLog() {
    const logTable = document.getElementById('activityLogTable');
    if (!logTable) return;
    const log = getAuditLog();
    if (!log.length) {
        logTable.innerHTML = '<tr><td colspan="4" class="text-center">No activity yet.</td></tr>';
        return;
    }
    logTable.innerHTML = log.slice(0, 50).map(entry =>
        `<tr>
            <td>${formatDate(entry.date)}</td>
            <td>${entry.user}</td>
            <td>${entry.action}</td>
            <td>${entry.details}</td>
        </tr>`
    ).join('');
}
// --- Log Key Actions ---
// Wrap or call logAction in user creation, mark save, assignment create, bulk import/export, etc.
const origSaveNewUser = saveNewUser;
saveNewUser = function() {
    const prevStudents = storage.get('students') || [];
    const prevTeachers = storage.get('teachers') || [];
    origSaveNewUser.apply(this, arguments);
    const newStudents = storage.get('students') || [];
    const newTeachers = storage.get('teachers') || [];
    if (newStudents.length > prevStudents.length) {
        const added = newStudents.find(s => !prevStudents.some(ps => ps.id === s.id));
        if (added) logAction('admin', 'Created student', `Added student ${added.id}`);
    }
    if (newTeachers.length > prevTeachers.length) {
        const added = newTeachers.find(t => !prevTeachers.some(pt => pt.id === t.id));
        if (added) logAction('admin', 'Created teacher', `Added teacher ${added.id}`);
    }
    renderAuditLog();
};
const origSaveMark = typeof saveMark !== 'undefined' ? saveMark : null;
if (origSaveMark) {
    saveMark = function() {
        origSaveMark.apply(this, arguments);
        logAction('teacher', 'Saved mark', 'A mark was added or updated.');
        renderAuditLog();
    };
}
const origAddAssignment = typeof addAssignment !== 'undefined' ? addAssignment : null;
if (origAddAssignment) {
    addAssignment = function(assignment) {
        origAddAssignment.apply(this, arguments);
        logAction('teacher', 'Created assignment', `Assignment: ${assignment.title}`);
        renderAuditLog();
    };
}
// Bulk import/export logging
const origExportDataType = typeof exportDataType !== 'undefined' ? exportDataType : null;
if (origExportDataType) {
    exportDataType = function(type) {
        origExportDataType.apply(this, arguments);
        logAction('admin', 'Exported data', `Exported ${type}`);
        renderAuditLog();
    };
}
document.addEventListener('DOMContentLoaded', function() {
    const importForm = document.getElementById('bulkImportForm');
    if (importForm) {
        importForm.addEventListener('submit', function() {
            logAction('admin', 'Imported data', 'Bulk import performed.');
            renderAuditLog();
        });
    }
});

