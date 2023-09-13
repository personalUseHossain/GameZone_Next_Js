
import DashboardSidebar from "@/components/DashboardSidebar"; //immporting dahsboard sidebar



const style = {
    display: "flex",
    padding: "0 50px 0 0",
    gap: "3rem"

} //styling for the hole dashboard

export default function Dashboard({ children }) {
    return (
        <div className="dashboard" style={style}>
            <DashboardSidebar /> {/* dashboard sidebar components */}
            {children}
        </div>
    )
}