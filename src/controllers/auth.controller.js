import { asyncHandler } from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/response.js";
import { generateToken } from "../utils/jwt.js";
import * as userService from "../services/user.service.js";
import {getSchoolByUserId} from "../services/school.service.js";


// LOGIN
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.loginUser(email, password);

  if (!user) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  const school = await getSchoolByUserId(user.id);

  let schoolId = null;
  if (school) {
    schoolId = school.id;
  }

  // ✅ FIX: pass only needed fields
 const token = generateToken({
  id: user.id,
  email: user.email,
  schoolId,
});;

  sendResponse({
    res,
    message: "Login successful",
    data: {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        schoolId,
      },
    },
  });
});