import { Outlet } from "react-router-dom";
import { NavVisitante } from "../components/NavVisitante/NavVisitante";

export const VisitanteLayout = () => {
    return (
        <div>
            <NavVisitante />
            <div className="container mt-4">
                <Outlet />
            </div>
        </div>
    );
};
