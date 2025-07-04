// Main JavaScript - Utility Functions

// Format date
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Get notification icon
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Get notification color
function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#4CAF50';
        case 'error': return '#f44336';
        case 'warning': return '#ff9800';
        default: return '#2196F3';
    }
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
    }
`;

document.head.appendChild(style);

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate required fields
function validateRequired(fields) {
    const errors = [];
    
    fields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors.push(field.message || `${field.id} is required`);
        }
    });
    
    return errors;
}

// Generate random ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Local storage helpers
const storage = {
    get: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            return null;
        }
    },
    
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    },
    
    remove: (key) => {
        localStorage.removeItem(key);
    },
    
    clear: () => {
        localStorage.clear();
    }
};

// Export data to CSV
function exportToCSV(data, filename) {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Convert data to CSV format
function convertToCSV(data) {
    if (!data || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [];
    
    // Add headers
    csvRows.push(headers.join(','));
    
    // Add data rows
    for (const row of data) {
        const values = headers.map(header => {
            const value = row[header];
            return `"${value}"`;
        });
        csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
}

// Calculate grade from percentage
function calculateGrade(percentage) {
    if (percentage >= 90) return 'A+';
    if (percentage >= 85) return 'A';
    if (percentage >= 80) return 'A-';
    if (percentage >= 75) return 'B+';
    if (percentage >= 70) return 'B';
    if (percentage >= 65) return 'B-';
    if (percentage >= 60) return 'C+';
    if (percentage >= 55) return 'C';
    if (percentage >= 50) return 'C-';
    if (percentage >= 45) return 'D+';
    if (percentage >= 40) return 'D';
    return 'F';
}

// Get grade color
function getGradeColor(grade) {
    switch (grade) {
        case 'A+':
        case 'A':
        case 'A-':
            return '#4CAF50';
        case 'B+':
        case 'B':
        case 'B-':
            return '#2196F3';
        case 'C+':
        case 'C':
        case 'C-':
            return '#FF9800';
        case 'D+':
        case 'D':
            return '#F44336';
        case 'F':
            return '#9C27B0';
        default:
            return '#666';
    }
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Get current date in YYYY-MM-DD format
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Get current time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll to element
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Failed to copy', 'error');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('Copied to clipboard!', 'success');
        } catch (err) {
            showNotification('Failed to copy', 'error');
        }
        document.body.removeChild(textArea);
    }
}

// Load image as base64
function loadImageAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Resize image
function resizeImage(file, maxWidth = 800, maxHeight = 600) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            let { width, height } = img;
            
            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }
            
            if (height > maxHeight) {
                width = (width * maxHeight) / height;
                height = maxHeight;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        
        img.src = URL.createObjectURL(file);
    });
}

// --- Teacher Dashboard Logic ---
if (window.location.pathname.includes('teacher.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser || currentUser.role !== 'teacher') {
            window.location.href = 'index.html';
            return;
        }
        document.getElementById('teacherName').textContent = currentUser.name;
        const allStudents = storage.get('students') || [];
        const allMarks = storage.get('marks') || [];
        const subjects = currentUser.subjects || [];
        // Populate subject dropdown in modal
        const subjectSelect = document.getElementById('addSubject');
        if (subjectSelect) {
            subjectSelect.innerHTML = '<option value="">Select Subject</option>' +
                subjects.map(s => `<option value="${s}">${s}</option>`).join('');
        }
        // Find students for teacher's subjects (show all students for now)
        const studentsForTeacher = allStudents;
        // Populate student dropdown in modal
        const studentSelect = document.getElementById('addStudent');
        if (studentSelect) {
            studentSelect.innerHTML = '<option value="">Select Student</option>' +
                studentsForTeacher.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
        }
        // Populate marks table
        updateTeacherMarksTable();

        // --- Attendance Section Logic ---
        const attendanceSubjectSelect = document.getElementById('attendanceSubject');
        const attendanceDateInput = document.getElementById('attendanceDate');
        const attendanceStudentList = document.getElementById('attendanceStudentList');
        const attendanceForm = document.getElementById('attendanceForm');
        // Populate subject dropdown
        if (attendanceSubjectSelect && currentUser && currentUser.subjects) {
            attendanceSubjectSelect.innerHTML = currentUser.subjects.map(s => `<option value="${s}">${s}</option>`).join('');
        }
        // Set today's date by default
        if (attendanceDateInput) {
            attendanceDateInput.value = new Date().toISOString().slice(0, 10);
        }
        // Populate student list when subject or date changes
        function loadAttendanceStudentList() {
            if (!attendanceStudentList) return;
            const subject = attendanceSubjectSelect.value;
            const date = attendanceDateInput.value;
            // Optionally, filter students by subject/class here
            // For now, show all students
            attendanceStudentList.innerHTML = allStudents.map(s => {
                // Check if already marked
                const existing = getAttendanceRecords().find(r => r.date === date && r.subject === subject && r.studentId === s.id);
                const checked = existing && existing.status === 'Present' ? 'checked' : '';
                return `<div><label><input type="checkbox" class="attendance-checkbox" data-student-id="${s.id}" ${checked}> ${s.name} (${s.id})</label></div>`;
            }).join('');
        }
        if (attendanceSubjectSelect && attendanceDateInput) {
            attendanceSubjectSelect.addEventListener('change', loadAttendanceStudentList);
            attendanceDateInput.addEventListener('change', loadAttendanceStudentList);
            loadAttendanceStudentList();
        }
        // Handle attendance form submit
        if (attendanceForm) {
            attendanceForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const subject = attendanceSubjectSelect.value;
                const date = attendanceDateInput.value;
                const checkboxes = attendanceStudentList.querySelectorAll('.attendance-checkbox');
                checkboxes.forEach(cb => {
                    const studentId = cb.getAttribute('data-student-id');
                    const status = cb.checked ? 'Present' : 'Absent';
                    // Check if record exists
                    let existing = getAttendanceRecords().find(r => r.date === date && r.subject === subject && r.studentId === studentId);
                    if (existing) {
                        updateAttendanceRecord(existing.id, status);
                    } else {
                        addAttendanceRecord({
                            id: `${date}_${subject}_${studentId}`,
                            date,
                            subject,
                            teacher: currentUser.name,
                            studentId,
                            status
                        });
                    }
                });
                showNotification('Attendance saved!', 'success');
            });
        }

        // --- Assignment Section Logic ---
        const assignmentForm = document.getElementById('assignmentForm');
        const assignmentList = document.getElementById('assignmentList');
        const assignmentSubject = document.getElementById('assignmentSubject');
        // Populate subject dropdown
        if (assignmentSubject && currentUser && currentUser.subjects) {
            assignmentSubject.innerHTML = currentUser.subjects.map(s => `<option value="${s}">${s}</option>`).join('');
        }
        // Handle assignment creation
        if (assignmentForm) {
            assignmentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const title = document.getElementById('assignmentTitle').value.trim();
                const description = document.getElementById('assignmentDescription').value.trim();
                const dueDate = document.getElementById('assignmentDueDate').value;
                const subject = assignmentSubject.value;
                if (!title || !description || !dueDate || !subject) return;
                addAssignment({
                    id: generateId(),
                    title,
                    description,
                    dueDate,
                    subject,
                    teacher: currentUser.name,
                    createdAt: new Date().toISOString()
                });
                assignmentForm.reset();
                renderTeacherAssignments();
                showNotification('Assignment created!', 'success');
            });
        }
        // Render teacher's assignments
        function renderTeacherAssignments() {
            if (!assignmentList) return;
            const assignments = getAssignments().filter(a => a.teacher === currentUser.name);
            if (!assignments.length) {
                assignmentList.innerHTML = '<p class="text-center">No assignments yet.</p>';
                return;
            }
            assignmentList.innerHTML = assignments.map(a =>
                `<div class="assignment-item">
                    <h4>${a.title} <span style="font-size:0.9em;color:#888;">(${a.subject})</span></h4>
                    <p>${a.description}</p>
                    <p><b>Due:</b> ${a.dueDate}</p>
                </div>`
            ).join('');
        }
        renderTeacherAssignments();
    });
}
function isMarkEntryBlockedForTeacher() {
    const deadlines = storage.get('deadlines') || [];
    const today = new Date().toISOString().slice(0, 10);
    return deadlines.some(d => !d.cleared && d.date <= today);
}
function showAddMarkModal() {
    if (isMarkEntryBlockedForTeacher()) {
        showNotification('Mark entry is blocked due to an active deadline. Please contact the admin.', 'error');
        return;
    }
    document.getElementById('addMarkModal').classList.remove('hidden');
}
function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// --- Teacher Mark Edit/Delete Logic ---
let editingMarkId = null;
let selectedMarkIds = [];
let lastDeletedMarks = [];
function updateTeacherMarksTable() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'teacher') return;
    const marks = (storage.get('marks') || []).filter(m => m.teacher === currentUser.name);
    const table = document.getElementById('teacherMarksTable');
    if (table) {
        if (marks.length === 0) {
            table.innerHTML = '<tr><td colspan="7" class="text-center">No marks found</td></tr>';
        } else {
            table.innerHTML = marks.map(m =>
                `<tr>
                    <td><input type="checkbox" class="mark-checkbox" value="${m.id}" onclick="toggleMarkSelection('${m.id}')" ${selectedMarkIds.includes(m.id) ? 'checked' : ''}></td>
                    <td>${m.studentName}</td>
                    <td>${m.subject}</td>
                    <td>${m.term}</td>
                    <td>${m.total}</td>
                    <td>${m.grade}</td>
                    <td>
                        <button class="btn btn-sm" onclick="editMark('${m.id}')"><i class="fas fa-edit"></i> Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteMark('${m.id}')"><i class="fas fa-trash"></i> Delete</button>
                    </td>
                </tr>`
            ).join('');
        }
    }
}
function editMark(id) {
    const marks = storage.get('marks') || [];
    const mark = marks.find(m => m.id === id);
    if (!mark) return;
    editingMarkId = id;
    document.getElementById('addStudent').value = mark.studentId;
    document.getElementById('addSubject').value = mark.subject;
    document.getElementById('addTerm').value = mark.term;
    document.getElementById('addActivity').value = mark.activity;
    document.getElementById('addExerciseBook').value = mark.exerciseBook;
    document.getElementById('addMidExam').value = mark.midExam;
    document.getElementById('addFinalExam').value = mark.finalExam;
    document.getElementById('addGroupWork').value = mark.groupWork;
    document.getElementById('addWorksheet').value = mark.worksheet;
    document.getElementById('addMarkModal').classList.remove('hidden');
}
function saveMark() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'teacher') return;
    const studentId = document.getElementById('addStudent').value;
    const subject = document.getElementById('addSubject').value;
    const term = document.getElementById('addTerm').value;
    const activity = parseFloat(document.getElementById('addActivity').value) || 0;
    const exerciseBook = parseFloat(document.getElementById('addExerciseBook').value) || 0;
    const midExam = parseFloat(document.getElementById('addMidExam').value) || 0;
    const finalExam = parseFloat(document.getElementById('addFinalExam').value) || 0;
    const groupWork = parseFloat(document.getElementById('addGroupWork').value) || 0;
    const worksheet = parseFloat(document.getElementById('addWorksheet').value) || 0;
    if (!studentId || !subject || !term) return;
    const allStudents = storage.get('students') || [];
    const student = allStudents.find(s => s.id === studentId);
    const total = activity + exerciseBook + midExam + finalExam + groupWork + worksheet;
    const grade = typeof calculateGrade === 'function' ? calculateGrade(total) : total;
    let marks = storage.get('marks') || [];
    if (editingMarkId) {
        // Update existing mark
        marks = marks.map(m => m.id === editingMarkId ? {
            ...m,
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
            dateAdded: new Date().toISOString()
        } : m);
        editingMarkId = null;
    } else {
        // Add new mark
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
            teacher: currentUser.name,
            dateAdded: new Date().toISOString()
        };
        marks.push(mark);
    }
    storage.set('marks', marks);
    updateTeacherMarksTable();
    showNotification('Mark saved successfully!', 'success');
    closeModal('addMarkModal');
    document.getElementById('addMarkForm').reset();
}
function deleteMark(id) {
    if (!confirm('Are you sure you want to delete this mark?')) return;
    let marks = storage.get('marks') || [];
    marks = marks.filter(m => m.id !== id);
    storage.set('marks', marks);
    updateTeacherMarksTable();
    showNotification('Mark deleted!', 'success');
}

// --- Teacher Bulk Actions, Undo, Filter/Search ---
function toggleSelectAllMarks() {
    const selectAll = document.getElementById('selectAllMarks');
    const checkboxes = document.querySelectorAll('.mark-checkbox');
    selectedMarkIds = [];
    checkboxes.forEach(cb => {
        cb.checked = selectAll.checked;
        if (selectAll.checked) selectedMarkIds.push(cb.value);
    });
    updateBulkActionsToolbar();
}
function toggleMarkSelection(id) {
    const idx = selectedMarkIds.indexOf(id);
    if (idx === -1) selectedMarkIds.push(id);
    else selectedMarkIds.splice(idx, 1);
    updateBulkActionsToolbar();
}
function updateBulkActionsToolbar() {
    const toolbar = document.getElementById('bulkActionsToolbar');
    if (toolbar) toolbar.style.display = selectedMarkIds.length > 0 ? '' : 'none';
}
function bulkDeleteMarks() {
    if (!confirm('Are you sure you want to delete the selected marks?')) return;
    let marks = storage.get('marks') || [];
    lastDeletedMarks = marks.filter(m => selectedMarkIds.includes(m.id));
    marks = marks.filter(m => !selectedMarkIds.includes(m.id));
    storage.set('marks', marks);
    selectedMarkIds = [];
    updateTeacherMarksTable();
    updateBulkActionsToolbar();
    showUndoNotification('Bulk delete completed. ', undoBulkDelete);
}
function undoBulkDelete() {
    let marks = storage.get('marks') || [];
    marks = marks.concat(lastDeletedMarks);
    storage.set('marks', marks);
    updateTeacherMarksTable();
    lastDeletedMarks = [];
    showNotification('Undo successful! Marks restored.', 'success');
}
function showUndoNotification(msg, undoFn) {
    showNotification(msg + '<button onclick="(' + undoFn.name + ')()" class="btn btn-sm btn-secondary">Undo</button>', 'warning');
}
function showBulkEditModal() {
    showNotification('Bulk edit coming soon!', 'info');
}
function bulkExportMarks() {
    let marks = storage.get('marks') || [];
    marks = marks.filter(m => selectedMarkIds.includes(m.id));
    if (marks.length === 0) return;
    const csv = [
        ['Student', 'Subject', 'Term', 'Total', 'Grade'],
        ...marks.map(m => [m.studentName, m.subject, m.term, m.total, m.grade])
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'selected_marks.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function filterTeacherMarks() {
    const search = document.getElementById('markSearch').value.toLowerCase();
    const subject = document.getElementById('filterSubject').value;
    const student = document.getElementById('filterStudent').value;
    const term = document.getElementById('filterTerm').value;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let marks = (storage.get('marks') || []).filter(m => m.teacher === currentUser.name);
    if (subject) marks = marks.filter(m => m.subject === subject);
    if (student) marks = marks.filter(m => m.studentId === student);
    if (term) marks = marks.filter(m => m.term === term);
    if (search) marks = marks.filter(m =>
        m.studentName.toLowerCase().includes(search) ||
        m.subject.toLowerCase().includes(search) ||
        m.term.toLowerCase().includes(search) ||
        (m.grade + '').toLowerCase().includes(search)
    );
    renderTeacherMarksTable(marks);
}
function renderTeacherMarksTable(marks) {
    const table = document.getElementById('teacherMarksTable');
    if (table) {
        if (marks.length === 0) {
            table.innerHTML = '<tr><td colspan="8" class="text-center">No marks found</td></tr>';
        } else {
            table.innerHTML = marks.map(m =>
                `<tr>
                    <td><input type="checkbox" class="mark-checkbox" value="${m.id}" onclick="toggleMarkSelection('${m.id}')" ${selectedMarkIds.includes(m.id) ? 'checked' : ''}></td>
                    <td>${m.studentName}</td>
                    <td>${m.subject}</td>
                    <td>${m.term}</td>
                    <td>${m.total}</td>
                    <td>${m.grade}</td>
                    <td>${m.comment ? m.comment : ''}</td>
                    <td>
                        <button class="btn btn-sm" onclick="editMark('${m.id}')"><i class="fas fa-edit"></i> Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteMark('${m.id}')"><i class="fas fa-trash"></i> Delete</button>
                    </td>
                </tr>`
            ).join('');
        }
    }
}
// Patch updateTeacherMarksTable to use renderTeacherMarksTable and update filters
const origUpdateTeacherMarksTable = updateTeacherMarksTable;
updateTeacherMarksTable = function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let marks = (storage.get('marks') || []).filter(m => m.teacher === currentUser.name);
    renderTeacherMarksTable(marks);
    // Populate filter dropdowns with ALL options, not just those with marks
    const allStudents = storage.get('students') || [];
    const allSubjects = (storage.get('subjects') || [
        'Maths', 'Chemistry', 'Biology', 'Agriculture', 'English', 'Physics', 'ICT'
    ]);
    const allTerms = (storage.get('terms') || [
        'Term 1', 'Term 2', 'Term 3', 'Term 4'
    ]);
    const subjectSel = document.getElementById('filterSubject');
    const studentSel = document.getElementById('filterStudent');
    const termSel = document.getElementById('filterTerm');
    if (subjectSel) {
        subjectSel.innerHTML = '<option value="">All Subjects</option>' + allSubjects.map(s => `<option value="${s}">${s}</option>`).join('');
    }
    if (studentSel) {
        studentSel.innerHTML = '<option value="">All Students</option>' + allStudents.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    }
    if (termSel) {
        termSel.innerHTML = '<option value="">All Terms</option>' + allTerms.map(t => `<option value="${t}">${t}</option>`).join('');
    }
    updateBulkActionsToolbar();
};

// --- Student Dashboard Logic ---
if (window.location.pathname.includes('student.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser || currentUser.role !== 'student') {
            window.location.href = 'index.html';
            return;
        }
        // Profile card
        document.getElementById('studentName').textContent = currentUser.name;
        document.getElementById('studentProfileName').textContent = currentUser.name;
        document.getElementById('studentProfileEmail').textContent = currentUser.email || '';
        document.getElementById('studentProfileGrade').textContent = currentUser.grade || '';
        // Marks
        updateStudentMarksTable();
        renderStudentNotifications();
        renderStudentMessages();
        // Message form submit
        const msgForm = document.getElementById('studentMessageForm');
        if (msgForm) {
            msgForm.onsubmit = function(e) {
                e.preventDefault();
                sendStudentMessage();
            };
        }
        renderStudentProfile();
        // Assignment viewing and submission
        const assignmentList = document.getElementById('studentAssignmentList');
        const submissionDiv = document.getElementById('studentAssignmentSubmission');
        // Render assignments for student's subjects
        function renderStudentAssignments() {
            if (!assignmentList) return;
            const assignments = getAssignments().filter(a => currentUser.subjects ? currentUser.subjects.includes(a.subject) : true);
            if (!assignments.length) {
                assignmentList.innerHTML = '<p class="text-center">No assignments yet.</p>';
                return;
            }
            assignmentList.innerHTML = assignments.map(a => {
                // Check if already submitted
                const submission = getSubmissions().find(s => s.assignmentId === a.id && s.studentId === currentUser.username);
                return `<div class="assignment-item">
                    <h4>${a.title} <span style="font-size:0.9em;color:#888;">(${a.subject})</span></h4>
                    <p>${a.description}</p>
                    <p><b>Due:</b> ${a.dueDate}</p>
                    ${submission ? `<p style='color:green;'><b>Submitted</b> (${submission.submittedAt.split('T')[0]})</p>` : `<button class='btn btn-primary' onclick='showAssignmentSubmissionForm("${a.id}")'>Submit</button>`}
                </div>`;
            }).join('');
        }
        window.showAssignmentSubmissionForm = function(assignmentId) {
            const assignment = getAssignments().find(a => a.id === assignmentId);
            if (!assignment || !submissionDiv) return;
            submissionDiv.style.display = '';
            submissionDiv.innerHTML = `
                <h4>Submit Assignment: ${assignment.title}</h4>
                <form id='submitAssignmentForm'>
                    <div class='form-group'>
                        <label for='assignmentContent'>Your Answer</label>
                        <textarea id='assignmentContent' required style='width:100%;height:80px;'></textarea>
                    </div>
                    <div class='form-group'>
                        <label for='assignmentFile'>Upload File (optional)</label>
                        <input type='file' id='assignmentFile' accept='.pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.zip,.rar'>
                    </div>
                    <button type='submit' class='btn btn-primary'>Submit</button>
                    <button type='button' class='btn btn-secondary' onclick='hideAssignmentSubmissionForm()'>Cancel</button>
                </form>
            `;
            document.getElementById('submitAssignmentForm').onsubmit = function(e) {
                e.preventDefault();
                const content = document.getElementById('assignmentContent').value.trim();
                const fileInput = document.getElementById('assignmentFile');
                if (!content && (!fileInput || !fileInput.files.length)) return;
                if (fileInput && fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    const reader = new FileReader();
                    reader.onload = function(evt) {
                        addSubmission({
                            id: generateId(),
                            assignmentId: assignment.id,
                            studentId: currentUser.username,
                            content,
                            fileUrl: evt.target.result, // base64 string
                            submittedAt: new Date().toISOString(),
                            grade: '',
                            feedback: ''
                        });
                        showNotification('Assignment submitted!', 'success');
                        submissionDiv.style.display = 'none';
                        renderStudentAssignments();
                    };
                    reader.readAsDataURL(file);
                } else {
                    addSubmission({
                        id: generateId(),
                        assignmentId: assignment.id,
                        studentId: currentUser.username,
                        content,
                        fileUrl: '',
                        submittedAt: new Date().toISOString(),
                        grade: '',
                        feedback: ''
                    });
                    showNotification('Assignment submitted!', 'success');
                    submissionDiv.style.display = 'none';
                    renderStudentAssignments();
                }
            };
        };
        window.hideAssignmentSubmissionForm = function() {
            if (submissionDiv) submissionDiv.style.display = 'none';
        };
        renderStudentAssignments();
        window.renderResourceList(currentUser, false, true);
    });
}
function updateStudentMarksTable() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'student') return;
    const marks = (storage.get('marks') || []).filter(m => m.studentId === currentUser.username || m.studentId === currentUser.id);
    const table = document.getElementById('studentMarksTable');
    if (table) {
        if (marks.length === 0) {
            table.innerHTML = '<tr><td colspan="6" class="text-center">No marks found</td></tr>';
        } else {
            table.innerHTML = marks.map(m =>
                `<tr><td>${m.subject}</td><td>${m.term}</td><td>${m.total}</td><td>${m.grade}</td><td>${m.teacher}</td><td>${m.comment ? m.comment : ''}</td></tr>`
            ).join('');
        }
    }
    // Average grade
    let avg = 0;
    if (marks.length > 0) {
        avg = Math.round((marks.reduce((sum, m) => sum + (m.total || 0), 0) / marks.length) * 100) / 100;
    }
    const avgEl = document.getElementById('studentAverageGrade');
    if (avgEl) avgEl.textContent = avg + '%';
    // Best subject
    let best = '-';
    if (marks.length > 0) {
        const bestMark = marks.reduce((a, b) => (a.total > b.total ? a : b));
        best = bestMark.subject;
    }
    const bestEl = document.getElementById('studentBestSubject');
    if (bestEl) bestEl.textContent = best;
}

function downloadCSV() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'student') return;
    const marks = (storage.get('marks') || []).filter(m => m.studentId === currentUser.username || m.studentId === currentUser.id);
    if (marks.length === 0) return;
    const csv = [
        ['Subject', 'Term', 'Total', 'Grade', 'Teacher'],
        ...marks.map(m => [m.subject, m.term, m.total, m.grade, m.teacher])
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'my_marks.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function downloadPDF() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'student') return;
    const marks = (storage.get('marks') || []).filter(m => m.studentId === currentUser.username || m.studentId === currentUser.id);
    if (marks.length === 0) return;
    const doc = new window.jspdf.jsPDF();
    doc.text('My Marks', 10, 10);
    // Table headers
    const headers = [['Subject', 'Term', 'Total', 'Grade']];
    // Table rows
    const rows = marks.map(m => [m.subject, m.term, m.total, m.grade]);
    // Use autoTable if available
    if (doc.autoTable) {
        doc.autoTable({
            head: headers,
            body: rows,
            startY: 20
        });
    } else {
        // Fallback: manual table
        let y = 20;
        doc.text('Subject', 10, y);
        doc.text('Term', 50, y);
        doc.text('Total', 90, y);
        doc.text('Grade', 130, y);
        y += 10;
        rows.forEach(row => {
            doc.text(row[0] + '', 10, y);
            doc.text(row[1] + '', 50, y);
            doc.text(row[2] + '', 90, y);
            doc.text(row[3] + '', 130, y);
            y += 10;
        });
    }
    doc.save('my_marks.pdf');
}
function showEditProfileModal() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'student') return;
    document.getElementById('editProfileName').value = currentUser.name;
    document.getElementById('editProfileEmail').value = currentUser.email || '';
    document.getElementById('editProfileGrade').value = currentUser.grade || '';
    document.getElementById('editProfileModal').classList.remove('hidden');
}
function saveProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'student') return;
    currentUser.name = document.getElementById('editProfileName').value;
    currentUser.email = document.getElementById('editProfileEmail').value;
    currentUser.grade = document.getElementById('editProfileGrade').value;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    // Also update in students array if present
    let students = storage.get('students') || [];
    let idx = students.findIndex(s => s.id === currentUser.username || s.id === currentUser.id);
    if (idx !== -1) {
        students[idx].name = currentUser.name;
        students[idx].email = currentUser.email;
        students[idx].grade = currentUser.grade;
        storage.set('students', students);
    }
    document.getElementById('studentProfileName').textContent = currentUser.name;
    document.getElementById('studentProfileEmail').textContent = currentUser.email;
    document.getElementById('studentProfileGrade').textContent = currentUser.grade;
    closeModal('editProfileModal');
    showNotification('Profile updated!', 'success');
}
// Render Chart.js bar chart of marks by subject
function renderStudentPerformanceChart() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'student') return;
    const marks = (storage.get('marks') || []).filter(m => m.studentId === currentUser.username || m.studentId === currentUser.id);
    if (marks.length === 0) return;
    const ctx = document.getElementById('studentPerformanceChart').getContext('2d');
    const subjects = [...new Set(marks.map(m => m.subject))];
    const averages = subjects.map(subj => {
        const subjMarks = marks.filter(m => m.subject === subj);
        return Math.round((subjMarks.reduce((sum, m) => sum + (m.total || 0), 0) / subjMarks.length) * 100) / 100;
    });
    if (window.studentChart) window.studentChart.destroy();
    window.studentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: subjects,
            datasets: [{
                label: 'Average Mark',
                data: averages,
                backgroundColor: '#2196F3'
            }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });
}
// Call chart render after marks update
const origUpdateStudentMarksTable = updateStudentMarksTable;
updateStudentMarksTable = function() {
    origUpdateStudentMarksTable();
    renderStudentPerformanceChart();
};

// --- Student Notifications & Messaging Logic ---
if (window.location.pathname.includes('student.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        // ... existing student dashboard logic ...
        renderStudentNotifications();
        renderStudentMessages();
        // Message form submit
        const msgForm = document.getElementById('studentMessageForm');
        if (msgForm) {
            msgForm.onsubmit = function(e) {
                e.preventDefault();
                sendStudentMessage();
            };
        }
    });
}
function renderStudentNotifications() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'student') return;
    const notifications = (storage.get('notifications') || []).filter(n => n.to === currentUser.username || n.to === currentUser.id || n.to === 'all');
    const list = document.getElementById('studentNotificationsList');
    if (!list) return;
    if (notifications.length === 0) {
        list.innerHTML = '<p class="text-center">No notifications yet.</p>';
        return;
    }
    list.innerHTML = notifications.map(n =>
        `<div class="notification-item${n.read ? ' read' : ''}">
            <div><b>From:</b> ${n.from}</div>
            <div>${n.message}</div>
            <div style="font-size:0.9em;color:#888;">${formatDate(n.date)}</div>
            <button class="btn btn-sm" onclick="markNotificationRead('${n.id}')">${n.read ? 'Read' : 'Mark as Read'}</button>
        </div>`
    ).join('');
}
function markNotificationRead(id) {
    let notifications = storage.get('notifications') || [];
    notifications = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    storage.set('notifications', notifications);
    renderStudentNotifications();
}
function renderStudentMessages() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'student') return;
    const messages = (storage.get('messages') || []).filter(m => m.to === currentUser.username || m.to === currentUser.id || m.from === currentUser.username || m.from === currentUser.id);
    const list = document.getElementById('studentMessagesList');
    if (!list) return;
    if (messages.length === 0) {
        list.innerHTML = '<p class="text-center">No messages yet.</p>';
        return;
    }
    list.innerHTML = messages.map(m =>
        `<div class="message-item${m.from === currentUser.username || m.from === currentUser.id ? ' sent' : ' received'}">
            <div><b>${m.from === currentUser.username || m.from === currentUser.id ? 'Me' : m.from}:</b> ${m.message}</div>
            <div style="font-size:0.9em;color:#888;">${formatDate(m.date)}</div>
        </div>`
    ).join('');
}
function sendStudentMessage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'student') return;
    const to = document.getElementById('studentMessageTo').value.trim();
    const message = document.getElementById('studentMessageText').value.trim();
    if (!to || !message) return;
    let messages = storage.get('messages') || [];
    messages.push({
        id: generateId(),
        from: currentUser.username || currentUser.id,
        to: to,
        message: message,
        date: new Date().toISOString()
    });
    storage.set('messages', messages);
    document.getElementById('studentMessageForm').reset();
    renderStudentMessages();
    showNotification('Message sent!', 'success');
}

// --- Teacher Notifications & Messaging Logic ---
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('teacher.html')) {
        renderTeacherMessages();
        // Notification form
        const notifForm = document.getElementById('teacherNotificationForm');
        if (notifForm) {
            notifForm.onsubmit = function(e) {
                e.preventDefault();
                sendTeacherNotification();
            };
        }
        // Reply form
        const replyForm = document.getElementById('teacherReplyForm');
        if (replyForm) {
            replyForm.onsubmit = function(e) {
                e.preventDefault();
                sendTeacherReply();
            };
        }
    }
});
function sendTeacherNotification() {
    const to = document.getElementById('teacherNotificationTo').value.trim();
    const message = document.getElementById('teacherNotificationMessage').value.trim();
    if (!to || !message) return;
    let notifications = storage.get('notifications') || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    notifications.push({
        id: generateId(),
        to: to,
        from: currentUser ? currentUser.username : 'teacher',
        message: message,
        date: new Date().toISOString(),
        read: false
    });
    storage.set('notifications', notifications);
    document.getElementById('teacherNotificationForm').reset();
    showNotification('Notification sent!', 'success');
}
function renderTeacherMessages() {
    const list = document.getElementById('teacherMessagesList');
    if (!list) return;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const messages = (storage.get('messages') || []).filter(m => m.to === currentUser.username || m.to === 'teacher');
    if (messages.length === 0) {
        list.innerHTML = '<p class="text-center">No messages yet.</p>';
        return;
    }
    list.innerHTML = messages.map(m =>
        `<div class="message-item received">
            <div><b>${m.from}:</b> ${m.message}</div>
            <div style="font-size:0.9em;color:#888;">${formatDate(m.date)}</div>
            <button class="btn btn-sm" onclick="showTeacherReplyForm('${m.from}')">Reply</button>
        </div>`
    ).join('');
}
function showTeacherReplyForm(to) {
    document.getElementById('teacherReplyTo').value = to;
    document.getElementById('teacherReplyForm').style.display = '';
}
function closeTeacherReplyForm() {
    document.getElementById('teacherReplyForm').style.display = 'none';
    document.getElementById('teacherReplyForm').reset();
}
function sendTeacherReply() {
    const to = document.getElementById('teacherReplyTo').value.trim();
    const message = document.getElementById('teacherReplyText').value.trim();
    if (!to || !message) return;
    let messages = storage.get('messages') || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    messages.push({
        id: generateId(),
        from: currentUser ? currentUser.username : 'teacher',
        to: to,
        message: message,
        date: new Date().toISOString()
    });
    storage.set('messages', messages);
    closeTeacherReplyForm();
    renderTeacherMessages();
    showNotification('Reply sent!', 'success');
}

function renderTeacherStats() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'teacher') return;
    const allMarks = storage.get('marks') || [];
    const allStudents = storage.get('students') || [];
    // Only marks entered by this teacher
    const teacherMarks = allMarks.filter(m => m.teacher === currentUser.name);
    // Unique students taught by this teacher
    const studentIds = [...new Set(teacherMarks.map(m => m.studentId))];
    const totalStudents = studentIds.length;
    const totalMarks = teacherMarks.length;
    const avgMark = teacherMarks.length ? (teacherMarks.reduce((sum, m) => sum + (m.total || 0), 0) / teacherMarks.length).toFixed(2) : 'N/A';
    // Best performing student (by average mark)
    let bestStudent = 'N/A';
    if (studentIds.length) {
        let bestAvg = -Infinity;
        studentIds.forEach(id => {
            const studentMarks = teacherMarks.filter(m => m.studentId === id);
            const avg = studentMarks.reduce((sum, m) => sum + (m.total || 0), 0) / studentMarks.length;
            if (avg > bestAvg) {
                bestAvg = avg;
                const student = allStudents.find(s => s.id === id);
                bestStudent = student ? student.name : id;
            }
        });
    }
    const statsDiv = document.getElementById('teacherStats');
    if (statsDiv) {
        statsDiv.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card"><div class="stat-label">Total Students</div><div class="stat-value">${totalStudents}</div></div>
                <div class="stat-card"><div class="stat-label">Total Marks Entered</div><div class="stat-value">${totalMarks}</div></div>
                <div class="stat-card"><div class="stat-label">Average Mark</div><div class="stat-value">${avgMark}</div></div>
                <div class="stat-card"><div class="stat-label">Best Student</div><div class="stat-value">${bestStudent}</div></div>
            </div>
        `;
    }
    const ctx = document.getElementById('teacherStatsChart');
    if (!ctx || !window.Chart) return;
    // Destroy previous chart instance if it exists
    if (window.teacherStatsChartInstance) {
        window.teacherStatsChartInstance.destroy();
    }
    window.teacherStatsChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Total Students', 'Total Marks Entered', 'Average Mark', 'Best Student'],
            datasets: [{
                label: 'Value',
                data: [totalStudents, totalMarks, avgMark, bestStudent],
                backgroundColor: ['#2196F3', '#4CAF50', '#FF9800', '#9C27B0'],
                borderColor: ['#2196F3', '#4CAF50', '#FF9800', '#9C27B0'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Teacher Statistics'
                }
            }
        }
    });
}
// Call renderTeacherStats on dashboard load and after marks change
if (window.location.pathname.includes('teacher.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        renderTeacherStats();
    });
}
const origUpdateTeacherMarksTable2 = updateTeacherMarksTable;
updateTeacherMarksTable = function() {
    origUpdateTeacherMarksTable2();
    renderTeacherStats();
};

