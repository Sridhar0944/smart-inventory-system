import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import MainLayout from "./layouts/MainLayout";
import './index.css'

export default function App()
{
    return(
        <BrowserRouter>
            <MainLayout>
                <AppRoutes/>
            </MainLayout>
        </BrowserRouter>
    )
}