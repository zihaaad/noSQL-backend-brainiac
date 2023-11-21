import {TStudent} from "./student.interface";
import {Student} from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student); // built in static method

  const student = new Student(studentData);

  if (await student.isUserExists(studentData.id)) {
    throw new Error("User Already Exists!");
  }
  const result = await student.save(); // build in instance method

  return result;
};

const getAllStudents = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findById(id);
  return result;
};

const updateStudent = async (id: string, student: TStudent) => {
  const result = await Student.findByIdAndUpdate(id, student, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudent = async (id: string) => {
  const result = await Student.findByIdAndDelete(id);
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};