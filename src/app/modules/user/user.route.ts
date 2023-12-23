import express from "express";
import {UserControllers} from "./user.controller";

import {StudentValidationSchema} from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";
import {createFacultyValidationSchema} from "../Faculty/faculty.validation";
import {createAdminValidationSchema} from "../Admin/admin.validation";
import auth from "../../middlewares/auth";
import {USER_ROLE} from "./user.constant";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  validateRequest(StudentValidationSchema),
  UserControllers.createStudent
);

router.post(
  "/create-faculty",
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty
);

router.post(
  "/create-admin",
  // auth(USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin
);

router.get("/me", auth("student", "admin", "faculty"), UserControllers.getMe);

export const UserRoutes = router;
