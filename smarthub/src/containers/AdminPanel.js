import React, { useState } from 'react';
import '../css/Styles.css';

function AdminPanel() {
    const [view, setView] = useState('students'); // 默认展示学生账户列表

    const renderTableContent = () => {
        switch (view) {
            case 'students':
                return (
                    <>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>张三</td>
                                <td>
                                    <button className="btn">Disable</button>
                                    <button className="btn">Enable</button>
                                </td>
                            </tr>
                            {/* 添加更多学生数据 */}
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
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>李四</td>
                                <td>
                                    <button className="btn">Disable</button>
                                    <button className="btn">Enable</button>
                                </td>
                            </tr>
                            {/* 添加更多教师数据 */}
                        </tbody>
                    </>
                );
            case 'announcement':
                return (
                    <>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Content</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>这是一个示例公告</td>
                                <td>
                                    <button className="btn">Delete</button>
                                </td>
                            </tr>
                            {/* 添加更多公告数据 */}
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