import express from "express"
import { createJob ,getAllJobs,getJobById,updateJobById,deleteJobById} from "../controller/jobController.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router()


router.post("/createjob", userAuth, createJob);
router.get("/getAllJobs", userAuth, getAllJobs);
router.get("/getJobById/:id", userAuth, getJobById);
router.delete("/deleteJobById/:id", userAuth, deleteJobById);
router.put("/updateJobById/:id", userAuth, updateJobById);

export default router;