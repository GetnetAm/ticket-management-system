import { MdBuild, MdCheckCircle, MdCircle, MdFileOpen, MdHourglassTop, MdMoney, MdVerifiedUser } from "react-icons/md"
import SummaryCard from "./SummaryCard"

function AdminSummary() {
    return (
        <div className="p-6">
            <h3 className="text-2xl font-bold">Dashboard OVerview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <SummaryCard icon={ <MdVerifiedUser /> } text="Total Employees" number={13} color="bg-teal-600" />
                <SummaryCard icon={<MdBuild />} text="Total Departments" number={5} color="bg-yellow-600" />
                <SummaryCard icon={<MdMoney />} text="Monthly Salry" number="$6574" color="bg-red-600" />
            </div>

            <div >
                <h4 className="text-center text-2xl font-bold">Leave Details</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <SummaryCard icon={<MdFileOpen
                 />} text="Leave Applied" number={5} color="bg-teal-600" />
                <SummaryCard icon={<MdCheckCircle />} text="Leave Approved" number={2} color="bg-green-600" />
                <SummaryCard icon={<MdHourglassTop />} text="Leave Pending" number={4} color="bg-yellow-600" />
                <SummaryCard icon={<MdCircle />} text="Leave Rejected" number={1} color="bg-red-600" />
                  

                </div>

            </div>
            
        </div>
    )
}

export default AdminSummary
