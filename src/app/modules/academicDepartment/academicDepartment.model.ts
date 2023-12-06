import {Schema, model} from "mongoose";
import {TAcademicDepartment} from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {type: String, unique: true, required: true},
    academicFaculty: {type: Schema.Types.ObjectId, ref: "AcademicFaculty"},
  },
  {timestamps: true}
);

academicDepartmentSchema.pre("save", async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({name: this.name});
  if (isDepartmentExist) {
    throw new Error("This Department is already exist!");
  }
  next();
});

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartment.findOne(query);
  if (!isDepartmentExist) {
    throw new Error("This Department doesn't exist!");
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);