function renderTeacherNotifications() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'teacher') return;
    const notifications = (storage.get('notifications') || []).filter(n => n.to === currentUser.username || n.to === currentUser.id || n.to === 'all');
    const list = document.getElementById('teacherNotifications');
    if (!list) return;
    if (notifications.length === 0) {
        list.innerHTML = '<p class="text-center">No notifications yet.</p>';
        return;
    }
    list.innerHTML = notifications.map(n =>
        `<div class="notification-item${n.read ? ' read' : ''}">
            <div><b>From:</b> ${n.from}</div>
            <div>${n.message}</div>
            <div style="font-size:0.9em;color:#888;">${formatDate(n.date)}</div>
            <button class="btn btn-sm" onclick="markTeacherNotificationRead('${n.id}')">${n.read ? 'Read' : 'Mark as Read'}</button>
        </div>`
    ).join('');
}
function markTeacherNotificationRead(id) {
    let notifications = storage.get('notifications') || [];
    notifications = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    storage.set('notifications', notifications);
    renderTeacherNotifications();
}
// Patch dashboard load and notification send to call renderTeacherNotifications
if (window.location.pathname.includes('teacher.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        renderTeacherNotifications();
    });
}
const origSendTeacherNotification = sendTeacherNotification;
sendTeacherNotification = function() {
    origSendTeacherNotification();
    renderTeacherNotifications();
};

function renderStudentProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'student') return;
    const students = storage.get('students') || [];
    const student = students.find(s => s.id === currentUser.username || s.id === currentUser.id);
    document.getElementById('studentProfileName').textContent = student ? student.name : currentUser.name;
    document.getElementById('studentProfileEmail').textContent = student ? (student.email || '') : (currentUser.email || '');
    document.getElementById('studentProfileGrade').textContent = student ? (student.grade || '') : (currentUser.grade || '');
    const img = document.getElementById('studentProfileImage');
    if (img) {
        if (student && student.image) {
            img.src = student.image;
            img.style.display = '';
        } else {
            img.src = '';
            img.style.display = 'none';
        }
    }
}
// Expose for admin live update
window.updateStudentProfileImage = function(studentId, base64) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'student') return;
    if (currentUser.username === studentId || currentUser.id === studentId) {
        const img = document.getElementById('studentProfileImage');
        if (img) {
            img.src = base64;
            img.style.display = '';
        }
        showNotification('Your profile image was updated by the admin.', 'success');
    }
};

// --- Attendance Data Model & Functions ---
// Attendance record: { id, date, subject, teacher, studentId, status }
const ATTENDANCE_KEY = 'attendance';
function getAttendanceRecords() {
    return JSON.parse(localStorage.getItem(ATTENDANCE_KEY)) || [];
}
function saveAttendanceRecords(records) {
    localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(records));
}
function addAttendanceRecord(record) {
    const records = getAttendanceRecords();
    records.push(record);
    saveAttendanceRecords(records);
}
function updateAttendanceRecord(id, status) {
    let records = getAttendanceRecords();
    records = records.map(r => r.id === id ? { ...r, status } : r);
    saveAttendanceRecords(records);
}

