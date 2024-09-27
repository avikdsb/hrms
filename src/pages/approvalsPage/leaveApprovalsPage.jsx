import React from "react";
import { styles } from "../../styles";
import LeaveApprovalRequestsList from "../../components/Approvals/LeaveApprovalsRequestsList";


const LeaveApprovalsPage = () => {
    return (
        <div className={`flex flex-col p-5`}>
            <div className={`font-title text-${styles.titleSize}`}>
                <h1 className="mb-[4rem]">Leave Requests Overview</h1>
            </div>

            <div className="flex flex-1 justify-between items-center bg-[#212121] p-[1rem] mb-[1rem] rounded-xl gap-5">
                <h5 className={`font-subtitle text-[1.5rem]`}>Leave Requests</h5>

            </div>

            <LeaveApprovalRequestsList/>
        </div>
    )
}

export default LeaveApprovalsPage
