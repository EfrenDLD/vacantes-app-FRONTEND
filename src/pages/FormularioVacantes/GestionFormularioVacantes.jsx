import VacanteService from '../../service/VacanteService.js'
import { FormularioVacante } from './FormularioVacantes.jsx'

export const GestionFormularioVacantes =  () => {
    const guardarVacante = async (datosVacante) => {
        try {
            await VacanteService.create(datosVacante)
            return {ok: true}
        } catch (error) {
            return{
                ok: false,
                errores: [error || "Error al agregar al nuevo vacante"]
            }
        }
    }

    const actualizarVacante = async (id, vacante) => {
        try {
            await VacanteService.update(id, vacante)
            return {ok: true}
        } catch (error) {
            return {
                ok: false,
                errores: [error || "Error al actualizar al vacante"]
            }
        }
    }

    return (
        <div>
            <FormularioVacante
                guardarVacante = {guardarVacante}
                actualizarVacante = {actualizarVacante}
            />
        </div>
    )
}