// --- Messaging & Notifications Data Model & Functions ---
// Message record: { id, from, to, message, date, read }
const MESSAGES_KEY = 'messages';
function getMessages() {
    return JSON.parse(localStorage.getItem(MESSAGES_KEY)) || [];
}
function saveMessages(messages) {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
}
function sendMessage({ from, to, message }) {
    const messages = getMessages();
    messages.push({
        id: generateId(),
        from,
        to,
        message,
        date: new Date().toISOString(),
        read: false
    });
    saveMessages(messages);
}
function markMessageRead(id) {
    let messages = getMessages();
    messages = messages.map(m => m.id === id ? { ...m, read: true } : m);
    saveMessages(messages);
}
function getUserMessages(username) {
    return getMessages().filter(m => m.to === username || m.to === 'all' || (m.to === 'all-teachers' && isTeacher(username)) || (m.to === 'all-students' && isStudent(username)));
}
function isTeacher(username) {
    const teachers = storage.get('teachers') || [];
    return teachers.some(t => t.id === username);
}
function isStudent(username) {
    const students = storage.get('students') || [];
    return students.some(s => s.id === username);
}

// --- Messaging UI Logic for All Dashboards ---
function renderMessages(listEl, username, badgeEl) {
    const messages = getUserMessages(username).sort((a, b) => new Date(b.date) - new Date(a.date));
    if (!messages.length) {
        listEl.innerHTML = '<p class="text-center">No messages yet.</p>';
        if (badgeEl) badgeEl.style.display = 'none';
        return;
    }
    let unreadCount = 0;
    listEl.innerHTML = messages.map(m => {
        if (!m.read && m.to === username) unreadCount++;
        return `<div class="msg-item${!m.read && m.to === username ? ' unread' : ''}">
            <div><b>From:</b> ${m.from}</div>
            <div>${m.message}</div>
            <div style="font-size:0.9em;color:#888;">${formatDate(m.date)}</div>
            ${!m.read && m.to === username ? `<button class='btn btn-sm' onclick='markMessageReadAndRefresh("${m.id}", "${username}")'>Mark as Read</button>` : ''}
        </div>`;
    }).join('');
    if (badgeEl) {
        badgeEl.textContent = unreadCount;
        badgeEl.style.display = unreadCount > 0 ? '' : 'none';
    }
}
window.markMessageReadAndRefresh = function(id, username) {
    markMessageRead(id);
    // Re-render for all dashboards
    if (document.getElementById('adminMsgList')) renderMessages(document.getElementById('adminMsgList'), username, document.getElementById('adminMsgBadge'));
    if (document.getElementById('teacherMsgList')) renderMessages(document.getElementById('teacherMsgList'), username, document.getElementById('teacherMsgBadge'));
    if (document.getElementById('studentMsgList')) renderMessages(document.getElementById('studentMsgList'), username, document.getElementById('studentMsgBadge'));
};
// Admin Dashboard
if (window.location.pathname.includes('admin.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const msgForm = document.getElementById('adminMsgForm');
        const msgList = document.getElementById('adminMsgList');
        const badge = document.getElementById('adminMsgBadge');
        if (msgForm) {
            msgForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const to = document.getElementById('adminMsgTo').value.trim();
                const message = document.getElementById('adminMsgText').value.trim();
                if (!to || !message) return;
                sendMessage({ from: currentUser.username, to, message });
                msgForm.reset();
                renderMessages(msgList, currentUser.username, badge);
            });
        }
        if (msgList) renderMessages(msgList, currentUser.username, badge);
    });
}
// Teacher Dashboard
if (window.location.pathname.includes('teacher.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const msgForm = document.getElementById('teacherMsgForm');
        const msgList = document.getElementById('teacherMsgList');
        const badge = document.getElementById('teacherMsgBadge');
        if (msgForm) {
            msgForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const to = document.getElementById('teacherMsgTo').value.trim();
                const message = document.getElementById('teacherMsgText').value.trim();
                if (!to || !message) return;
                sendMessage({ from: currentUser.username, to, message });
                msgForm.reset();
                renderMessages(msgList, currentUser.username, badge);
            });
        }
        if (msgList) renderMessages(msgList, currentUser.username, badge);
    });
}
// Student Dashboard
if (window.location.pathname.includes('student.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const msgForm = document.getElementById('studentMsgForm');
        const msgList = document.getElementById('studentMsgList');
        const badge = document.getElementById('studentMsgBadge');
        if (msgForm) {
            msgForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const to = document.getElementById('studentMsgTo').value.trim();
                const message = document.getElementById('studentMsgText').value.trim();
                if (!to || !message) return;
                sendMessage({ from: currentUser.username, to, message });
                msgForm.reset();
                renderMessages(msgList, currentUser.username, badge);
            });
        }
        if (msgList) renderMessages(msgList, currentUser.username, badge);
    });
}

