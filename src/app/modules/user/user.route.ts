import express from "express";
import {UserControllers} from "./user.controller";

import {StudentValidationSchema} from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";
import {createFacultyValidationSchema} from "../Faculty/faculty.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(StudentValidationSchema),
  UserControllers.createStudent
);

router.post(
  "/create-faculty",
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty
);

export const UserRoutes = router;
