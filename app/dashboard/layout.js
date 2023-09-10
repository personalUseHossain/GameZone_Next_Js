
import DashboardSidebar from "@/components/DashboardSidebar";



const style = {
    display: "flex",
    padding: "0 50px 0 0",
    gap: "3rem"

}

export default function Dashboard({ children }) {
    return (
        <div className="dashboard" style={style}>
            <DashboardSidebar />
            {children}
        </div>
    )
}