// --- Assignment & Homework Data Model & Functions ---
// Assignment: { id, title, description, dueDate, subject, teacher, createdAt }
// Submission: { id, assignmentId, studentId, content, fileUrl, submittedAt, grade, feedback }
const ASSIGNMENTS_KEY = 'assignments';
const SUBMISSIONS_KEY = 'submissions';
function getAssignments() {
    return JSON.parse(localStorage.getItem(ASSIGNMENTS_KEY)) || [];
}
function saveAssignments(assignments) {
    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments));
}
function addAssignment(assignment) {
    const assignments = getAssignments();
    assignments.push(assignment);
    saveAssignments(assignments);
}
function getSubmissions() {
    return JSON.parse(localStorage.getItem(SUBMISSIONS_KEY)) || [];
}
function saveSubmissions(submissions) {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
}
function addSubmission(submission) {
    const submissions = getSubmissions();
    submissions.push(submission);
    saveSubmissions(submissions);
}

// --- Teacher Dashboard: Show file download link in submissions ---
if (window.location.pathname.includes('teacher.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        // ... existing code ...
        window.showSubmissionsForAssignment = function(assignmentId) {
            const div = document.getElementById('submissionsFor_' + assignmentId);
            if (!div) return;
            if (div.style.display === 'none') {
                // Show and render submissions
                const submissions = getSubmissions().filter(s => s.assignmentId === assignmentId);
                if (!submissions.length) {
                    div.innerHTML = '<p class="text-center">No submissions yet.</p>';
                } else {
                    div.innerHTML = submissions.map(s => `
                        <div class='submission-item' style='border:1px solid #e1e5e9; border-radius:6px; padding:8px; margin-bottom:8px;'>
                            <b>Student:</b> ${s.studentId}<br>
                            <b>Answer:</b> ${s.content}<br>
                            <b>Submitted:</b> ${s.submittedAt.split('T')[0]}<br>
                            ${s.fileUrl ? `<b>File:</b> <a href='${s.fileUrl}' download='${s.studentId}_assignment' target='_blank'>Download</a><br>` : ''}
                            <b>Grade:</b> <span id='grade_${s.id}'>${s.grade || '-'}</span><br>
                            <b>Feedback:</b> <span id='feedback_${s.id}'>${s.feedback || '-'}</span><br>
                            <form onsubmit='gradeSubmission(event, "${s.id}")' style='margin-top:6px;'>
                                <input type='text' id='input_grade_${s.id}' placeholder='Grade' value='${s.grade || ''}' style='width:60px;'>
                                <input type='text' id='input_feedback_${s.id}' placeholder='Feedback' value='${s.feedback || ''}' style='width:120px;'>
                                <button type='submit' class='btn btn-sm btn-primary'>Save</button>
                            </form>
                        </div>
                    `).join('');
                }
                div.style.display = '';
            } else {
                div.style.display = 'none';
            }
        };
    });
}

window.addEventListener('load', function() {
  const splash = document.getElementById('splashScreen');
  if (splash) {
    splash.classList.add('fade-out');
    setTimeout(() => splash.style.display = 'none', 500);
  }
});

// Calendar Component
class Calendar {
    constructor(container, events = []) {
        this.container = container;
        this.events = events;
        this.date = new Date();
        this.render();
    }

    setEvents(events) {
        this.events = events;
        this.render();
    }

    nextMonth() {
        this.date.setMonth(this.date.getMonth() + 1);
        this.render();
    }

    prevMonth() {
        this.date.setMonth(this.date.getMonth() - 1);
        this.render();
    }

    render() {
        const month = this.date.getMonth();
        const year = this.date.getFullYear();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let html = `<div class='calendar-header'>
            <button class='calendar-prev'>&lt;</button>
            <span class='calendar-title'>${this.date.toLocaleString('default', { month: 'long' })} ${year}</span>
            <button class='calendar-next'>&gt;</button>
        </div>`;
        html += "<div class='calendar-grid'>";
        for (let d of daysOfWeek) {
            html += `<div class='calendar-day calendar-day-header'>${d}</div>`;
        }
        let day = 1;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    html += "<div class='calendar-day'></div>";
                } else if (day > daysInMonth) {
                    html += "<div class='calendar-day'></div>";
                } else {
                    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
                    const dayEvents = this.events.filter(e => e.date === dateStr);
                    html += `<div class='calendar-day${dayEvents.length ? ' calendar-event-day' : ''}' data-date='${dateStr}'>${day}`;
                    if (dayEvents.length) {
                        html += `<span class='calendar-event-dot'></span>`;
                    }
                    html += `</div>`;
                    day++;
                }
            }
        }
        html += "</div>";
        this.container.innerHTML = html;
        this.container.querySelector('.calendar-prev').onclick = () => this.prevMonth();
        this.container.querySelector('.calendar-next').onclick = () => this.nextMonth();
        this.container.querySelectorAll('.calendar-event-day').forEach(dayEl => {
            dayEl.onclick = () => {
                const date = dayEl.getAttribute('data-date');
                const events = this.events.filter(e => e.date === date);
                if (events.length) {
                    alert(events.map(e => `${e.title}: ${e.description || ''}`).join('\n'));
                }
            };
        });
    }
}

// Exported function to initialize calendar
function initCalendar(containerSelector, events) {
    const container = typeof containerSelector === 'string' ? document.querySelector(containerSelector) : containerSelector;
    if (!container) return;
    return new Calendar(container, events);
}

// Export for use in HTML
window.initCalendar = initCalendar;

// --- Resource Sharing Logic (All Dashboards) ---
const RESOURCE_KEY = 'resources';
function getResources() {
  return JSON.parse(localStorage.getItem(RESOURCE_KEY)) || [];
}
function saveResources(resources) {
  localStorage.setItem(RESOURCE_KEY, JSON.stringify(resources));
}
function getFileIcon(fileName) {
  const ext = fileName.split('.').pop().toLowerCase();
  if (["pdf"].includes(ext)) return '📄';
  if (["doc","docx"].includes(ext)) return '📝';
  if (["jpg","jpeg","png"].includes(ext)) return '🖼️';
  if (["zip","rar"].includes(ext)) return '🗜️';
  if (["txt"].includes(ext)) return '📃';
  return '📁';
}
// Teacher/Admin: Resource upload
function setupResourceUpload(currentUser, isAdmin = false) {
  const resourceForm = document.getElementById('resourceUploadForm');
  const resourceSubject = document.getElementById('resourceSubject');
  if (resourceSubject && currentUser && currentUser.subjects && !isAdmin) {
    resourceSubject.innerHTML = '<option value="">Subject</option>' + currentUser.subjects.map(s => `<option value="${s}">${s}</option>`).join('');
  }
  if (resourceForm) {
    resourceForm.onsubmit = async function(e) {
      e.preventDefault();
      const title = document.getElementById('resourceTitle').value.trim();
      const subject = isAdmin ? document.getElementById('resourceSubject').value.trim() : document.getElementById('resourceSubject').value;
      const fileInput = document.getElementById('resourceFile');
      if (!title || !fileInput.files.length) return;
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = function(evt) {
        const resources = getResources();
        resources.unshift({
          id: generateId(),
          title,
          subject,
          fileName: file.name,
          fileData: evt.target.result,
          uploader: currentUser.username,
          uploadedAt: new Date().toISOString()
        });
        saveResources(resources);
        renderResourceList(currentUser, isAdmin);
        resourceForm.reset();
        showNotification('Resource uploaded!', 'success');
      };
      reader.readAsDataURL(file);
    };
  }
}
// All: Resource list rendering
function renderResourceList(currentUser, isAdmin = false, isStudent = false) {
  const list = document.getElementById('resourceList');
  let resources = getResources();
  if (isStudent) {
    resources = resources.filter(r => {
      if (!r.subject || r.subject === 'General') return true;
      if (!currentUser || !currentUser.subjects) return false;
      return currentUser.subjects.includes(r.subject);
    });
  } else if (!isAdmin) {
    resources = resources.filter(r => r.uploader === currentUser.username);
  } else {
    resources = resources.filter(r => r.uploader === currentUser.username);
  }
  if (!resources.length) {
    list.innerHTML = `<p style='color:#888;text-align:center;'>No resources ${isStudent ? 'available' : 'uploaded'} yet.</p>`;
    return;
  }
  list.innerHTML = resources.map(r => `
    <div style='display:flex;align-items:center;gap:1em;background:#f5f6fa;border-radius:8px;padding:0.7em 1em;margin-bottom:0.5em;'>
      <span style='font-size:1.5em;'>${getFileIcon(r.fileName)}</span>
      <div style='flex:2;'>
        <div style='font-weight:bold;'>${r.title}</div>
        <div style='font-size:0.95em;color:#666;'>${r.subject ? r.subject : 'General'} &middot; ${formatDate(r.uploadedAt)}</div>
      </div>
      <a href='${r.fileData}' download='${r.fileName}' class='btn btn-sm' style='padding:0.3em 0.8em;'>Download</a>
    </div>
  `).join('');
}
// Expose for HTML
window.setupResourceUpload = setupResourceUpload;
window.renderResourceList = renderResourceList;

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}
// Apply saved theme on page load
(function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
})();

window.showToast = function(message, type = 'info', duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast show ' + type;
  setTimeout(() => {
    toast.className = 'toast ' + type;
  }, duration);
};

if (typeof window.openHelpModal === 'undefined') {
  function openHelpModal() {
    document.getElementById('helpModal').classList.remove('hidden');
    document.getElementById('helpModal').focus();
  }
  function closeHelpModal() {
    document.getElementById('helpModal').classList.add('hidden');
  }
  window.openHelpModal = openHelpModal;
  window.closeHelpModal = closeHelpModal;
}

function hideCard(cardKey) {
  const card = document.querySelector(`.card[data-card='${cardKey}']`);
  if (card) card.style.display = 'none';
  let hidden = JSON.parse(localStorage.getItem('hiddenCards') || '[]');
  if (!hidden.includes(cardKey)) hidden.push(cardKey);
  localStorage.setItem('hiddenCards', JSON.stringify(hidden));
}
function showAllCards() {
  document.querySelectorAll('.card').forEach(card => card.style.display = '');
  localStorage.removeItem('hiddenCards');
}
(function() {
  let hidden = JSON.parse(localStorage.getItem('hiddenCards') || '[]');
  hidden.forEach(cardKey => {
    const card = document.querySelector(`.card[data-card='${cardKey}']`);
    if (card) card.style.display = 'none';
  });
})();
window.hideCard = hideCard;
window.showAllCards = showAllCards;

