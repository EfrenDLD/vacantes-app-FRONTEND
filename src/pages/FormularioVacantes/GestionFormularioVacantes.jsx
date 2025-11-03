import VacanteService from '../../service/VacanteService.js'
import { FormularioVacante } from './FormularioVacantes.jsx'

export const GestionFormularioVacantes =  () => {
    const guardarVacante = async () => {
        try {
            await VacanteService.create()
            return {ok: true}
        } catch (error) {
            return{
                ok: false,
                errores: [error || "Error al agregar al nuevo vacante"]
            }
        }
    }

    return (
        <div>
            <FormularioVacante
                guardar = {guardarVacante}
            />
        </div>
    )
}