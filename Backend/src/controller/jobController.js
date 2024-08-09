import Job from "../models/jobModel.js";

export const createJob = async (req, res, next) => {
    try {
        const { company, position, status, workType, workLocation } = req.body;

        // Validate required fields
        if (!company || !position || !status || !workType || !workLocation) {
            return res.status(400).send({ message: "All fields are mandatory", success: false });
        }

        // Assign the user ID to createdBy
        req.body.createdBy = req.user.userId;

        // Create a new job
        const job = await Job.create({
            company,
            position,
            status,
            workType,
            workLocation,
            createdBy: req.body.createdBy,
        });

        // Send the response with the created job
        res.status(201).send({
            success: true,
            message: "Job created successfully",
            job,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find();

        if (jobs.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No jobs found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Jobs retrieved successfully",
            jobs,
        });
    } catch (error) {
        next(error);
    }
};



export const getJobById = async (req, res, next) => {
    const { id } = req.params; // Destructure id from req.params
    try {
        const job = await Job.findById(id); // Find job by id
        if (!job) {
            return res.status(404).send({
                message: "Job does not exist",
                success: false,
            });
        }

        res.status(200).send({
            success: true,
            message: "Job retrieved successfully",
            job,
        });
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};

export const deleteJobById = async (req, res, next) => {
    const { id } = req.params;
     
    const job1 = await Job.findOne({_id : id})
    if(req.user.userId === job1.createdBy.toString()){
        next("Your Not Authorized to update this job")
    }
    try {
        // Use findByIdAndDelete to delete the job directly by its ID
        const job = await Job.findByIdAndDelete(id);

        if (!job) {
            return res.status(404).send({
                message: "Job not found",
                success: false,
            });
        }

        res.status(200).send({
            message: "Job deleted successfully",
            success: true,
        });
    } catch (error) {
        next(error); // Pass any errors to the error-handling middleware
    }
};

export const updateJobById = async (req, res, next) => {
    const { id } = req.params;
    const { company, position, status, workType, workLocation } = req.body;
    
    const job = await Job.findOne({_id : id})
    if(req.user.userId === job.createdBy.toString()){
        next("Your Not Authorized to update this job")
    }
    try {
        // Find the job by ID and update it with the new values
        const updatedJob = await Job.findByIdAndUpdate(
            id,
            { 
                company, 
                position, 
                status, 
                workType, 
                workLocation 
            },
            { new: true, runValidators: true } // Return the updated job and run validations
        );

        if (!updatedJob) {
            return res.status(404).send({
                message: "Job not found",
                success: false,
            });
        }

        res.status(200).send({
            message: "Job updated successfully",
            success: true,
            job: updatedJob,
        });
    } catch (error) {
        next(error); // Pass any errors to the error-handling middleware
    }
};