let draggedCardKey = null;
window.onCardDragStart = function(event) {
  draggedCardKey = event.currentTarget.getAttribute('data-card');
  event.currentTarget.classList.add('dragging');
};
window.onCardDragOver = function(event) {
  event.preventDefault();
  const overCard = event.currentTarget;
  if (overCard && overCard !== document.querySelector('.card.dragging')) {
    overCard.style.borderTop = '2px solid #4CAF50';
  }
};
window.onCardDrop = function(event) {
  event.preventDefault();
  const cardsGrid = event.currentTarget.parentNode;
  const draggingCard = document.querySelector('.card.dragging');
  const overCard = event.currentTarget;
  overCard.style.borderTop = '';
  if (draggingCard && overCard && draggingCard !== overCard) {
    cardsGrid.insertBefore(draggingCard, overCard);
    draggingCard.classList.remove('dragging');
    // Save new order
    const order = Array.from(cardsGrid.children).map(card => card.getAttribute('data-card'));
    localStorage.setItem('cardOrder', JSON.stringify(order));
  }
};
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('dragend', function() {
    card.classList.remove('dragging');
    document.querySelectorAll('.card').forEach(c => c.style.borderTop = '');
  });
});
// On page load, restore card order
(function() {
  const order = JSON.parse(localStorage.getItem('cardOrder') || '[]');
  if (order.length) {
    const cardsGrid = document.querySelector('.cards-grid');
    order.forEach(cardKey => {
      const card = document.querySelector(`.card[data-card='${cardKey}']`);
      if (card) cardsGrid.appendChild(card);
    });
  }
})();

function applyRoleBasedAccess() {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  if (!user.role) return;
  document.querySelectorAll('[data-role="admin"]').forEach(el => {
    el.style.display = user.role === 'admin' ? '' : 'none';
  });
  document.querySelectorAll('[data-role="teacher"]').forEach(el => {
    el.style.display = user.role === 'teacher' ? '' : 'none';
  });
  document.querySelectorAll('[data-role="student"]').forEach(el => {
    el.style.display = user.role === 'student' ? '' : 'none';
  });
}
document.addEventListener('DOMContentLoaded', applyRoleBasedAccess);

// Onboarding tour
function startTour() {
  alert('Welcome! This is your dashboard. Use the top bar to navigate, and click cards for more info. (You can replace this with a real tour library like Shepherd.js or Intro.js for a professional experience.)');
  localStorage.setItem('onboardingComplete', 'true');
}
(function() {
  if (!localStorage.getItem('onboardingComplete')) {
    setTimeout(startTour, 1000);
  }
})();
window.startTour = startTour;

// Theming & Branding
function openThemeModal() {
  document.getElementById('themeModal').classList.remove('hidden');
}
function closeThemeModal() {
  document.getElementById('themeModal').classList.add('hidden');
}
function saveThemeSettings() {
  const color = document.getElementById('primaryColorPicker').value;
  document.documentElement.style.setProperty('--primary', color);
  localStorage.setItem('themePrimary', color);
  const logoInput = document.getElementById('logoUpload');
  if (logoInput && logoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      localStorage.setItem('customLogo', e.target.result);
      document.getElementById('customLogoPreview').src = e.target.result;
      document.getElementById('customLogoPreview').style.display = '';
    };
    reader.readAsDataURL(logoInput.files[0]);
  }
  closeThemeModal();
}
(function() {
  const color = localStorage.getItem('themePrimary');
  if (color) document.documentElement.style.setProperty('--primary', color);
  const logo = localStorage.getItem('customLogo');
  if (logo) {
    document.querySelectorAll('.site-logo').forEach(img => {
      img.src = logo;
      img.style.display = '';
    });
  }
})();
window.openThemeModal = openThemeModal;
window.closeThemeModal = closeThemeModal;
window.saveThemeSettings = saveThemeSettings;

// Mock API integration
document.addEventListener('DOMContentLoaded', function() {
  if (!localStorage.getItem('apiKey')) {
    localStorage.setItem('apiKey', 'DEMO_API_KEY_123');
  }
});
function fetchMarksAPI() {
  // Demo: Replace with real API call if backend exists
  return fetch('/api/marks?apiKey=' + localStorage.getItem('apiKey'))
    .then(res => res.json())
    .then(data => {
      // Use data
      showToast('Fetched marks from API (demo)', 'info');
    });
}
window.fetchMarksAPI = fetchMarksAPI;

// --- Smart Assistant/Chatbot UI Injection ---
(function() {
  // Create floating action button
  const fab = document.createElement('button');
  fab.id = 'chatbot-fab';
  fab.setAttribute('aria-label', 'Open Smart Assistant');
  fab.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>';
  document.body.appendChild(fab);

  // Create chat window
  const chatWindow = document.createElement('div');
  chatWindow.id = 'chatbot-window';
  chatWindow.innerHTML = `
    <div id="chatbot-header">
      <span>Smart Assistant</span>
      <button id="chatbot-close-btn" aria-label="Close chat">&times;</button>
    </div>
    <div id="chatbot-messages" aria-live="polite" tabindex="0"></div>
    <form id="chatbot-input-area" autocomplete="off">
      <input id="chatbot-input" type="text" placeholder="Ask me anything..." aria-label="Type your message" required />
      <button id="chatbot-send-btn" type="submit" aria-label="Send">Send</button>
    </form>
  `;
  document.body.appendChild(chatWindow);

  // Open/close logic
  fab.addEventListener('click', () => {
    chatWindow.classList.add('open');
    setTimeout(() => {
      document.getElementById('chatbot-input').focus();
    }, 200);
  });
  document.getElementById('chatbot-close-btn').addEventListener('click', () => {
    chatWindow.classList.remove('open');
    fab.focus();
  });

  // Send message logic (frontend only)
  const messages = document.getElementById('chatbot-messages');
  const inputForm = document.getElementById('chatbot-input-area');
  const input = document.getElementById('chatbot-input');

  function appendMessage(text, sender = 'user') {
    const msg = document.createElement('div');
    msg.className = 'chatbot-msg chatbot-msg-' + sender;
    msg.style.margin = '0.5rem 0';
    msg.style.textAlign = sender === 'user' ? 'right' : 'left';
    msg.innerHTML = `<span style="display:inline-block;max-width:80%;background:${sender==='user'?'#e3f2fd':'#f1f8e9'};padding:0.5em 0.9em;border-radius:1em;">${text}</span>`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  let lastUserIntent = null;

  function detectIntent(userMessage) {
    const msg = userMessage.toLowerCase();
    if (msg.includes('marks') || msg.includes('grades')) return 'marks';
    if (msg.includes('attendance')) return 'attendance';
    if (msg.includes('assignment')) return 'assignment';
    if (msg.includes('customize') || (msg.includes('dashboard') && (msg.includes('hide') || msg.includes('show') || msg.includes('rearrange') || msg.includes('custom')))) return 'dashboard-customization';
    if (msg.includes('import') || msg.includes('export')) return 'import-export';
    if (msg.includes('calendar')) return 'calendar';
    if (msg.includes('badge') || msg.includes('gamification') || msg.includes('reward')) return 'badges';
    if (msg.includes('notification') || msg.includes('reminder')) return 'notifications';
    if (msg.includes('api') || msg.includes('integration')) return 'api';
    if (msg.includes('2fa') || msg.includes('two factor') || msg.includes('security') || msg.includes('privacy')) return 'security';
    if (msg.includes('accessibility') || msg.includes('font size') || msg.includes('contrast') || msg.includes('color blind')) return 'accessibility';
    if (msg.includes('ai') || msg.includes('insight') || msg.includes('analyze') || msg.includes('trend')) return 'ai';
    if (msg.includes('tour') || msg.includes('onboarding')) return 'tour';
    if (msg.includes('help') || msg.includes('support')) return 'help';
    return null;
  }

  inputForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    appendMessage(text, 'user');
    input.value = '';
    // Track last intent
    const detected = detectIntent(text);
    if (detected) lastUserIntent = detected;
    // Use mock AI backend for response
    setTimeout(() => {
      const aiReply = mockAIResponse(text, lastUserIntent);
      appendMessage(aiReply, 'bot');
    }, 700);
  });

  // Keyboard accessibility: ESC to close
  chatWindow.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      chatWindow.classList.remove('open');
      fab.focus();
    }
  });
})();

