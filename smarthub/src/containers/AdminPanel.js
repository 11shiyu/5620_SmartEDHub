import React, { useState, useEffect } from 'react';
import '../css/Styles.css';

function AdminPanel() {
    const [view, setView] = useState('students'); // 默认展示学生账户列表
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    

    const studentAPI = `http://localhost:8090/admin/getAllStudent`;
    const teacherAPI = `http://localhost:8090/admin/getAllTeacher`;
    const announcementAPI = `http://localhost:8090/announcement/showAllOrSpecificAnnouncement`;

    async function deleteAnnouncement(announcementId) {
        try {
            const response = await fetch(`http://localhost:8090/announcement/deleteAnnouncement?announcementId=${announcementId}`, {
                method: 'DELETE', // 设置请求方法为POST
                headers: {
                    'Content-Type': 'application/json', // 设置请求头
                    'Authorization': window.sessionStorage.getItem('tokenStr')
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            console.log("delete announcement responce", data);
            setAnnouncements(prevAnnouncements => 
                prevAnnouncements.filter(announcement => announcement.announcementId !== announcementId));
        } catch (error) {
            console.error('删除announcement失败:', error);
        }
    }

    async function enableUser(userType, username) {
        try {
            const response = await fetch(`http://localhost:8090/admin/enableUser?userType=${userType}&username=${username}`, {
                method: 'POST', // 设置请求方法为POST
                headers: {
                    'Content-Type': 'application/json', // 设置请求头
                    'Authorization': window.sessionStorage.getItem('tokenStr')
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            console.log("enable Data", data);
            if(userType === 1) {
                // 更新学生的状态
                setStudents(prevStudents => 
                    prevStudents.map(student => 
                        student.username === username ? {...student, validity: true} : student
                    )
                );
            } else if(userType === 2) {
                // 更新老师的状态
                setTeachers(prevTeachers => 
                    prevTeachers.map(teacher => 
                        teacher.username === username ? {...teacher, validity: true} : teacher
                    )
                );
            }
        } catch (error) {
            console.error('enable user失败:', error);
        }
    }


    async function disableUser(userType, username) {
        try {
            const response = await fetch(`http://localhost:8090/admin/invalidUser?userType=${userType}&username=${username}`, {
                method: 'POST', // 设置请求方法为POST
                headers: {
                    'Content-Type': 'application/json', // 设置请求头
                    'Authorization': window.sessionStorage.getItem('tokenStr')
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            console.log("disable Data", data);
            if(userType === 1) {
                // 更新学生的状态
                setStudents(prevStudents => 
                    prevStudents.map(student => 
                        student.username === username ? {...student, validity: false} : student
                    )
                );
            } else if(userType === 2) {
                // 更新老师的状态
                setTeachers(prevTeachers => 
                    prevTeachers.map(teacher => 
                        teacher.username === username ? {...teacher, validity: false} : teacher
                    )
                );
            }
        } catch (error) {
            console.error('disable user 失败:', error);
        }
    }

    useEffect(() => {
        // 假设fetchQuestions是一个异步方法，从数据库获取问题列表
        async function fetchStudent() {
            try {
                const response = await fetch(studentAPI, {
                    method: 'GET', // 设置请求方法为POST
                    headers: {
                        'Content-Type': 'application/json', // 设置请求头
                        'Authorization': window.sessionStorage.getItem('tokenStr')
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const data = await response.json();
                console.log("StudentAccountData", data);
                setStudents(data); // 假设您想要将返回的数据保存到test状态中
            } catch (error) {
                console.error('获取学生账户列表失败:', error);
            }
        }

        async function fetchTeacher() {
            try {
                const response = await fetch(teacherAPI, {
                    method: 'GET', // 设置请求方法为POST
                    headers: {
                        'Content-Type': 'application/json', // 设置请求头
                        'Authorization': window.sessionStorage.getItem('tokenStr')
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const data = await response.json();
                console.log("TeacherAccountData", data);
                setTeachers(data); // 假设您想要将返回的数据保存到test状态中
            } catch (error) {
                console.error('获取老师账户列表失败:', error);
            }
        }
        async function fetchAnnouncements() {
            try {
                const response = await fetch(announcementAPI, {
                    method: 'GET', // 设置请求方法为POST
                    headers: {
                        'Content-Type': 'application/json', // 设置请求头
                        'Authorization': window.sessionStorage.getItem('tokenStr')
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const data = await response.json();
                console.log("AnnouncementData", data.data);
                setAnnouncements(data.data); // 假设您想要将返回的数据保存到test状态中
            } catch (error) {
                console.error('获取公告列表失败:', error);
            }
        }

        fetchStudent();
        fetchTeacher();
        fetchAnnouncements();
    }, []);



    const renderTableContent = () => {
        switch (view) {
            case 'students':
                return (
                    <>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Validity</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.studentId}</td>
                                    <td>{student.username}</td>
                                    <td>{String(student.validity)}</td>
                                    <td>
                                        <button 
                                        className={student.validity ? "btn-disabled" : "btn-enabled"} 
                                        onClick={() => disableUser(1, student.username)}
                                        >
                                            Disable</button>
                                        <button 
                                        className={student.validity ? "btn-enabled" : "btn-disabled"}
                                        onClick={() => enableUser(1, student.username)}
                                        >
                                            Enable</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                );
            case 'teachers':
                return (
                    <>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Validity</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map((teacher, index) => (
                                <tr key={index}>
                                    <td>{teacher.teacherId}</td>
                                    <td>{teacher.username}</td>
                                    <td>{String(teacher.validity)}</td>
                                    <td>
                                        <button 
                                        className={teacher.validity ? "btn-disabled" : "btn-enabled"} 
                                        onClick={() => disableUser(2, teacher.username)}>
                                            Disable</button>
                                        <button 
                                        className={teacher.validity ? "btn-enabled" : "btn-disabled"} 
                                        onClick={() => enableUser(2, teacher.username)}>Enable</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                );
            case 'announcement':
                return (
                    <>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Detail</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.map((announcement, index) => (
                                <tr key={index}>
                                    <td>{announcement.announcementId}</td>
                                    <td>{announcement.announcementTitle}</td>
                                    <td>{announcement.announcementDetail}</td>
                                    <td>
                                        <button 
                                        className='btn-delete'
                                        onClick={() => deleteAnnouncement(announcement.announcementId)}>
                                            Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="admin-panel">
            <div className="sidebar">
                <a href="#" onClick={() => setView('students')}>Student Account</a>
                <a href="#" onClick={() => setView('teachers')}>Teacher Account</a>
                <a href="#" onClick={() => setView('announcement')}>Announcement Management</a>
            </div>

            <div className="content">
                <table>
                    {renderTableContent()}
                </table>
            </div>
        </div>
    );
}

export default AdminPanel;