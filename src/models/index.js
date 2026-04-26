import { sequelize } from "../config/database.js";
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


// ================= SCHOOL =================
User.hasOne(School, { foreignKey: "userId", onDelete: "CASCADE" });
School.belongsTo(User, { foreignKey: "userId" });

// ================= SUBJECT =================
School.hasMany(Subject, { foreignKey: "schoolId" });
Subject.belongsTo(School, { foreignKey: "schoolId" });

// ================= CLASS =================
School.hasMany(Class, { foreignKey: "schoolId" });
Class.belongsTo(School, { foreignKey: "schoolId" });

// ================= CLASS-SUBJECT =================
Class.belongsToMany(Subject, {
  through: ClassSubject,
  foreignKey: "classId",
});

Subject.belongsToMany(Class, {
  through: ClassSubject,
  foreignKey: "subjectId",
});

// ================= TEACHER =================
School.hasMany(Teacher, { foreignKey: "schoolId" });
Teacher.belongsTo(School, { foreignKey: "schoolId" });

// ================= TEACHER ASSIGNMENT =================
Teacher.hasMany(TeacherAssignment, { foreignKey: "teacherId" });
TeacherAssignment.belongsTo(Teacher, { foreignKey: "teacherId" });

Class.hasMany(TeacherAssignment, { foreignKey: "classId" });
TeacherAssignment.belongsTo(Class, { foreignKey: "classId" });

Subject.hasMany(TeacherAssignment, { foreignKey: "subjectId" });
TeacherAssignment.belongsTo(Subject, { foreignKey: "subjectId" });

School.hasMany(TeacherAssignment, { foreignKey: "schoolId" });
TeacherAssignment.belongsTo(School, { foreignKey: "schoolId" });

// ================= STUDENT =================
Student.belongsTo(User, { foreignKey: "createdBy", as: "creator" });

Student.hasMany(StudentAcademic, { foreignKey: "studentId" });
StudentAcademic.belongsTo(Student, { foreignKey: "studentId" });

Class.hasMany(StudentAcademic, { foreignKey: "classId" });
StudentAcademic.belongsTo(Class, { foreignKey: "classId" });

School.hasMany(StudentAcademic, { foreignKey: "schoolId" });
StudentAcademic.belongsTo(School, { foreignKey: "schoolId" });

// ================= STUDENT SUBJECT =================
StudentAcademic.belongsToMany(Subject, {
  through: StudentAcademicSubject,
  foreignKey: "studentAcademicId",
});

Subject.belongsToMany(StudentAcademic, {
  through: StudentAcademicSubject,
  foreignKey: "subjectId",
});


// ================= FEE MODULE (FIXED 🔥) =================

// FeeType
School.hasMany(FeeType, { foreignKey: "schoolId" });
FeeType.belongsTo(School, { foreignKey: "schoolId" });

// FeeStructure
School.hasMany(FeeStructure, { foreignKey: "schoolId" });
FeeStructure.belongsTo(School, { foreignKey: "schoolId" });

Class.hasMany(FeeStructure, { foreignKey: "classId" });
FeeStructure.belongsTo(Class, { foreignKey: "classId" });

// FeeStructureDetail
FeeStructure.hasMany(FeeStructureDetail, { foreignKey: "feeStructureId" });
FeeStructureDetail.belongsTo(FeeStructure, { foreignKey: "feeStructureId" });

FeeType.hasMany(FeeStructureDetail, { foreignKey: "feeTypeId" });
FeeStructureDetail.belongsTo(FeeType, { foreignKey: "feeTypeId" });

// StudentFee
StudentAcademic.hasOne(StudentFee, { foreignKey: "studentAcademicId" });
StudentFee.belongsTo(StudentAcademic, { foreignKey: "studentAcademicId" });

School.hasMany(StudentFee, { foreignKey: "schoolId" });
StudentFee.belongsTo(School, { foreignKey: "schoolId" });

// StudentFeeDetail
StudentFee.hasMany(StudentFeeDetail, { foreignKey: "studentFeeId" });
StudentFeeDetail.belongsTo(StudentFee, { foreignKey: "studentFeeId" });

FeeType.hasMany(StudentFeeDetail, { foreignKey: "feeTypeId" });
StudentFeeDetail.belongsTo(FeeType, { foreignKey: "feeTypeId" });

// Payment
StudentFee.hasMany(FeePayment, { foreignKey: "studentFeeId" });
FeePayment.belongsTo(StudentFee, { foreignKey: "studentFeeId" });

School.hasMany(FeePayment, { foreignKey: "schoolId" });
FeePayment.belongsTo(School, { foreignKey: "schoolId" });

export { User, School, 
  Subject, Class, ClassSubject,
  Teacher,TeacherAssignment, Student,
   StudentAcademic, StudentAcademicSubject
   , FeeType, FeeStructure, FeeStructureDetail,
    StudentFee, StudentFeeDetail, FeePayment,sequelize };