// --- Mock AI Backend for Smart Assistant ---
function mockAIResponse(userMessage, lastIntent) {
  const msg = userMessage.toLowerCase();
  // Follow-up questions
  if (msg.match(/how do i do that|show me|how does that work|can you explain that|what next/)) {
    switch (lastIntent) {
      case 'marks':
        return 'To view your marks, go to the dashboard and look for the "Marks" card. You can click it for a detailed breakdown or export your marks as CSV.';
      case 'attendance':
        return 'To check your attendance, open the Attendance section from the menu. You can also set up notifications for absences.';
      case 'assignment':
        return 'In the Assignments section, you can create, submit, or review assignments. Click "Add Assignment" to get started.';
      case 'dashboard-customization':
        return 'To customize your dashboard, click the settings icon, then hide, show, or drag cards to rearrange them. Your preferences will be saved.';
      case 'import-export':
        return 'To import or export data, go to the admin/teacher dashboard, select Import/Export, and follow the prompts. Supported formats: CSV, XLSX.';
      case 'calendar':
        return 'To sync with your calendar, go to Settings > Integrations and connect your Google or Outlook account.';
      case 'badges':
        return 'You can view your badges on your public profile. Earn more by participating and achieving milestones!';
      case 'notifications':
        return 'Set up reminders in your profile settings. You can choose to be notified about assignments, meetings, and more.';
      case 'api':
        return 'Generate an API key in your profile, then connect third-party apps from the Integrations Marketplace.';
      case 'security':
        return 'Enable Two-Factor Authentication (2FA) in your account settings for extra security.';
      case 'accessibility':
        return 'Open the Accessibility Customizer in Settings to adjust font size, contrast, and color schemes.';
      case 'ai':
        return 'Use the "Ask AI" feature on your dashboard to get insights and analytics about your marks and attendance.';
      case 'tour':
        return 'Click the help icon or select "Start Tour" from the help menu to begin the guided tour.';
      case 'help':
        return 'You can ask me about marks, attendance, assignments, integrations, and more!';
      default:
        return 'Could you clarify what you want to do? I can help with marks, attendance, assignments, and more.';
    }
  }
  // Greetings
  if (msg.match(/\b(hello|hi|hey|good morning|good afternoon|good evening)\b/)) {
    return 'Hello! How can I assist you today? You can ask about marks, assignments, settings, and more.';
  }
  // Marks/Grades
  if (msg.includes('marks') || msg.includes('grades')) {
    return 'You can view your marks on the dashboard cards. If you need a detailed breakdown or want to export your marks, let me know!';
  }
  // Attendance
  if (msg.includes('attendance')) {
    return 'Attendance details are available in the Attendance section. Would you like a quick tour or to set up attendance notifications?';
  }
  // Assignments
  if (msg.includes('assignment')) {
    return 'Assignments can be managed from the Assignments section. You can create, submit, or review assignments. Need help with bulk import or deadlines?';
  }
  // Dashboard customization
  if (
    msg.includes('customize') ||
    (msg.includes('dashboard') && (msg.includes('hide') || msg.includes('show') || msg.includes('rearrange') || msg.includes('custom')))
  ) {
    return 'You can customize your dashboard by hiding, showing, or rearranging cards. Click the settings icon on your dashboard to get started.';
  }
  // Bulk import/export
  if (msg.includes('import') || msg.includes('export')) {
    return 'Bulk import/export is available in the admin/teacher dashboard. Supported formats: CSV, XLSX. Would you like a step-by-step guide?';
  }
  // Calendar integration
  if (msg.includes('calendar')) {
    return 'You can sync your assignments and events with your calendar. Go to Settings > Integrations to connect Google Calendar or Outlook.';
  }
  // Gamification/badges
  if (msg.includes('badge') || msg.includes('gamification') || msg.includes('reward')) {
    return 'Earn badges for achievements like perfect attendance or top scores! View your badges on your public profile.';
  }
  // Notifications
  if (msg.includes('notification') || msg.includes('reminder')) {
    return 'You can manage notifications and automated reminders in your profile settings. Would you like to set up a reminder for assignments or meetings?';
  }
  // API integration
  if (msg.includes('api') || msg.includes('integration')) {
    return 'API integration is available for advanced users. You can generate an API key in your profile and connect third-party apps from the Integrations Marketplace.';
  }
  // Security (2FA, privacy)
  if (msg.includes('2fa') || msg.includes('two factor') || msg.includes('security') || msg.includes('privacy')) {
    return 'For enhanced security, enable Two-Factor Authentication (2FA) in your account settings. Your data privacy is our priority.';
  }
  // Accessibility
  if (msg.includes('accessibility') || msg.includes('font size') || msg.includes('contrast') || msg.includes('color blind')) {
    return 'You can customize accessibility settings (font size, contrast, color schemes) in the Accessibility Customizer under Settings.';
  }
  // Troubleshooting
  if (msg.includes('not working') || msg.includes('error') || msg.includes('issue') || msg.includes('problem')) {
    return 'Sorry you\'re having trouble! Try refreshing the page or checking your internet connection. If the issue persists, contact support or describe the problem for more help.';
  }
  // Ask AI/Insights
  if (msg.includes('ai') || msg.includes('insight') || msg.includes('analyze') || msg.includes('trend')) {
    return 'The "Ask AI" feature can analyze your marks, attendance, and more. Type your question or select "Ask AI" from the dashboard for insights.';
  }
  // Logout
  if (msg.includes('logout')) {
    return 'To logout, click the logout button in the top utility bar.';
  }
  // Refresh
  if (msg.includes('refresh')) {
    return 'You can refresh your dashboard using the refresh button in the utility bar.';
  }
  // Theme/Dark mode
  if (msg.includes('theme') || msg.includes('dark mode')) {
    return 'You can change the theme or enable dark mode from the settings or utility bar. Would you like to see how?';
  }
  // Tour/Onboarding
  if (msg.includes('tour') || msg.includes('onboarding')) {
    return 'To start the guided tour, click the help icon or select "Start Tour" from the help menu. I can walk you through the main features!';
  }
  // Help/Support
  if (msg.includes('help') || msg.includes('support')) {
    return 'I can help you navigate, find features, or answer questions about the system. Try asking about marks, attendance, assignments, or integrations!';
  }
  // Fallback
  return 'I am your Smart Assistant! I can help with marks, attendance, assignments, integrations, and more. Try asking a specific question or type "help" for suggestions.';
}

// --- Video Conferencing Integration (Jitsi Meet) ---
(function() {
  // Only show utility bar if user is logged in
  const user = localStorage.getItem('currentUser');
  if (!user) return; // Do not show on login page
  // Utility bar or top of dashboard
  let utilityBar = document.querySelector('.utility-bar');
  if (!utilityBar) {
    utilityBar = document.createElement('div');
    utilityBar.className = 'utility-bar';
    utilityBar.style.display = 'flex';
    utilityBar.style.justifyContent = 'flex-end';
    utilityBar.style.gap = '1rem';
    utilityBar.style.padding = '0.5rem 1rem';
    utilityBar.style.background = 'var(--surface, #fafaf7)';
    utilityBar.style.position = 'relative';
    utilityBar.style.zIndex = '1001';
    document.body.prepend(utilityBar);
  }
  // Add Start Video Call button
  const videoBtn = document.createElement('button');
  videoBtn.id = 'start-video-btn';
  videoBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="15" height="10" rx="2"/><polygon points="17 7 22 12 17 17 17 7"/></svg> Video Call';
  videoBtn.style.background = 'var(--primary, #1976d2)';
  videoBtn.style.color = '#fff';
  videoBtn.style.border = 'none';
  videoBtn.style.borderRadius = '6px';
  videoBtn.style.padding = '0.4rem 1rem';
  videoBtn.style.fontSize = '1rem';
  videoBtn.style.cursor = 'pointer';
  videoBtn.style.display = 'flex';
  videoBtn.style.alignItems = 'center';
  videoBtn.style.gap = '0.5rem';
  videoBtn.setAttribute('aria-label', 'Start Video Call');
  utilityBar.appendChild(videoBtn);

  // Modal for Jitsi Meet
  const videoModal = document.createElement('div');
  videoModal.id = 'video-modal';
  videoModal.style.display = 'none';
  videoModal.style.position = 'fixed';
  videoModal.style.top = '0';
  videoModal.style.left = '0';
  videoModal.style.width = '100vw';
  videoModal.style.height = '100vh';
  videoModal.style.background = 'rgba(0,0,0,0.45)';
  videoModal.style.zIndex = '2000';
  videoModal.style.justifyContent = 'center';
  videoModal.style.alignItems = 'center';
  videoModal.style.display = 'flex';
  videoModal.innerHTML = `
    <div id="video-modal-content" style="background:#fff;max-width:95vw;width:600px;height:70vh;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.18);display:flex;flex-direction:column;position:relative;">
      <button id="close-video-modal" aria-label="Close video call" style="position:absolute;top:0.5rem;right:0.5rem;background:none;border:none;font-size:2rem;color:#333;cursor:pointer;z-index:2;">&times;</button>
      <div style="padding:1rem 1rem 0.5rem 1rem;display:flex;align-items:center;gap:0.5rem;">
        <span style="font-weight:600;font-size:1.1rem;">Video Call</span>
        <button id="copy-video-link" style="margin-left:auto;background:#f5f5f5;border:none;border-radius:4px;padding:0.2rem 0.7rem;cursor:pointer;font-size:0.95rem;">Copy Link</button>
      </div>
      <iframe id="jitsi-iframe" allow="camera; microphone; fullscreen; display-capture" style="flex:1;width:100%;border:none;border-radius:0 0 12px 12px;"></iframe>
    </div>
  `;
  document.body.appendChild(videoModal);

  // Generate unique meeting name
  function generateMeetingName() {
    return 'brightmeet-' + Math.random().toString(36).substring(2, 10);
  }
  let meetingName = generateMeetingName();
  let meetingUrl = `https://meet.jit.si/${meetingName}`;

  // Open modal and set iframe src
  videoBtn.addEventListener('click', () => {
    meetingName = generateMeetingName();
    meetingUrl = `https://meet.jit.si/${meetingName}`;
    document.getElementById('jitsi-iframe').src = meetingUrl + '#userInfo.displayName=""';
    videoModal.style.display = 'flex';
  });
  // Close modal
  videoModal.querySelector('#close-video-modal').addEventListener('click', () => {
    videoModal.style.display = 'none';
    document.getElementById('jitsi-iframe').src = '';
  });
  // Copy meeting link
  videoModal.querySelector('#copy-video-link').addEventListener('click', () => {
    navigator.clipboard.writeText(meetingUrl);
    showToast('Meeting link copied!', 'info');
  });
  // ESC to close
  videoModal.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      videoModal.style.display = 'none';
      document.getElementById('jitsi-iframe').src = '';
    }
  });
})();

// --- Utility Bar Setup (Single, Top of Page) ---
(function() {
  // Only show utility bar if user is logged in
  const user = localStorage.getItem('currentUser');
  if (!user) return; // Do not show on login page
  let utilityBar = document.querySelector('.utility-bar');
  if (!utilityBar) {
    utilityBar = document.createElement('div');
    utilityBar.className = 'utility-bar';
    document.body.prepend(utilityBar);
  }
  // Add Documents button if not present
  if (!document.getElementById('documents-btn')) {
    const docBtn = document.createElement('button');
    docBtn.id = 'documents-btn';
    docBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg> Documents';
    docBtn.style.background = 'var(--primary, #1976d2)';
    docBtn.style.color = '#fff';
    docBtn.style.border = 'none';
    docBtn.style.borderRadius = '6px';
    docBtn.style.padding = '0.4rem 1rem';
    docBtn.style.fontSize = '1rem';
    docBtn.style.cursor = 'pointer';
    docBtn.style.display = 'flex';
    docBtn.style.alignItems = 'center';
    docBtn.style.gap = '0.5rem';
    docBtn.setAttribute('aria-label', 'Open Documents');
    utilityBar.insertBefore(docBtn, utilityBar.firstChild);
    // Modal for Documents
    const docModal = document.createElement('div');
    docModal.id = 'documents-modal';
    docModal.style.display = 'none';
    docModal.style.position = 'fixed';
    docModal.style.top = '0';
    docModal.style.left = '0';
    docModal.style.width = '100vw';
    docModal.style.height = '100vh';
    docModal.style.background = 'rgba(0,0,0,0.45)';
    docModal.style.zIndex = '2100';
    docModal.style.justifyContent = 'center';
    docModal.style.alignItems = 'center';
    docModal.style.display = 'flex';
    docModal.innerHTML = `
      <div id="documents-modal-content" style="background:#fff;max-width:95vw;width:700px;height:75vh;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.18);display:flex;flex-direction:column;position:relative;">
        <button id="close-documents-modal" aria-label="Close documents" style="position:absolute;top:0.5rem;right:0.5rem;background:none;border:none;font-size:2rem;color:#333;cursor:pointer;z-index:2;">&times;</button>
        <div style="padding:1rem 1rem 0.5rem 1rem;display:flex;align-items:center;gap:0.5rem;">
          <span style="font-weight:600;font-size:1.1rem;">Documents</span>
        </div>
        <div id="documents-collab-editor" style="flex:1;padding:1rem;overflow:auto;border-radius:8px;background:#fafbfc;border:1px solid #e0e0e0;"></div>
      </div>
    `;
    document.body.appendChild(docModal);
    // Open modal
    docBtn.addEventListener('click', () => {
      docModal.style.display = 'flex';
      // Initialize Quill + Yjs collaborative editor if not already present
      const editorDiv = docModal.querySelector('#documents-collab-editor');
      if (!editorDiv.hasChildNodes()) {
        // Create Quill container
        const quillContainer = document.createElement('div');
        quillContainer.id = 'quill-editor';
        quillContainer.style.height = '100%';
        editorDiv.appendChild(quillContainer);
        // Initialize Yjs + Quill
        if (window.Y && window.Y.WebsocketProvider && window.Quill) {
          const ydoc = new window.Y.Doc();
          // Use a shared room name for demo; in production, use a unique doc id
          const roomName = 'bright-docs-demo';
          const provider = new window.Y.WebsocketProvider('wss://demos.yjs.dev', roomName, ydoc);
          const ytext = ydoc.getText('quill');
          const quill = new window.Quill('#quill-editor', {
            theme: 'snow',
            placeholder: 'Start collaborating...'
          });
          // Bind Quill to Yjs
          window.Y.QuillBinding = window.Y.QuillBinding || window.Quill.import('modules/binding');
          if (window.Y.QuillBinding) {
            new window.Y.QuillBinding(ytext, quill, provider.awareness);
          } else {
            // Fallback: basic sync
            ytext.observe(event => {
              quill.setText(ytext.toString());
            });
            quill.on('text-change', () => {
              ytext.delete(0, ytext.length);
              ytext.insert(0, quill.getText());
            });
          }
        } else {
          quillContainer.innerHTML = '<div style="color:#b71c1c">Failed to load collaborative editor libraries.</div>';
        }
      }
    });
    // Close modal
    docModal.querySelector('#close-documents-modal').addEventListener('click', () => {
      docModal.style.display = 'none';
    });
    // ESC to close
    docModal.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        docModal.style.display = 'none';
      }
    });
  }
})();

