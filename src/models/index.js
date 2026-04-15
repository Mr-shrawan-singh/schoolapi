import User from "./User.model.js";
import School from "./school.model.js";
import Subject from "./subject.model.js";
import Class from "./class.model.js";
import ClassSubject from "./classsSubject.model.js";
import Teacher from "./teacher.module.js";
import TeacherAssignment from "./teacherAssignment.model.js";
import Student from "./student.model.js";
import StudentAcademic from "./Academic.model.js";
import StudentAcademicSubject from "./StudentAcademicSubject.model.js";
import FeeType from "./feeType.model.js";
import FeeStructure from "./feeStructure.model.js";
import FeeStructureDetail from "./feeStructureDetail.model.js";
import StudentFee from "./studentFee.model.js";
import StudentFeeDetail from "./studentFeeDetail.model.js";
import FeePayment from "./feePayment.model.js";
User.hasOne(School, { foreignKey: "userId", onDelete: "CASCADE" });
School.belongsTo(User, { foreignKey: "userId" });
School.hasMany(Subject, { foreignKey: "schoolId", onDelete: "CASCADE" });

School.hasMany(Class, { foreignKey: "schoolId" });
Class.belongsTo(School, { foreignKey: "schoolId" });

// Many-to-Many
Class.belongsToMany(Subject, {
  through: ClassSubject,
  foreignKey: "classId",
});

Subject.belongsToMany(Class, {
  through: ClassSubject,
  foreignKey: "subjectId",
});

Subject.belongsTo(School, { foreignKey: "schoolId" });

School.hasMany(Teacher, { foreignKey: "schoolId" });
Teacher.belongsTo(School, { foreignKey: "schoolId" });
// teacher class assignment
// Teacher
Teacher.hasMany(TeacherAssignment, { foreignKey: "teacherId" });
TeacherAssignment.belongsTo(Teacher, { foreignKey: "teacherId" });

// Class
Class.hasMany(TeacherAssignment, { foreignKey: "classId" });
TeacherAssignment.belongsTo(Class, { foreignKey: "classId" });

// Subject
Subject.hasMany(TeacherAssignment, { foreignKey: "subjectId" });
TeacherAssignment.belongsTo(Subject, { foreignKey: "subjectId" });

School.hasMany(TeacherAssignment, { foreignKey: "schoolId" });
TeacherAssignment.belongsTo(School, { foreignKey: "schoolId" });


// student 
Student.hasMany(StudentAcademic, { foreignKey: "studentId" });
StudentAcademic.belongsTo(Student, { foreignKey: "studentId" });

// Class ↔ Academic
Class.hasMany(StudentAcademic, { foreignKey: "classId" });
StudentAcademic.belongsTo(Class, { foreignKey: "classId" });

Student.belongsTo(User, { foreignKey: "createdBy", as: "creator" });

Student.hasMany(StudentAcademic, { foreignKey: "studentId" });
StudentAcademic.belongsTo(Student, { foreignKey: "studentId" });
School.hasMany(StudentAcademic, { foreignKey: "schoolId" });
StudentAcademic.belongsTo(School, { foreignKey: "schoolId" });

StudentAcademic.belongsToMany(Subject, {
  through: StudentAcademicSubject,
  foreignKey: "studentAcademicId",
});

Subject.belongsToMany(StudentAcademic, {
  through: StudentAcademicSubject,
  foreignKey: "subjectId",
});

FeeStructure.hasMany(FeeStructureDetail);
FeeStructureDetail.belongsTo(FeeStructure);

StudentFee.hasMany(StudentFeeDetail);
StudentFeeDetail.belongsTo(StudentFee);

StudentFee.hasMany(FeePayment);
FeePayment.belongsTo(StudentFee);


export { User, School, Subject, Class, ClassSubject,Teacher,TeacherAssignment, Student, StudentAcademic, StudentAcademicSubject };
