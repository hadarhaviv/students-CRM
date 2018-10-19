<?php

// students

define("GET_ALL_STUDENTS", "SELECT stu.id, stu.name, stu.phone, stu.email, stu.image, course.id as course_id from student as stu left join courses_students_lnk as lnk on stu.id = lnk.fk_students left join course as course on course.id = lnk.fk_courses order by stu.id desc");


define("ADD_USER", "INSERT INTO student (name, phone, email, image) VALUES (?, ?, ?, ?);");


define("DELETE_STUDENT", "DELETE FROM student WHERE (id = p1);");


define("EDIT_STUDENT", "UPDATE student SET name = ?, phone = ?, email = ?, image = ? WHERE (id = ?);");


define("STUDENT_LNK_COURSE", "INSERT INTO courses_students_lnk (fk_students, fk_courses) VALUES (?, ?);");

define("DELETE_LNK_BY_STUDENT", "DELETE FROM courses_students_lnk WHERE fk_students = ?");


// courses
define("GET_ALL_COURSES", "SELECT course.id, course.name, course.description, course.image, stu.id as student_id FROM course as course left join courses_students_lnk as lnk on course.id = lnk.fk_courses left join student as stu on stu.id = lnk.fk_students");


define("ADD_COURSE", "INSERT INTO COURSE (name, description, image) VALUES (?, ?, ?);");


define("DELETE_COURSE", "DELETE FROM COURSE WHERE (id = p1);");


define("EDIT_COURSE", "UPDATE course SET name = ?, description = ?, image = ? WHERE (id = ?);");

define("DELETE_LNK_BY_COURSE", "DELETE FROM courses_students_lnk WHERE fk_courses = ?");


// login
define("LOGIN_ACTION", "SELECT * FROM ADMIN where (user_name = 'p2');");



// admins
define("GET_ALL_ADMINS", "SELECT * FROM admin;");

define("ADD_ADMIN", "INSERT INTO admin (name, fk_role, phone, email, password, user_name) VALUES (?, ?, ?, ?, ?, ?);");

define("DELETE_ADMIN", "DELETE FROM admin WHERE (id = p1);");

define("EDIT_ADMIN", "UPDATE admin SET name = ?, fk_role = ?, phone = ?, email = ? WHERE (id = ?);
");

?>