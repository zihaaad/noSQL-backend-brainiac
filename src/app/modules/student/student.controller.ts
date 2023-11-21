import {Request, Response} from "express";
import {StudentServices} from "./student.service";
// import studentValidationSchema from "./student.joi.validation";
import StudentValidationSchema from "./student.zod.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    // const {error, value} = studentValidationSchema.validate(studentData);
    // console.log(value);

    // data validation using zod

    const {student: studentData} = req.body;
    const zodParsedData = StudentValidationSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDB(zodParsedData);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: "something went wrong",
    //     error: error.details,
    //   });
    // }
    res.status(201).json({
      success: true,
      message: "student is created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error,
    });
  }
};

const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudents();
    res.status(200).json({
      success: true,
      message: "students are retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await StudentServices.getSingleStudent(id);
    res.status(200).json({
      success: true,
      message: "student is retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const student = req.body;
    const result = await StudentServices.updateStudent(id, student);
    res.status(200).json({
      success: true,
      message: "student updated successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await StudentServices.deleteStudent(id);
    res.status(200).json({
      success: true,
      message: "student deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};