// International School Student Mark Management System - Authentication

// Complete User Database
const users = {
    // Admin User
    admin: {
        username: 'admin',
        password: 'NathanSuperAdmin@25',
        name: 'Nathan',
        role: 'admin',
        email: 'admin@internationalschool.com',
        fullName: 'Nathan (Super Administrator)'
    },
    
    // Teachers
    'nathan.g': {
        username: 'nathan.g',
        password: 'Teach@001',
        name: 'Nathan Getachew',
        role: 'teacher',
        email: 'nathan.g@internationalschool.com',
        subjects: ['Maths'],
        fullName: 'Nathan Getachew'
    },
    'abenezer.g': {
        username: 'abenezer.g',
        password: 'Teach@002',
        name: 'Abenezer Geda',
        role: 'teacher',
        email: 'abenezer.g@internationalschool.com',
        subjects: ['Chemistry'],
        fullName: 'Abenezer Geda'
    },
    'oliyad.s': {
        username: 'oliyad.s',
        password: 'Teach@003',
        name: 'Oliyad Sisay',
        role: 'teacher',
        email: 'oliyad.s@internationalschool.com',
        subjects: ['Agriculture'],
        fullName: 'Oliyad Sisay'
    },
    'mohammed.j': {
        username: 'mohammed.j',
        password: 'Teach@004',
        name: 'Mohammed Jemal',
        role: 'teacher',
        email: 'mohammed.j@internationalschool.com',
        subjects: ['English'],
        fullName: 'Mohammed Jemal'
    },
    'getachew.a': {
        username: 'getachew.a',
        password: 'Teach@005',
        name: 'Getachew Agonafir',
        role: 'teacher',
        email: 'getachew.a@internationalschool.com',
        subjects: ['Biology'],
        fullName: 'Getachew Agonafir'
    },
    'henok.h': {
        username: 'henok.h',
        password: 'Teach@006',
        name: 'Henok Habteleul',
        role: 'teacher',
        email: 'henok.h@internationalschool.com',
        subjects: ['ICT'],
        fullName: 'Henok Habteleul'
    },
    'edom.g': {
        username: 'edom.g',
        password: 'Teach@007',
        name: 'Edom Getachew',
        role: 'teacher',
        email: 'edom.g@internationalschool.com',
        subjects: ['Physics'],
        fullName: 'Edom Getachew'
    },
    
    // Students
    'fraol.t': {
        username: 'fraol.t',
        password: 'Stud@101',
        name: 'Fraol Tadesse',
        role: 'student',
        email: 'fraol.t@internationalschool.com',
        grade: '10th Grade',
        fullName: 'Fraol Tadesse'
    },
    'dagim.a': {
        username: 'dagim.a',
        password: 'Stud@102',
        name: 'Dagim Admasu',
        role: 'student',
        email: 'dagim.a@internationalschool.com',
        grade: '10th Grade',
        fullName: 'Dagim Admasu'
    },
    'bisrat.g': {
        username: 'bisrat.g',
        password: 'Stud@103',
        name: 'Bisrat Getachew',
        role: 'student',
        email: 'bisrat.g@internationalschool.com',
        grade: '10th Grade',
        fullName: 'Bisrat Getachew'
    },
    'medal.g': {
        username: 'medal.g',
        password: 'Stud@104',
        name: 'Medal Getachew',
        role: 'student',
        email: 'medal.g@internationalschool.com',
        grade: '10th Grade',
        fullName: 'Medal Getachew'
    },
    'firehiwot.g': {
        username: 'firehiwot.g',
        password: 'Stud@105',
        name: 'Firehiwot Getachew',
        role: 'student',
        email: 'firehiwot.g@internationalschool.com',
        grade: '10th Grade',
        fullName: 'Firehiwot Getachew'
    },
    'jitu.b': {
        username: 'jitu.b',
        password: 'Stud@106',
        name: 'Jitu Bortola',
        role: 'student',
        email: 'jitu.b@internationalschool.com',
        grade: '10th Grade',
        fullName: 'Jitu Bortola'
    },
    'talile.b': {
        username: 'talile.b',
        password: 'Stud@107',
        name: 'Talile Bortola',
        role: 'student',
        email: 'talile.b@internationalschool.com',
        grade: '10th Grade',
        fullName: 'Talile Bortola'
    },
    'nahom.g': {
        username: 'nahom.g',
        password: 'Stud@108',
        name: 'Nahom Getahun',
        role: 'student',
        email: 'nahom.g@internationalschool.com',
        grade: '10th Grade',
        fullName: 'Nahom Getahun'
    },
    'natnael.b': {
        username: 'natnael.b',
        password: 'Stud@109',
        name: 'Natnael Bereta',
        role: 'student',
        email: 'natnael.b@internationalschool.com',
        grade: '10th Grade',
        fullName: 'Natnael Bereta'
    },
    'umeran.b': {
        username: 'umeran.b',
        password: 'Stud@110',
        name: 'Umeran Bereta',
        role: 'student',
        email: 'umeran.b@internationalschool.com',
        grade: '10th Grade',
        fullName: 'Umeran Bereta'
    },
    'elchapo.m': {
       username: 'elchapo.m',
       password: 'Stud@111',
       name: 'Elchapo Muftah',
       role: 'student',
       email: 'elchapo.m@internationalschool.com',
       grade: '10th Grade',
       fullName: 'Elchapo Muftah',
    },
    'aster.h': {
    "username": "aster.h",
    "password": "Stud@111",
    "name": "Aster Haile",
    "role": "student",
    "email": "aster.h@internationalschool.com",
    "fullName": "Aster Haile",
    "grade": "10th Grade"
},
};

