# Student Mark Management System

A modern, web-based student mark management system with role-based access control for administrators, teachers, and students.

## 🚀 Features

- **Role-based Access Control**: Separate dashboards for Admin, Teachers, and Students
- **Modern UI**: Clean, responsive design with smooth animations
- **Real-time Updates**: Instant feedback and notifications
- **Data Export**: Export data in various formats
- **Mobile Responsive**: Works on all devices
- **Local Storage**: Data persists in browser storage

## 👥 User Roles

### Admin
- System overview and statistics
- User management (add/edit/delete students and teachers)
- Subject management
- Data export and reporting
- System monitoring

### Teacher
- Mark entry and management
- Student performance tracking
- Subject-specific dashboards
- Grade calculation

### Student
- View personal marks and grades
- Performance analytics
- Grade history
- Progress tracking

## 🔑 Login Credentials

### Admin Access
- **Username**: `admin`
- **Password**: `admin123`

### Teacher Access
- **Username**: `teacher`
- **Password**: `teacher123`

### Student Access
- **Username**: `student`
- **Password**: `student123`

## 📁 File Structure

```
student-mark-system/
├── index.html          # Login page
├── admin.html          # Admin dashboard
├── teacher.html        # Teacher dashboard (to be created)
├── student.html        # Student dashboard (to be created)
├── js/
│   ├── auth.js         # Authentication system
│   ├── main.js         # Utility functions
│   └── admin.js        # Admin dashboard functions
├── styles/
│   └── main.css        # Main stylesheet
└── README.md           # This file
```

## 🛠️ How to Use

### Getting Started

1. **Open the System**: Open `index.html` in your web browser
2. **Login**: Use one of the provided credentials to log in
3. **Navigate**: Access different features based on your role

### For Administrators

1. **System Overview**: View total students, teachers, subjects, and average grades
2. **Add Users**: Use quick action buttons to add students, teachers, or subjects
3. **Export Data**: Download system data in JSON format
4. **Monitor Activity**: View recent system activity

### For Teachers

1. **Mark Entry**: Enter student marks for different subjects
2. **Grade Calculation**: Automatic grade calculation based on marks
3. **Student Tracking**: Monitor individual student performance
4. **Subject Management**: Manage marks for assigned subjects

### For Students

1. **View Marks**: See all your marks and grades
2. **Performance Analytics**: View performance charts and trends
3. **Grade History**: Track your academic progress over time
4. **Subject Breakdown**: Detailed view of marks by subject

## 🎨 Design Features

- **Modern Gradient Backgrounds**: Eye-catching visual design
- **Card-based Layout**: Clean, organized information display
- **Smooth Animations**: Professional user experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Color-coded Elements**: Easy visual identification
- **Interactive Elements**: Hover effects and transitions

## 🔧 Technical Details

- **Frontend Only**: Pure HTML, CSS, and JavaScript
- **Local Storage**: Data persistence without server requirements
- **No Dependencies**: Works without internet connection (except Font Awesome icons)
- **Cross-browser Compatible**: Works on all modern browsers
- **Progressive Enhancement**: Graceful degradation for older browsers

## 📱 Browser Compatibility

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🚀 Quick Start

1. Download or clone the project
2. Open `index.html` in your web browser
3. Login with any of the provided credentials
4. Start managing student marks!

## 🔒 Security Notes

- This is a demo system with hardcoded credentials
- For production use, implement proper authentication
- Add server-side validation and security measures
- Use HTTPS for data transmission
- Implement proper session management

## 📈 Future Enhancements

- [ ] Teacher dashboard implementation
- [ ] Student dashboard implementation
- [ ] Advanced reporting features
- [ ] Email notifications
- [ ] Parent portal
- [ ] Mobile app
- [ ] Database integration
- [ ] Multi-language support

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation

## 📄 License

This project is open source and available under the MIT License.

---

**Note**: This is a demonstration system. For production use, implement proper security measures and data validation. 