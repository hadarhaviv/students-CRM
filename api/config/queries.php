<?php

// students

define("GET_ALL_STUDENTS", "SELECT stu.id, stu.name, stu.phone, stu.email, stu.image, course.id as course_id from student as stu left join courses_students_lnk as lnk on stu.id = lnk.fk_students left join course as course on course.id = lnk.fk_courses");


define("ADD_USER", "INSERT INTO student (name, phone, email) VALUES (?, ?, ?);");


define("DELETE_STUDENT", "DELETE FROM student WHERE (id = p1);");


define("EDIT_STUDENT", "UPDATE student SET name = ?, phone = ?, email = ? WHERE (id = ?);");


// courses
define("GET_ALL_COURSES", "SELECT course.id, course.name, course.description, course.image, stu.name as student_name FROM course as course left join courses_students_lnk as lnk on course.id = lnk.fk_courses left join student as stu on stu.id = lnk.fk_students");


define("ADD_COURSE", "INSERT INTO COURSE (name, description) VALUES (?, ?);");


define("DELETE_COURSE", "DELETE FROM COURSE WHERE (id = p1);");


define("EDIT_COURSE", "UPDATE course SET name = ?, description = ? WHERE (id = ?);");


// login
define("LOGIN_ACTION", "SELECT * FROM ADMIN where (user_name = 'p2');");



// admins
define("GET_ALL_ADMINS", "SELECT admin.id, admin.name, admin.phone, admin.email, role.name as role_name FROM admin inner join role on role.id = admin.fk_role;");

define("ADD_ADMIN", "INSERT INTO admin (name, fk_role, phone, email, password, user_name) VALUES (?, ?, ?, ?, ?, ?);");

define("DELETE_ADMIN", "DELETE FROM admin WHERE (id = p1);");

define("EDIT_ADMIN", "UPDATE admin SET name = ?, fk_role = ?, phone = ?, email = ?, password = ? , user_name = ? WHERE (id = ?);
");

?>