// System Configuration
const systemConfig = {
    subjects: ['Maths', 'Chemistry', 'Biology', 'Agriculture', 'English', 'Physics', 'ICT'],
    terms: ['Term 1', 'Term 2', 'Term 3', 'Term 4'],
    markStructure: {
        activity: { max: 5, percentage: 5 },
        exerciseBook: { max: 5, percentage: 5 },
        midExam: { max: 25, percentage: 25 },
        finalExam: { max: 50, percentage: 50 },
        groupWork: { max: 10, percentage: 10 },
        worksheet: { max: 5, percentage: 5 }
    },
    schoolName: 'International School',
    academicYear: '2024-2025'
};

// Check if user is authenticated
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        return JSON.parse(currentUser);
    }
    return null;
}

// Login function
function login(username, password) {
    const user = users[username];
    
    if (user && user.password === password) {
        // Store user session
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Log login activity
        logActivity('login', user.name, `${user.role} logged in`);
        
        return { success: true, user: user };
    } else {
        return { success: false, message: 'Invalid username or password' };
    }
}

// Logout function
function logout() {
    const currentUser = checkAuth();
    if (currentUser) {
        logActivity('logout', currentUser.name, `${currentUser.role} logged out`);
    }
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }
}

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Hide after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

// Show success message
function showSuccess(message) {
    const successDiv = document.getElementById('success-message');
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        
        // Hide after 5 seconds
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 5000);
    }
}

// Log activity for admin dashboard
function logActivity(action, userName, description) {
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    activities.unshift({
        id: generateId(),
        action: action,
        userName: userName,
        description: description,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 100 activities
    if (activities.length > 100) {
        activities.splice(100);
    }
    
    localStorage.setItem('activities', JSON.stringify(activities));
}

// Initialize system data if not exists
function initializeSystemData() {
    // Initialize subjects if not exists
    if (!localStorage.getItem('subjects')) {
        localStorage.setItem('subjects', JSON.stringify(systemConfig.subjects));
    }
    
    // Initialize terms if not exists
    if (!localStorage.getItem('terms')) {
        localStorage.setItem('terms', JSON.stringify(systemConfig.terms));
    }
    
    // Initialize notifications if not exists
    if (!localStorage.getItem('notifications')) {
        const defaultNotifications = [
            {
                id: generateId(),
                title: 'Welcome to International School',
                content: 'Welcome to the new academic year! Please ensure all marks are entered on time.',
                type: 'info',
                timestamp: new Date().toISOString(),
                readBy: []
            }
        ];
        localStorage.setItem('notifications', JSON.stringify(defaultNotifications));
    }
    
    // Initialize marks if not exists
    if (!localStorage.getItem('marks')) {
        localStorage.setItem('marks', JSON.stringify([]));
    }
    
    // Initialize activities if not exists
    if (!localStorage.getItem('activities')) {
        localStorage.setItem('activities', JSON.stringify([]));
    }
}

// Handle login form submission
document.addEventListener('DOMContentLoaded', function() {
    // Initialize system data
    initializeSystemData();
    
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            
            if (!username || !password) {
                showError('Please enter both username and password');
                return;
            }
            
            const result = login(username, password);
            
            if (result.success) {
                showSuccess('Login successful! Redirecting...');
                
                // Redirect based on role
                setTimeout(() => {
                    switch (result.user.role) {
                        case 'admin':
                            window.location.href = 'admin.html';
                            break;
                        case 'teacher':
                            window.location.href = 'teacher.html';
                            break;
                        case 'student':
                            window.location.href = 'student.html';
                            break;
                        default:
                            window.location.href = 'index.html';
                    }
                }, 1000);
            } else {
                showError(result.message);
            }
        });
    }
    
    // Check if user is already logged in
    const currentUser = checkAuth();
    if (currentUser && window.location.pathname.includes('index.html')) {
        // Redirect to appropriate dashboard
        switch (currentUser.role) {
            case 'admin':
                window.location.href = 'admin.html';
                break;
            case 'teacher':
                window.location.href = 'teacher.html';
                break;
            case 'student':
                window.location.href = 'student.html';
                break;
        }
    }
});

