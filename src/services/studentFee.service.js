import {
  FeeStructureDetail,
  StudentFee,
  StudentFeeDetail,
} from "../models/index.js";

export const createStudentFee = async (studentAcademicId, feeStructureId) => {
  const details = await FeeStructureDetail.findAll({
    where: { feeStructureId },
  });

  let total = 0;

  const studentFee = await StudentFee.create({
    studentAcademicId,
    feeStructureId,
    totalFee: 0,
    paidAmount: 0,
    dueAmount: 0,
  });

  for (const d of details) {
    total += Number(d.amount);

    await StudentFeeDetail.create({
      studentFeeId: studentFee.id,
      feeTypeId: d.feeTypeId,
      amount: d.amount,
      label: d.label,
    });
  }

  await studentFee.update({
    totalFee: total,
    dueAmount: total,
  });

  return studentFee;
};


import { FeePayment, StudentFee } from "../models/index.js";

export const addPayment = async (studentFeeId, amount) => {
  await FeePayment.create({
    studentFeeId,
    amount,
    paymentDate: new Date(),
  });

  const fee = await StudentFee.findByPk(studentFeeId);

  const newPaid = Number(fee.paidAmount) + Number(amount);
  const due = Number(fee.totalFee) - newPaid;

  let status = "unpaid";
  if (newPaid === 0) status = "unpaid";
  else if (due > 0) status = "partial";
  else status = "paid";

  await fee.update({
    paidAmount: newPaid,
    dueAmount: due,
    status,
  });

  return fee;
};