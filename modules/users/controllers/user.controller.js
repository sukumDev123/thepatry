import { loginUser } from "../presents/user.present"

export const login = async (req, res, next) => {
  if (req.body) {
    try {
      const { email, password } = req.body
      const loginUserVa = await loginUser(email, password)
      res.json(loginUserVa)
    } catch (error) {
      next({ message: JSON.stringify(error), status: 500 })
    }
  }
}
export const register = async (req, res, next) => {
  try {
    const { email, password, displayName } = req.body
  } catch (error) {
    next({ message: JSON.stringify(error), status: 500 })
  }
}