// Role-based route protection
function protectRoute(allowedRoles) {
    const currentUser = checkAuth();
    if (!currentUser) {
        window.location.href = 'index.html';
        return false;
    }
    
    if (!allowedRoles.includes(currentUser.role)) {
        showError('Access denied. You do not have permission to view this page.');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        return false;
    }
    
    return currentUser;
}

// Add 2FA modal HTML to the page if not present
if (!document.getElementById('twoFAModal')) {
    const modal = document.createElement('div');
    modal.id = 'twoFAModal';
    modal.className = 'modal';
    modal.style.display = 'none';
    modal.innerHTML = `
        <div class="modal-content" style="max-width:340px;margin:auto;">
            <div class="modal-header">
                <h3><i class="fas fa-shield-alt"></i> Two-Factor Authentication</h3>
            </div>
            <div class="modal-body">
                <p>Please enter your 2FA code:</p>
                <input type="text" id="twoFACodeInput" maxlength="6" style="font-size:1.2em;text-align:center;width:100%;padding:0.5em;letter-spacing:0.2em;">
                <div id="twoFAError" style="color:#c00;font-size:0.95em;margin-top:0.5em;display:none;"></div>
            </div>
            <div class="modal-footer">
                <button id="twoFACancelBtn" class="btn btn-secondary">Cancel</button>
                <button id="twoFASubmitBtn" class="btn btn-primary">Verify</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Add this function to handle successful login and redirect
function completeLogin(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    if (user.role === 'admin') {
        window.location.href = 'admin.html';
    } else if (user.role === 'teacher') {
        window.location.href = 'teacher.html';
    } else if (user.role === 'student') {
        window.location.href = 'student.html';
    }
}

// Patch login function to enforce 2FA
const origLogin = login;
login = function(username, password) {
    const user = users[username];
    if (!user || user.password !== password) {
        showError('Invalid username or password');
        return false;
    }
    // Check 2FA
    const user2FA = JSON.parse(localStorage.getItem('2fa_' + username) || '{}');
    if (user2FA.enabled) {
        // Show 2FA modal
        const modal = document.getElementById('twoFAModal');
        const codeInput = document.getElementById('twoFACodeInput');
        const errorDiv = document.getElementById('twoFAError');
        modal.style.display = 'flex';
        codeInput.value = '';
        errorDiv.style.display = 'none';
        codeInput.focus();
        // Cancel button
        document.getElementById('twoFACancelBtn').onclick = function() {
            modal.style.display = 'none';
        };
        // Submit button
        document.getElementById('twoFASubmitBtn').onclick = function() {
            if (codeInput.value.trim() === user2FA.code) {
                modal.style.display = 'none';
                completeLogin(user);
            } else {
                errorDiv.textContent = 'Incorrect code. Please try again.';
                errorDiv.style.display = 'block';
                codeInput.focus();
            }
        };
        // Enter key
        codeInput.onkeydown = function(e) {
            if (e.key === 'Enter') document.getElementById('twoFASubmitBtn').onclick();
        };
        return false;
    } else {
        completeLogin(user);
        return true;
    }
};