// Ensure modals are hidden by default on page load
window.addEventListener('DOMContentLoaded', function() {
  var docModal = document.getElementById('documents-modal');
  if (docModal) docModal.style.display = 'none';
  var videoModal = document.getElementById('video-modal');
  if (videoModal) videoModal.style.display = 'none';
});

(function() {
  let utilityBar = document.querySelector('.utility-bar');
  if (!utilityBar) {
    utilityBar = document.createElement('div');
    utilityBar.className = 'utility-bar';
    document.body.prepend(utilityBar);
  }
  // Add Documents button if not present
  if (!document.getElementById('documents-btn')) {
    const docBtn = document.createElement('button');
    docBtn.id = 'documents-btn';
    docBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg> Documents';
    docBtn.style.background = 'var(--primary, #1976d2)';
    docBtn.style.color = '#fff';
    docBtn.style.border = 'none';
    docBtn.style.borderRadius = '6px';
    docBtn.style.padding = '0.4rem 1rem';
    docBtn.style.fontSize = '1rem';
    docBtn.style.cursor = 'pointer';
    docBtn.style.display = 'flex';
    docBtn.style.alignItems = 'center';
    docBtn.style.gap = '0.5rem';
    docBtn.setAttribute('aria-label', 'Open Documents');
    utilityBar.insertBefore(docBtn, utilityBar.firstChild);
    // Modal for Documents
    const docModal = document.createElement('div');
    docModal.id = 'documents-modal';
    docModal.style.display = 'none';
    docModal.style.position = 'fixed';
    docModal.style.top = '0';
    docModal.style.left = '0';
    docModal.style.width = '100vw';
    docModal.style.height = '100vh';
    docModal.style.background = 'rgba(0,0,0,0.45)';
    docModal.style.zIndex = '2100';
    docModal.style.justifyContent = 'center';
    docModal.style.alignItems = 'center';
    docModal.style.display = 'flex';
    docModal.innerHTML = `
      <div id="documents-modal-content" style="background:#fff;max-width:95vw;width:700px;height:75vh;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.18);display:flex;flex-direction:row;position:relative;">
        <button id="close-documents-modal" aria-label="Close documents" style="position:absolute;top:0.5rem;right:0.5rem;background:none;border:none;font-size:2rem;color:#333;cursor:pointer;z-index:2;">&times;</button>
        <div id="documents-list-panel" style="width:180px;min-width:120px;max-width:220px;background:#f5f5f7;border-right:1px solid #e0e0e0;display:flex;flex-direction:column;gap:0.5rem;padding:1rem 0.5rem 1rem 1rem;">
          <div style="font-weight:600;margin-bottom:0.5rem;">My Documents</div>
          <div id="documents-list" style="flex:1;overflow-y:auto;"></div>
          <button id="create-document-btn" style="margin-top:0.5rem;background:#1976d2;color:#fff;border:none;border-radius:5px;padding:0.3rem 0.7rem;cursor:pointer;">+ New Document</button>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;min-width:0;">
          <div style="padding:1rem 1rem 0.5rem 1rem;display:flex;align-items:center;gap:0.5rem;">
            <span id="current-doc-title" style="font-weight:600;font-size:1.1rem;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Documents</span>
            <button id="rename-document-btn" style="background:none;border:none;color:#1976d2;cursor:pointer;font-size:1.1rem;">Rename</button>
            <button id="delete-document-btn" style="background:none;border:none;color:#b71c1c;cursor:pointer;font-size:1.1rem;">Delete</button>
            <button id="share-document-btn" style="background:none;border:none;color:#388e3c;cursor:pointer;font-size:1.1rem;">Share</button>
          </div>
          <div id="documents-collab-editor" style="flex:1;padding:1rem;overflow:auto;border-radius:8px;background:#fafbfc;border:1px solid #e0e0e0;min-width:0;"></div>
        </div>
      </div>
    `;
    document.body.appendChild(docModal);

    // Document management logic
    function getDocuments() {
      return JSON.parse(localStorage.getItem('collabDocs') || '[]');
    }
    function saveDocuments(docs) {
      localStorage.setItem('collabDocs', JSON.stringify(docs));
    }
    function generateDocId() {
      return 'doc-' + Math.random().toString(36).substring(2, 10);
    }
    function renderDocumentsList(selectedId) {
      const docs = getDocuments();
      const list = docModal.querySelector('#documents-list');
      list.innerHTML = '';
      docs.forEach(doc => {
        const btn = document.createElement('button');
        btn.textContent = doc.title;
        btn.style.display = 'block';
        btn.style.width = '100%';
        btn.style.textAlign = 'left';
        btn.style.background = doc.id === selectedId ? '#e3f2fd' : 'none';
        btn.style.border = 'none';
        btn.style.borderRadius = '4px';
        btn.style.padding = '0.3rem 0.5rem';
        btn.style.marginBottom = '0.2rem';
        btn.style.cursor = 'pointer';
        btn.onclick = () => selectDocument(doc.id);
        list.appendChild(btn);
      });
    }
    function selectDocument(docId) {
      const docs = getDocuments();
      const doc = docs.find(d => d.id === docId);
      if (!doc) return;
      localStorage.setItem('currentCollabDoc', docId);
      docModal.querySelector('#current-doc-title').textContent = doc.title;
      renderDocumentsList(docId);
      // Load collaborative editor for this doc
      loadCollaborativeEditor(docId);
    }
    function createDocument() {
      const docs = getDocuments();
      const title = prompt('Enter document name:', 'Untitled Document');
      if (!title) return;
      const id = generateDocId();
      docs.push({ id, title });
      saveDocuments(docs);
      selectDocument(id);
    }
    function renameDocument() {
      const docId = localStorage.getItem('currentCollabDoc');
      if (!docId) return;
      const docs = getDocuments();
      const doc = docs.find(d => d.id === docId);
      if (!doc) return;
      const newTitle = prompt('Rename document:', doc.title);
      if (!newTitle) return;
      doc.title = newTitle;
      saveDocuments(docs);
      selectDocument(docId);
    }
    function deleteDocument() {
      const docId = localStorage.getItem('currentCollabDoc');
      if (!docId) return;
      if (!confirm('Delete this document? This cannot be undone.')) return;
      let docs = getDocuments();
      docs = docs.filter(d => d.id !== docId);
      saveDocuments(docs);
      // Select another doc or clear
      if (docs.length) {
        selectDocument(docs[0].id);
      } else {
        localStorage.removeItem('currentCollabDoc');
        docModal.querySelector('#current-doc-title').textContent = 'Documents';
        docModal.querySelector('#documents-collab-editor').innerHTML = '';
        renderDocumentsList(null);
      }
    }
    function shareDocument() {
      const docId = localStorage.getItem('currentCollabDoc');
      if (!docId) return;
      const url = window.location.origin + window.location.pathname + `?doc=${docId}`;
      navigator.clipboard.writeText(url);
      showToast('Document link copied!', 'info');
    }
    // Collaborative editor loader
    function loadCollaborativeEditor(docId) {
      const editorDiv = docModal.querySelector('#documents-collab-editor');
      editorDiv.innerHTML = '';
      const quillContainer = document.createElement('div');
      quillContainer.id = 'quill-editor';
      quillContainer.style.height = '100%';
      editorDiv.appendChild(quillContainer);
      if (window.Y && window.Y.WebsocketProvider && window.Quill) {
        const ydoc = new window.Y.Doc();
        const provider = new window.Y.WebsocketProvider('wss://demos.yjs.dev', 'bright-docs-' + docId, ydoc);
        const ytext = ydoc.getText('quill');
        const quill = new window.Quill('#quill-editor', {
          theme: 'snow',
          placeholder: 'Start collaborating...'
        });
        window.Y.QuillBinding = window.Y.QuillBinding || window.Quill.import('modules/binding');
        if (window.Y.QuillBinding) {
          new window.Y.QuillBinding(ytext, quill, provider.awareness);
        } else {
          ytext.observe(event => {
            quill.setText(ytext.toString());
          });
          quill.on('text-change', () => {
            ytext.delete(0, ytext.length);
            ytext.insert(0, quill.getText());
          });
        }
      } else {
        quillContainer.innerHTML = '<div style="color:#b71c1c">Failed to load collaborative editor libraries.</div>';
      }
    }
    // Event listeners
    docModal.querySelector('#create-document-btn').onclick = createDocument;
    docModal.querySelector('#rename-document-btn').onclick = renameDocument;
    docModal.querySelector('#delete-document-btn').onclick = deleteDocument;
    docModal.querySelector('#share-document-btn').onclick = shareDocument;
    // Open modal
    docBtn.addEventListener('click', () => {
      docModal.style.display = 'flex';
      // Load or create first doc
      const docs = getDocuments();
      let docId = localStorage.getItem('currentCollabDoc');
      if (!docId || !docs.find(d => d.id === docId)) {
        if (docs.length) docId = docs[0].id;
        else {
          createDocument();
          return;
        }
      }
      selectDocument(docId);
    });
    // Close modal
    docModal.querySelector('#close-documents-modal').addEventListener('click', () => {
      docModal.style.display = 'none';
    });
    // ESC to close
    docModal.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        docModal.style.display = 'none';
      }
    });
  }
})();
