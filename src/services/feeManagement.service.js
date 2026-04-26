import { id } from "zod/locales";
import {
  StudentFee,
  StudentFeeDetail,
  FeeStructureDetail,
  FeePayment,
  sequelize,
  StudentAcademic,
  Student,
  Class,
} from "../models/index.js";

// ✅ CREATE STUDENT FEE (from structure)
export const createStudentFee = async (data) => {
  console.log("Creating student fee with data:", data);
  const t = await sequelize.transaction();
  try {
    const { studentAcademicId, feeStructureId ,schoolId} = data;

    const structureDetails = await FeeStructureDetail.findAll({
      where: { feeStructureId },
      transaction: t,
    });

    if (!structureDetails.length) {
      throw new Error("No fee structure details found");
    }

    const totalFee = structureDetails.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    const studentFee = await StudentFee.create(
      {
        studentAcademicId,
        feeStructureId,
        schoolId,
        totalFee,
        paidAmount: 0,
        dueAmount: totalFee,
      },
      { transaction: t }
    );

    const details = structureDetails.map((item) => ({
  studentFeeId: studentFee.id,
  schoolId: schoolId,
  feeTypeId: item.feeTypeId,
  amount: item.amount,
  label: item.label,
}));

    await StudentFeeDetail.bulkCreate(details, { transaction: t });

    await t.commit();
    return studentFee;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

export const makePayment = async (data) => {
  const t = await sequelize.transaction();
  try {
    const { studentFeeId, amount } = data;

    const studentFee = await StudentFee.findByPk(studentFeeId, {
      transaction: t,
    });

    if (!studentFee) throw new Error("Student fee not found");

    if (Number(amount) > Number(studentFee.dueAmount)) {
      throw new Error("Amount exceeds due");
    }

    const payment = await FeePayment.create(data, { transaction: t });

    const newPaid =
      Number(studentFee.paidAmount) + Number(amount);
    const due = Number(studentFee.totalFee) - newPaid;

    let status = "unpaid";
    if (newPaid === 0) status = "unpaid";
    else if (due <= 0) status = "paid";
    else status = "partial";

    await studentFee.update(
      {
        paidAmount: newPaid,
        dueAmount: due,
        status,
      },
      { transaction: t }
    );

    await t.commit();
    return payment;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

export const getStudentFees = async (limit, offset) => {
  const { count, rows } = await StudentFee.findAndCountAll({
    attributes: ["id", "totalFee", "dueAmount", "paidAmount", "status"],
    limit,
    offset,
    include: [
      {
        model: StudentAcademic,
        attributes: ["id", "classId", "studentId"],
        include: [
          { model: Student, attributes: ["name"] },
          { model: Class, attributes: ["name"] }
        ]
      }
    ],
    order: [["createdAt", "DESC"]],
  });

  const data = rows.map((fee) => ({
    id: fee.id,
    totalFee: fee.totalFee,
    paidAmount: fee.paidAmount,
    dueAmount: fee.dueAmount,
    status: fee.status,
    studentName: fee.StudentAcademic.Student.name,
    className: fee.StudentAcademic.Class.name,
  }));

  return { count, data: data };
};


export const getStudentFeeById = async (id) => {
  return await StudentFee.findByPk(id, {
    include: [StudentFeeDetail, FeePayment],
  });
};